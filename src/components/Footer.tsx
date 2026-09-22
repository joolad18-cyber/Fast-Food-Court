import React, { useState } from 'react';
import { Flame, Clock, MapPin, Phone, Mail, Instagram, Twitter, Facebook, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#29231F] text-[#F3E4CC] border-t-4 border-[#8B2E24] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#F3E4CC]/15">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#8B2E24] flex items-center justify-center border border-[#D99A45]">
                <Flame className="w-5 h-5 text-[#D99A45]" />
              </div>
              <div>
                <span className="font-heading text-2xl font-black tracking-tight text-[#F3E4CC] leading-none block">
                  FAST MEALS <span className="text-[#D99A45]">COURT</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D99A45] block">
                  Fast. Fresh. No Compromise.
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F3E4CC]/75 leading-relaxed max-w-sm">
              Modern quick-service crafted for high-speed flavor. 100% Angus smash patties, flash-crisped russets, and handcrafted shakes in under 4 minutes.
            </p>

            {/* Delivery Platforms Row */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D99A45] block mb-2">
                Official Delivery Partners
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {['DoorDash', 'UberEats', 'Grubhub', 'Court Express Fleet'].map((p) => (
                  <span
                    key={p}
                    className="px-2.5 py-1 rounded-md bg-[#1F1916] text-[11px] font-bold text-[#F3E4CC]/80 border border-[#F3E4CC]/15"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-lg font-black uppercase tracking-wider text-[#D99A45]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wide text-[#F3E4CC]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('menu-showcase')}
                  className="hover:text-[#D99A45] transition-colors text-left"
                >
                  Full Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('brand-story')}
                  className="hover:text-[#D99A45] transition-colors text-left"
                >
                  Fresh Story & Standards
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('gallery-section')}
                  className="hover:text-[#D99A45] transition-colors text-left"
                >
                  Kitchen & Vibe
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('reviews-section')}
                  className="hover:text-[#D99A45] transition-colors text-left"
                >
                  Reviews & Speed Proof
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('locations-section')}
                  className="hover:text-[#D99A45] transition-colors text-left"
                >
                  Locations & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-lg font-black uppercase tracking-wider text-[#D99A45]">
              Downtown Flagship Hours
            </h4>
            <div className="space-y-1.5 text-xs text-[#F3E4CC]/80">
              <p className="flex justify-between">
                <span>Mon – Thu:</span>
                <span className="font-bold text-[#F3E4CC]">10:00 AM – 11:30 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Fri – Sat:</span>
                <span className="font-bold text-[#D99A45]">10:00 AM – 1:00 AM</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-bold text-[#F3E4CC]">10:30 AM – 11:00 PM</span>
              </p>
            </div>

            <div className="pt-2 text-xs text-[#F3E4CC]/80 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D99A45]" />
                <span>425 Grand Ave, Downtown Core</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D99A45]" />
                <span>+1 (555) 327-8631</span>
              </div>
            </div>
          </div>

          {/* Col 4: Perks Club Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-lg font-black uppercase tracking-wider text-[#D99A45]">
              Court Speed Perks
            </h4>
            <p className="text-xs text-[#F3E4CC]/75 leading-relaxed">
              Get free flash-fried fries on your first digital order plus exclusive secret menu drop alerts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1F1916] border border-[#F3E4CC]/20 text-xs text-[#F3E4CC] placeholder-[#F3E4CC]/40 focus:outline-none focus:border-[#D99A45]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#8B2E24] hover:bg-[#D99A45] text-[#F3E4CC] hover:text-[#29231F] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#D99A45]" />
                    <span>Free Fries Claimed!</span>
                  </>
                ) : (
                  <>
                    <span>Join Perks Club</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { name: 'Instagram', icon: Instagram },
                { name: 'Twitter', icon: Twitter },
                { name: 'Facebook', icon: Facebook },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={`#${s.name.toLowerCase()}`}
                    className="w-8 h-8 rounded-lg bg-[#1F1916] hover:bg-[#8B2E24] hover:text-[#D99A45] text-[#F3E4CC] flex items-center justify-center transition-colors border border-[#F3E4CC]/15"
                    title={s.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F3E4CC]/60 font-medium">
          <p>© {new Date().getFullYear()} Fast Meals Court Restaurant Brands Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#D99A45] cursor-pointer">Nutritional & Allergen Info</span>
            <span>•</span>
            <span className="hover:text-[#D99A45] cursor-pointer">Privacy & Terms</span>
            <span>•</span>
            <span className="hover:text-[#D99A45] cursor-pointer">Express Franchise Portal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
