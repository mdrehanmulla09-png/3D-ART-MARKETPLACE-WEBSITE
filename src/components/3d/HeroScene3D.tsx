import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const HeroScene3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const { formatPrice } = useApp();

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF6F2EA);
    scene.fog = new THREE.FogExp2(0xF6F2EA, 0.055);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.4);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xffeedd, 3.8);
    mainSpot.position.set(5, 8, 7);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.8;
    scene.add(mainSpot);

    const blueRimLight = new THREE.DirectionalLight(0x435BFF, 1.2);
    blueRimLight.position.set(-6, -2, 2);
    scene.add(blueRimLight);

    const warmFillLight = new THREE.PointLight(0xD96A45, 1.5, 12);
    warmFillLight.position.set(0, -3, 3);
    scene.add(warmFillLight);

    // Artwork Frames configuration
    // Artwork Frames configuration with depth layering for transparent glass parallax
    const artworksData = [
      {
        id: 'art-1',
        title: 'Monolith of Azure Whispers',
        artist: 'Elena Rostova',
        price: formatPrice(95000),
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        pos: [0, 0.2, -1.2] as [number, number, number],
        scale: [2.5, 3.0, 0.08] as [number, number, number],
        rotSpeed: 0.0008,
        isCenter: true,
      },
      {
        id: 'art-2',
        title: 'Echoes of the Red Earth',
        artist: 'Aravind Nambiar',
        price: formatPrice(68000),
        url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
        pos: [-3.2, 0.7, -0.6] as [number, number, number],
        scale: [2.0, 2.0, 0.08] as [number, number, number],
        rotSpeed: -0.0006,
        isCenter: false,
      },
      {
        id: 'art-3',
        title: 'Synthetic Aurora No. 04',
        artist: 'Maya Chen',
        price: formatPrice(32000),
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        pos: [3.2, 0.6, -0.7] as [number, number, number],
        scale: [1.9, 2.3, 0.08] as [number, number, number],
        rotSpeed: 0.0007,
        isCenter: false,
      },
      {
        id: 'art-5',
        title: 'The Silent Arcade: Jaipur',
        artist: 'Priya Sharma',
        price: formatPrice(24000),
        url: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=800&q=80',
        pos: [-2.5, -2.1, -1.6] as [number, number, number],
        scale: [2.3, 1.6, 0.08] as [number, number, number],
        rotSpeed: -0.0005,
        isCenter: false,
      },
      {
        id: 'art-6',
        title: 'Solar Eclipse in Oaxacan Gold',
        artist: 'Mateo Silva',
        price: formatPrice(82000),
        url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
        pos: [2.5, -2.1, -1.4] as [number, number, number],
        scale: [2.0, 2.0, 0.08] as [number, number, number],
        rotSpeed: 0.0006,
        isCenter: false,
      },
    ];

    const textureLoader = new THREE.TextureLoader();
    const artworkMeshes: {
      group: THREE.Group;
      basePos: THREE.Vector3;
      speed: number;
      initialRotY: number;
      data: (typeof artworksData)[0];
    }[] = [];

    artworksData.forEach((item, index) => {
      const group = new THREE.Group();

      // Outer Frame (Matted warm charcoal or pale oak)
      const frameMat = new THREE.MeshStandardMaterial({
        color: item.isCenter ? 0x1f1f1e : 0x2a2a29,
        roughness: 0.35,
        metalness: 0.15,
      });

      const frameWidth = item.scale[0] + 0.16;
      const frameHeight = item.scale[1] + 0.16;
      const frameGeo = new THREE.BoxGeometry(frameWidth, frameHeight, 0.06);
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      group.add(frameMesh);

      // Artwork Plane with Texture
      const artMat = new THREE.MeshStandardMaterial({
        roughness: 0.6,
        metalness: 0.05,
      });

      textureLoader.load(
        item.url,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          artMat.map = texture;
          artMat.needsUpdate = true;
        },
        undefined,
        () => {
          // Fallback tone if image load fails
          artMat.color.setHex(item.isCenter ? 0x435BFF : 0xD96A45);
        }
      );

      const artGeo = new THREE.PlaneGeometry(item.scale[0], item.scale[1]);
      const artPlane = new THREE.Mesh(artGeo, artMat);
      artPlane.position.z = 0.035; // slightly forward of frame
      group.add(artPlane);

      // Initial positioning
      group.position.set(...item.pos);
      const angleY = (index % 2 === 0 ? 0.08 : -0.08) * (item.isCenter ? 0.02 : 1);
      group.rotation.y = angleY;
      group.rotation.x = 0.03;

      scene.add(group);

      artworkMeshes.push({
        group,
        basePos: new THREE.Vector3(...item.pos),
        speed: item.rotSpeed,
        initialRotY: angleY,
        data: item,
      });
    });

    // Pointer parallax coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Damped mouse parallax with enhanced 3D responsiveness
      targetX += (mouseX - targetX) * 0.055;
      targetY += (mouseY - targetY) * 0.055;

      camera.position.x = targetX * 1.8;
      camera.position.y = targetY * 1.2;
      camera.lookAt(0, 0, 0);

      // Floating gentle oscillation
      artworkMeshes.forEach((meshObj, i) => {
        const floatOffset = Math.sin(elapsedTime * 0.9 + i * 1.5) * 0.1;
        meshObj.group.position.y = meshObj.basePos.y + floatOffset;
        meshObj.group.rotation.y = meshObj.initialRotY + Math.sin(elapsedTime * 0.6 + i) * 0.03 + targetX * 0.22;
        meshObj.group.rotation.x = 0.02 + Math.cos(elapsedTime * 0.5 + i) * 0.02 - targetY * 0.14;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [formatPrice]);

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-artora-ivory pt-8 pb-16">
      
      {/* 3D Canvas Mount */}
      {webglSupported ? (
        <div
          ref={mountRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0 pointer-events-auto"
          aria-label="Interactive 3D Art Gallery Showcase"
        />
      ) : (
        /* Graceful CSS 3D Fallback for non-WebGL devices */
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none opacity-40 z-0">
          <div className="relative w-[340px] sm:w-[480px] h-[520px] rounded-lg shadow-2xl overflow-hidden border-8 border-artora-charcoal rotate-[-2deg]">
            <img
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80"
              alt="Monolith of Azure Whispers fallback"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Subtle ambient lighting layer that preserves 3D canvas visibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(246,242,234,0.25)_100%)] pointer-events-none z-10" />

      {/* Foreground Hero Bottom Overlay (Plaque & Scroll Indicator) */}
      <div className="absolute bottom-6 left-0 right-0 z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center pointer-events-none">
        
        {/* Hero Bottom Floating Plaque */}
        <div className="pointer-events-auto hidden md:block">
          <Link
            to="/artwork/art-1"
            className="inline-flex items-center space-x-4 px-5 py-3 rounded-xl bg-white/80 backdrop-blur-md border border-artora-warmgrey/70 shadow-lg hover:border-artora-cobalt transition-all group"
          >
            <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 border border-artora-warmgrey">
              <img
                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=200&q=80"
                alt="Elena Rostova preview"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="text-left text-xs">
              <p className="font-semibold text-artora-nearblack group-hover:text-artora-cobalt transition-colors">
                Monolith of Azure Whispers
              </p>
              <p className="text-[11px] text-artora-muted">
                Elena Rostova · <span className="font-medium text-artora-nearblack">{formatPrice(95000)}</span>
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-artora-ivory border border-artora-warmgrey text-artora-nearblack">
              Featured 1 of 1
            </span>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-4 flex flex-col items-center pointer-events-auto opacity-75 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-[0.25em] text-artora-muted mb-2 font-medium">
            Scroll to Discover
          </span>
          <div className="w-5 h-8 border-2 border-artora-nearblack/30 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-artora-nearblack rounded-full animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
};
