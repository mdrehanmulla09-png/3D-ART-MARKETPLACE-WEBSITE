import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Artwork Advisory & Acquisition',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your inquiry has been received by our curatorial concierge.', 'success');
  };

  return (
    <div className="min-h-screen bg-artora-ivory py-16 selection:bg-artora-cobalt selection:text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-artora-warmgrey pb-8 mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-artora-cobalt font-semibold">
            Concierge & Advisory
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-artora-nearblack mt-2">
            Connect With Our Curators
          </h1>
          <p className="mt-3 text-sm text-artora-muted max-w-xl font-light">
            Whether seeking private collection curation, custom artist commissions, or exhibition loan coordination, our team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-artora-warmgrey shadow-sm space-y-6 text-xs">
              
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-full bg-artora-ivory border border-artora-warmgrey text-artora-cobalt">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-artora-nearblack uppercase tracking-wider text-[11px]">Curatorial Advisory</h4>
                  <p className="text-artora-muted mt-0.5">curator@artora.com</p>
                  <p className="text-[11px] text-artora-muted">Response within 12 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-full bg-artora-ivory border border-artora-warmgrey text-artora-burntorange">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-artora-nearblack uppercase tracking-wider text-[11px]">Private Client Line</h4>
                  <p className="text-artora-muted mt-0.5">+91 (022) 4890 2311</p>
                  <p className="text-[11px] text-artora-muted">Mon – Sat, 10:00 to 19:00 IST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-full bg-artora-ivory border border-artora-warmgrey text-emerald-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-artora-nearblack uppercase tracking-wider text-[11px]">Flagship Salons</h4>
                  <p className="text-artora-muted mt-0.5">
                    Kala Ghoda Arts Precinct, Mumbai 400001<br />
                    Mitte Gallery District, 10115 Berlin
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-artora-warmgrey shadow-sm">
              <h3 className="font-serif text-2xl text-artora-nearblack mb-4">
                Direct Inquiry Form
              </h3>

              {submitted ? (
                <div className="py-12 text-center bg-emerald-50 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h4 className="font-serif text-xl text-emerald-950">Inquiry Dispatched</h4>
                  <p className="text-xs text-emerald-800 mt-1 max-w-sm mx-auto">
                    A specialist from our curatorial desk will reach out via email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-artora-muted font-medium mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-artora-muted font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-artora-muted font-medium mb-1">Inquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                    >
                      <option value="Artwork Advisory & Acquisition">Artwork Advisory & Acquisition</option>
                      <option value="Bespoke Commission Consultation">Bespoke Commission Consultation</option>
                      <option value="Artist Representation & Submission">Artist Representation & Submission</option>
                      <option value="Corporate & Architecture Collections">Corporate & Architecture Collections</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-artora-muted font-medium mb-1">Message</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Share details of your interior space, budget range, or specific artists you wish to commission..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-2.5 border border-artora-warmgrey rounded focus:border-artora-cobalt focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-artora-nearblack hover:bg-artora-cobalt text-white text-xs uppercase tracking-widest font-semibold rounded shadow transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Concierge</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
