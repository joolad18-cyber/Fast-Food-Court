import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, ArrowRight, Check, Car, UtensilsCrossed, PackageCheck } from 'lucide-react';
import { RESTAURANT_LOCATIONS } from '../data/restaurantData';
import { RestaurantLocation } from '../types';

interface LocationsSectionProps {
  onStartOrderForLocation: (location: RestaurantLocation) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onStartOrderForLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState<RestaurantLocation>(RESTAURANT_LOCATIONS[0]);
  const [directionsCopied, setDirectionsCopied] = useState<boolean>(false);

  const handleCopyDirections = () => {
    navigator.clipboard?.writeText?.(`${selectedLocation.name}, ${selectedLocation.address}, ${selectedLocation.city}`);
    setDirectionsCopied(true);
    setTimeout(() => setDirectionsCopied(false), 2000);
  };

  return (
    <section id="locations-section" className="py-16 sm:py-24 bg-[#29231F] text-[#F3E4CC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B2E24] text-[#F3E4CC] text-xs font-black uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#D99A45]" />
            Find Your Nearest Court
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F3E4CC] leading-tight">
            LOCATIONS & <span className="text-[#D99A45]">HOURS</span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#F3E4CC]/80 font-medium">
            3 prime metro kitchens engineered for ultra-fast dine-in seating, dual drive-thrus, and express app locker pickups.
          </p>
        </div>

        {/* Location Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {RESTAURANT_LOCATIONS.map((loc) => {
            const isSelected = loc.id === selectedLocation.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => setSelectedLocation(loc)}
                className={`p-5 rounded-2xl text-left transition-all duration-150 border-2 ${
                  isSelected
                    ? 'bg-[#8B2E24] border-[#D99A45] shadow-xl scale-[1.02]'
                    : 'bg-[#1F1916] border-[#F3E4CC]/15 hover:border-[#D99A45]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#D99A45]">
                    {loc.subname}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#29231F] text-[#F3E4CC] border border-[#F3E4CC]/20">
                    {loc.status}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-black uppercase text-[#F3E4CC] leading-tight">
                  {loc.name.replace('Fast Meals Court — ', '')}
                </h3>
                <p className="text-xs text-[#F3E4CC]/80 mt-1">
                  {loc.address}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Card & Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Panel */}
          <div className="lg:col-span-6 bg-[#1F1916] p-6 sm:p-8 rounded-3xl border-2 border-[#8B2E24]/50 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F3E4CC]/15">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#F3E4CC]">
                    {selectedLocation.name}
                  </h3>
                  <p className="text-xs text-[#D99A45] font-bold uppercase tracking-wider mt-0.5">
                    {selectedLocation.subname}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#8B2E24] flex items-center justify-center text-[#D99A45]">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              {/* Address & Phone */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center gap-3 text-sm text-[#F3E4CC]/90 font-medium">
                  <MapPin className="w-4 h-4 text-[#D99A45] flex-shrink-0" />
                  <span>{selectedLocation.address}, {selectedLocation.city} {selectedLocation.postalCode}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#F3E4CC]/90 font-medium">
                  <Phone className="w-4 h-4 text-[#D99A45] flex-shrink-0" />
                  <a href={`tel:${selectedLocation.phone}`} className="hover:text-[#D99A45] transition-colors">
                    {selectedLocation.phone}
                  </a>
                </div>
              </div>

