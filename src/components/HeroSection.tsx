import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Zap, Flame, ShieldCheck, Clock } from 'lucide-react';
import { ThreeHeroMeal } from './ThreeHeroMeal';

interface HeroSectionProps {
  onViewMenu: () => void;
  onFindLocation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewMenu, onFindLocation }) => {
  return (
    <section
      id="hero-section"
      className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 bg-[#F3E4CC] overflow-hidden"
    >
      {/* Dynamic Background Geometry & Subtle Motion Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B2E24]/8 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D99A45]/15 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      {/* Speed Stripe Accent */}
      <div className="absolute top-28 left-0 w-24 h-1.5 bg-[#8B2E24] hidden md:block" />
      <div className="absolute top-31 left-0 w-16 h-1.5 bg-[#D99A45] hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Bold Typography & CTAs */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 z-10 text-left"
          >
            {/* Speed Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#29231F] text-[#F3E4CC] border border-[#D99A45]/40 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#8B2E24] text-[#D99A45]">
                <Zap className="w-2.5 h-2.5" />
              </span>
              <span>Next-Gen Quick Service • 3.4 Min Ticket Time</span>
            </div>

            {/* Oversized Confident Wordmark */}
            <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#29231F] leading-[0.92]">
              FAST MEALS <br />
              <span className="text-[#8B2E24] inline-flex items-center">
                COURT
                {/* Gold Speed Spark Graphic */}
                <span className="ml-3 inline-flex items-center justify-center text-[#D99A45]">
                  <Flame className="w-8 h-8 sm:w-12 sm:h-12 inline animate-pulse" />
                </span>
              </span>
            </h1>

            {/* Tagline */}
            <p className="mt-4 sm:mt-5 text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#8B2E24]">
              Fast. Fresh. No Compromise.
            </p>

            <p className="mt-3 text-base sm:text-lg text-[#29231F]/85 font-medium max-w-xl leading-relaxed">
              Flame-seared 100% Angus patties smashed at 450°F, double-flash fried rosemary russets, and house craft shakes. Built for speed, made strictly to order.
            </p>

            {/* Two Primary CTAs */}
            <div className="mt-7 sm:mt-8 flex flex-wrap gap-4 items-center">
              <button
                type="button"
                onClick={onViewMenu}
                id="hero-view-menu-btn"
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#8B2E24] hover:bg-[#D99A45] text-[#F3E4CC] hover:text-[#29231F] font-black text-base uppercase tracking-wider transition-all duration-150 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-95"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={onFindLocation}
                id="hero-find-location-btn"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#29231F] hover:bg-[#8B2E24] text-[#F3E4CC] font-bold text-base uppercase tracking-wider transition-all duration-150 border-2 border-[#29231F] hover:border-[#8B2E24] shadow-md hover:scale-[1.02] active:scale-95"
              >
                <MapPin className="w-4 h-4 text-[#D99A45]" />
                <span>Order / Locations</span>
              </button>
            </div>

            {/* Live Trust Metrics / Feature Badges */}
            <div className="mt-8 pt-6 border-t-2 border-[#29231F]/15 grid grid-cols-3 gap-3 max-w-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#8B2E24]/15 flex items-center justify-center text-[#8B2E24]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#29231F] uppercase">3.4 Mins</div>
                  <div className="text-[11px] text-[#29231F]/70 font-medium">Avg Prep</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#8B2E24]/15 flex items-center justify-center text-[#8B2E24]">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#29231F] uppercase">450°F</div>
                  <div className="text-[11px] text-[#29231F]/70 font-medium">Flash Sear</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#8B2E24]/15 flex items-center justify-center text-[#8B2E24]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#29231F] uppercase">100%</div>
                  <div className="text-[11px] text-[#29231F]/70 font-medium">Fresh Daily</div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: 3D Interactive WebGL Dish */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Visual Backplate Card */}
            <div className="w-full rounded-3xl bg-gradient-to-b from-[#29231F] to-[#1F1916] p-4 sm:p-6 shadow-2xl border-4 border-[#8B2E24] relative overflow-hidden">
              {/* Header inside 3D Card */}
              <div className="flex items-center justify-between pb-2 border-b border-[#F3E4CC]/10 text-xs uppercase font-bold text-[#F3E4CC]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D99A45] animate-ping" />
                  <span className="text-[#D99A45] tracking-wider">3D Dish Visualizer</span>
                </div>
                <span className="text-stone-300 font-mono text-[11px]">THE COURT DOUBLE STACK</span>
              </div>

              {/* Three.js 3D Canvas */}
              <ThreeHeroMeal onOrderNow={onViewMenu} />

              {/* Bottom Quick Order Footer */}
              <div className="mt-2 pt-3 border-t border-[#F3E4CC]/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#F3E4CC]/70 font-bold uppercase">The Court Double Stack</div>
                  <div className="text-lg font-black text-[#D99A45]">$9.85 <span className="text-xs text-[#F3E4CC]/60 font-normal">| 780 kcal</span></div>
                </div>
                <button
                  type="button"
                  onClick={onViewMenu}
                  className="px-4 py-2 rounded-lg bg-[#8B2E24] hover:bg-[#D99A45] text-[#F3E4CC] hover:text-[#29231F] font-bold text-xs uppercase tracking-wider transition-colors shadow"
                >
                  Order This Item
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
