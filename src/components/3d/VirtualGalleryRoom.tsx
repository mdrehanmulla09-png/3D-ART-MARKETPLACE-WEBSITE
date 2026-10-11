import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Eye, 
  ShoppingBag, 
  Volume2, 
  VolumeX, 
  Compass, 
  Play, 
  Pause,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Artwork } from '../../types';
import { useApp } from '../../context/AppContext';

export const VirtualGalleryRoom: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { artworks, formatPrice, addToCart } = useApp();

  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isGuidedTour, setIsGuidedTour] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Gallery artworks to mount on the 4 exhibition walls
  const galleryArtworks = artworks.slice(0, 8);

  useEffect(() => {
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        setIsLoaded(true);
        return;
      }
    } catch {
      setWebglSupported(false);
      setIsLoaded(true);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF0EBE1);
    scene.fog = new THREE.Fog(0xF0EBE1, 15, 30);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 1.7, 5.5); // standing eye level

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xFFFBF4, 1.2);
    scene.add(ambientLight);

    // Warm ceiling gallery track lights
    const centerSpot = new THREE.SpotLight(0xFFF7E6, 2.5);
    centerSpot.position.set(0, 5, 0);
    centerSpot.angle = Math.PI / 3;
    centerSpot.penumbra = 0.5;
    centerSpot.castShadow = true;
    scene.add(centerSpot);

    // 3. Gallery Architecture (Floor, Ceiling, Walls)
    const roomSize = 16;
    const roomHeight = 5.5;

    // Floor (Warm parquet oak texture)
    const floorGeo = new THREE.PlaneGeometry(roomSize, roomSize);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xC8B89E,
      roughness: 0.35,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(roomSize, roomSize);
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0xF8F5EE, roughness: 0.9 });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.position.y = roomHeight;
    ceiling.rotation.x = Math.PI / 2;
    scene.add(ceiling);

    // Wall Material (Gallery off-white warm ivory)
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xFAF7F2, roughness: 0.85 });

    // North Wall (Back)
    const northWall = new THREE.Mesh(new THREE.PlaneGeometry(roomSize, roomHeight), wallMat);
    northWall.position.set(0, roomHeight / 2, -roomSize / 2);
    scene.add(northWall);

    // South Wall (Front)
    const southWall = new THREE.Mesh(new THREE.PlaneGeometry(roomSize, roomHeight), wallMat);
    southWall.position.set(0, roomHeight / 2, roomSize / 2);
    southWall.rotation.y = Math.PI;
    scene.add(southWall);

    // West Wall (Left)
    const westWall = new THREE.Mesh(new THREE.PlaneGeometry(roomSize, roomHeight), wallMat);
    westWall.position.set(-roomSize / 2, roomHeight / 2, 0);
    westWall.rotation.y = Math.PI / 2;
    scene.add(westWall);

    // East Wall (Right)
    const eastWall = new THREE.Mesh(new THREE.PlaneGeometry(roomSize, roomHeight), wallMat);
    eastWall.position.set(roomSize / 2, roomHeight / 2, 0);
    eastWall.rotation.y = -Math.PI / 2;
    scene.add(eastWall);

    // 4. Mount Artworks on Walls
    const textureLoader = new THREE.TextureLoader();
    const clickableMeshes: THREE.Mesh[] = [];
    const interactiveArtworks: { mesh: THREE.Mesh; artwork: Artwork; targetPos: THREE.Vector3; targetLook: THREE.Vector3 }[] = [];

    // Wall positions mapping: 2 on North, 2 on East, 2 on South, 2 on West
    const wallConfigs = [
      // North Wall
      { pos: [-3.5, 2.2, -roomSize / 2 + 0.12], rotY: 0, viewPos: [-3.5, 1.8, -roomSize / 2 + 3.2] },
      { pos: [3.5, 2.2, -roomSize / 2 + 0.12], rotY: 0, viewPos: [3.5, 1.8, -roomSize / 2 + 3.2] },
      // East Wall
      { pos: [roomSize / 2 - 0.12, 2.2, -3.5], rotY: -Math.PI / 2, viewPos: [roomSize / 2 - 3.2, 1.8, -3.5] },
      { pos: [roomSize / 2 - 0.12, 2.2, 3.5], rotY: -Math.PI / 2, viewPos: [roomSize / 2 - 3.2, 1.8, 3.5] },
      // South Wall
      { pos: [3.5, 2.2, roomSize / 2 - 0.12], rotY: Math.PI, viewPos: [3.5, 1.8, roomSize / 2 - 3.2] },
      { pos: [-3.5, 2.2, roomSize / 2 - 0.12], rotY: Math.PI, viewPos: [-3.5, 1.8, roomSize / 2 - 3.2] },
      // West Wall
      { pos: [-roomSize / 2 + 0.12, 2.2, 3.5], rotY: Math.PI / 2, viewPos: [-roomSize / 2 + 3.2, 1.8, 3.5] },
      { pos: [-roomSize / 2 + 0.12, 2.2, -3.5], rotY: Math.PI / 2, viewPos: [-roomSize / 2 + 3.2, 1.8, -3.5] },
    ];

    galleryArtworks.forEach((art, index) => {
      const config = wallConfigs[index % wallConfigs.length];
      const artGroup = new THREE.Group();

      const artWidth = 2.4;
      const artHeight = 2.0;

      // Frame
      const frameGeo = new THREE.BoxGeometry(artWidth + 0.15, artHeight + 0.15, 0.08);
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x1f1f1e, roughness: 0.3 });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.castShadow = true;
      artGroup.add(frame);

      // Artwork Plane
      const canvasMat = new THREE.MeshStandardMaterial({ roughness: 0.5 });
      textureLoader.load(art.images[0]?.url, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        canvasMat.map = texture;
        canvasMat.needsUpdate = true;
      });

      const canvasMesh = new THREE.Mesh(new THREE.PlaneGeometry(artWidth, artHeight), canvasMat);
      canvasMesh.position.z = 0.045;
      (canvasMesh as any).userData = { artwork: art, index };
      artGroup.add(canvasMesh);
      clickableMeshes.push(canvasMesh);

      // Wall Spotlight pointing at each artwork
      const spot = new THREE.SpotLight(0xFFF3DD, 2.8);
      spot.position.set(config.pos[0], 4.5, config.pos[2]);
      spot.target = artGroup;
      spot.angle = Math.PI / 6;
      spot.penumbra = 0.4;
      scene.add(spot);

      artGroup.position.set(config.pos[0], config.pos[1], config.pos[2]);
      artGroup.rotation.y = config.rotY;
      scene.add(artGroup);

      interactiveArtworks.push({
        mesh: canvasMesh,
        artwork: art,
        targetPos: new THREE.Vector3(...config.viewPos),
        targetLook: new THREE.Vector3(config.pos[0], config.pos[1], config.pos[2]),
      });
    });

    setIsLoaded(true);

    // 5. Camera Control & Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let yaw = 0;
    let pitch = 0;

    let targetCameraPos = new THREE.Vector3(0, 1.7, 5.5);
    let targetCameraLook = new THREE.Vector3(0, 1.7, 0);

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        yaw -= deltaX * 0.003;
        pitch = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, pitch - deltaY * 0.003));

        targetCameraLook.set(
          camera.position.x + Math.sin(yaw),
          camera.position.y + Math.sin(pitch),
          camera.position.z - Math.cos(yaw)
        );
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Click on Artwork Raycasting
    const onCanvasClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const data = (hit as any).userData;
        if (data && data.artwork) {
          setSelectedArtwork(data.artwork);
          const found = interactiveArtworks.find((item) => item.artwork.id === data.artwork.id);
          if (found) {
            targetCameraPos.copy(found.targetPos);
            targetCameraLook.copy(found.targetLook);
          }
        }
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('click', onCanvasClick);

    // 6. Animation Loop with Smooth Camera Lerp
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth camera translation
      camera.position.lerp(targetCameraPos, 0.04);
      camera.lookAt(targetCameraLook);

      renderer.render(scene, camera);
    };

    animate();

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
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('click', onCanvasClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (dom && container.contains(dom)) {
        container.removeChild(dom);
      }
      renderer.dispose();
    };
  }, [artworks]);

  // Guided Tour Step Controller
  useEffect(() => {
    if (!isGuidedTour) return;
    const interval = setInterval(() => {
      setTourIndex((prev) => {
        const next = (prev + 1) % galleryArtworks.length;
        setSelectedArtwork(galleryArtworks[next]);
        return next;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [isGuidedTour, galleryArtworks]);

  return (
    <div className="fixed inset-0 z-50 bg-artora-charcoal text-white flex flex-col overflow-hidden">
      
      {/* Top Header Bar */}
      <header className="h-16 px-6 bg-artora-charcoal/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-30">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/explore')}
            className="flex items-center space-x-2 text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors px-3 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Gallery</span>
          </button>
          
          <div className="hidden sm:block">
            <span className="font-serif text-lg tracking-wide text-white">ARTORA Virtual Pavilion</span>
            <span className="text-[10px] uppercase tracking-widest text-white/50 ml-3">
              Spring Exhibition 2025
            </span>
          </div>
        </div>

        {/* Gallery Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsGuidedTour(!isGuidedTour)}
            className={`flex items-center space-x-2 text-xs uppercase tracking-wider px-3.5 py-1.5 rounded transition-all ${
              isGuidedTour
                ? 'bg-artora-cobalt text-white shadow-lg'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {isGuidedTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isGuidedTour ? 'Pause Guided Tour' : 'Start Curated Tour'}</span>
          </button>

          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={isAudioMuted ? 'Enable gallery acoustics' : 'Mute gallery acoustics'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-white/60" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </header>

      {/* Main 3D Canvas Viewport */}
      <div className="relative flex-1 w-full h-full">
        {webglSupported ? (
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            title="Click and drag to look around. Click any artwork frame to examine details."
          />
        ) : (
          /* 2D Fallback Gallery */
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-artora-ivory text-artora-nearblack text-center">
            <Compass className="w-12 h-12 text-artora-cobalt mb-4 animate-spin" />
            <h3 className="font-serif text-3xl mb-2">Virtual Gallery Preview</h3>
            <p className="max-w-md text-sm text-artora-muted mb-6">
              Your browser or device does not have WebGL enabled. You can still explore all curated pieces directly in the marketplace catalog.
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="px-6 py-3 bg-artora-nearblack text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-artora-cobalt transition-colors"
            >
              Explore Artworks in Marketplace
            </button>
          </div>
        )}

        {/* Ambient Overlay Hints */}
        <div className="absolute bottom-6 left-6 z-20 pointer-events-none hidden sm:flex items-center space-x-3 bg-artora-charcoal/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs text-white/70">
          <Compass className="w-4 h-4 text-artora-cobalt animate-spin" />
          <span>Click & drag to rotate view · Click artwork frame to inspect</span>
        </div>

        {/* Selected Artwork Inspector Side Drawer */}
        {selectedArtwork && (
          <div className="absolute right-6 top-6 bottom-6 w-full max-w-md bg-artora-charcoal/95 backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-2xl z-40 flex flex-col justify-between overflow-y-auto animate-fade-in text-white">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-artora-cobalt">
                  Exhibition Plaque
                </span>
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="text-xs text-white/60 hover:text-white px-2 py-1 bg-white/5 rounded"
                >
                  Close Inspection
                </button>
              </div>

              {/* Artwork Image */}
              <div className="mt-4 aspect-[4/3] rounded-lg overflow-hidden border border-white/15">
                <img
                  src={selectedArtwork.images[0]?.url}
                  alt={selectedArtwork.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4">
                <h3 className="font-serif text-2xl text-white leading-tight">
                  {selectedArtwork.title}
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  By <span className="font-medium text-white">{selectedArtwork.artistName}</span> · {selectedArtwork.artistLocation}
                </p>
              </div>

              <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
                <span className="text-xl font-semibold text-white">
                  {formatPrice(selectedArtwork.price)}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-artora-cobalt text-white">
                  {selectedArtwork.artworkType === 'original' ? 'Original 1 of 1' : 'Limited Edition'}
                </span>
              </div>

              <p className="mt-4 text-xs text-white/70 leading-relaxed font-light">
                {selectedArtwork.description}
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-white/60">
                <div><span className="text-white/40">Medium:</span> {selectedArtwork.medium}</div>
                <div><span className="text-white/40">Dimensions:</span> {selectedArtwork.dimensions}</div>
                <div><span className="text-white/40">Year:</span> {selectedArtwork.yearCreated}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-2.5">
              <button
                onClick={() => {
                  addToCart(selectedArtwork, 1);
                }}
                className="w-full py-3 bg-white text-artora-nearblack hover:bg-artora-cobalt hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold rounded flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Collection Bag</span>
              </button>

              <button
                onClick={() => navigate(`/artwork/${selectedArtwork.id}`)}
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white transition-colors text-xs uppercase tracking-wider rounded flex items-center justify-center space-x-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full Artwork Details</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