              {/* Weekly Opening Hours */}
              <div className="mt-6 p-4 rounded-xl bg-[#29231F] border border-[#F3E4CC]/10">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#D99A45] mb-3">
                  <Clock className="w-4 h-4" />
                  Full Weekly Opening Hours
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-xs text-[#F3E4CC]/85">
                  <div>
                    <span className="font-bold text-[#F3E4CC] block">Monday – Thursday</span>
                    <span>{selectedLocation.hours.weekdays}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#F3E4CC] block">Friday</span>
                    <span className="text-[#D99A45] font-semibold">{selectedLocation.hours.friday}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#F3E4CC] block">Saturday</span>
                    <span className="text-[#D99A45] font-semibold">{selectedLocation.hours.saturday}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#F3E4CC] block">Sunday</span>
                    <span>{selectedLocation.hours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Service Features Badges */}
              <div className="mt-5">
                <div className="text-xs font-black uppercase tracking-wider text-[#F3E4CC]/70 mb-2">
                  Court Facilities & Order Modes
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLocation.features.map((feat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#29231F] border border-[#D99A45]/30 text-xs font-bold text-[#F3E4CC]"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons: Get Directions & Order Now */}
            <div className="mt-8 pt-6 border-t border-[#F3E4CC]/15 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCopyDirections}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#29231F] hover:bg-[#8B2E24] text-[#F3E4CC] font-bold text-xs uppercase tracking-wider transition-colors border border-[#F3E4CC]/20"
              >
                {directionsCopied ? (
                  <>
                    <Check className="w-4 h-4 text-[#D99A45]" />
                    <span>Address Copied!</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 text-[#D99A45]" />
                    <span>Get Directions</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onStartOrderForLocation(selectedLocation)}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#8B2E24] hover:bg-[#D99A45] text-[#F3E4CC] hover:text-[#29231F] font-black text-xs uppercase tracking-wider transition-all duration-150 shadow-lg"
              >
                <span>Order for Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Styled Map Display (Palette Match: Cream roads, Charcoal ground, Burgundy routes, Warm Gold Pins) */}
          <div className="lg:col-span-6 bg-[#1F1916] rounded-3xl border-2 border-[#8B2E24]/50 overflow-hidden relative shadow-2xl flex flex-col min-h-[380px]">
            {/* Map Header Status */}
            <div className="p-4 bg-[#29231F] border-b border-[#F3E4CC]/10 flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D99A45] animate-pulse" />
                <span className="text-[#D99A45] uppercase">Live Metro Navigation Radar</span>
              </div>
              <span className="text-[#F3E4CC]/70 font-mono">COURT-{selectedLocation.id.toUpperCase()}</span>
            </div>

            {/* Custom Brand Styled Vector Map */}
            <div className="relative flex-1 w-full bg-[#241E1A] overflow-hidden p-6 flex items-center justify-center select-none">
              <svg className="w-full h-full min-h-[320px]" viewBox="0 0 500 350" fill="none">
                {/* City Blocks (Charcoal tone) */}
                <rect x="20" y="20" width="120" height="80" rx="8" fill="#1F1916" stroke="#2E2622" strokeWidth="2" />
                <rect x="160" y="20" width="170" height="80" rx="8" fill="#1F1916" stroke="#2E2622" strokeWidth="2" />
                <rect x="350" y="20" width="130" height="80" rx="8" fill="#1F1916" stroke="#2E2622" strokeWidth="2" />

                <rect x="20" y="120" width="120" height="90" rx="8" fill="#1F1916" stroke="#2E2622" strokeWidth="2" />
                <rect x="160" y="120" width="170" height="90" rx="8" fill="#1F1916" stroke="#2E2622" strokeWidth="2" />
                <rect x="350" y="120" width="130" height="90" rx="8" fill="#1F1916" stroke="#2E2622" strokeWidth="2" />

                <rect x="20" y="230" width="120" height="100" rx="8" fill="#1F1916" stroke="#2E2622" strokeWidth="2" />
                <rect x="160" y="230" width="170" height="100" rx="8" fill="#1F1916" stroke="#2E2622" strokeWidth="2" />
                <rect x="350" y="230" width="130" height="100" rx="8" fill="#1F1916" stroke="#2E2622" strokeWidth="2" />

                {/* Road Network (Cream-accented lanes) */}
                <line x1="0" y1="110" x2="500" y2="110" stroke="#F3E4CC" strokeWidth="6" strokeOpacity="0.25" />
                <line x1="0" y1="220" x2="500" y2="220" stroke="#F3E4CC" strokeWidth="8" strokeOpacity="0.35" />
                <line x1="150" y1="0" x2="150" y2="350" stroke="#F3E4CC" strokeWidth="6" strokeOpacity="0.25" />
                <line x1="340" y1="0" x2="340" y2="350" stroke="#F3E4CC" strokeWidth="6" strokeOpacity="0.25" />

                {/* Fast Delivery Route Line (Burgundy Glowing Vector) */}
                <path
                  d="M 50 350 L 50 220 L 250 220 L 250 160"
                  stroke="#8B2E24"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />

                {/* Location Pin: Selected Location */}
                <g transform="translate(250, 160)">
                  {/* Ping Ring */}
                  <circle r="22" fill="#D99A45" fillOpacity="0.25" className="animate-ping" />
                  <circle r="14" fill="#8B2E24" stroke="#D99A45" strokeWidth="2.5" />
                  <circle r="5" fill="#F3E4CC" />
                  <text x="18" y="4" fill="#F3E4CC" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                    {selectedLocation.name.replace('Fast Meals Court — ', '')}
                  </text>
                  <text x="18" y="18" fill="#D99A45" fontSize="10" fontFamily="sans-serif">
                    Open Now • {selectedLocation.closeTime}
                  </text>
                </g>

                {/* Secondary Location Markers */}
                <g transform="translate(80, 80)">
                  <circle r="7" fill="#29231F" stroke="#D99A45" strokeWidth="2" />
                  <text x="12" y="4" fill="#F3E4CC" fontSize="10" opacity="0.75" fontFamily="sans-serif">
                    Westside Hub
                  </text>
                </g>

                <g transform="translate(420, 270)">
                  <circle r="7" fill="#29231F" stroke="#D99A45" strokeWidth="2" />
                  <text x="-90" y="4" fill="#F3E4CC" fontSize="10" opacity="0.75" fontFamily="sans-serif">
                    Metro Plaza
                  </text>
                </g>
              </svg>

              {/* Floating Map Overlay Pill */}
              <div className="absolute bottom-4 right-4 bg-[#29231F]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D99A45]/40 text-xs text-[#F3E4CC] font-bold flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#48A02C]" />
                <span>Drive-thru & Counter Lanes Active</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
