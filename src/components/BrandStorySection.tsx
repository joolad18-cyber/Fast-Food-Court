import React from 'react';
import { Zap, Flame, Utensils, Award, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { BRAND_STATS } from '../data/restaurantData';

export const BrandStorySection: React.FC = () => {
  const sellingPoints = [
    {
      title: 'Lightning Fast Service',
      description: 'Streamlined kitchen engineering ensures your order is fired, assembled, and packed in an average of 3.4 minutes.',
      icon: Zap,
      tag: 'Speed Standard'
    },
    {
      title: 'Fresh Daily, Never Frozen',
      description: '100% Angus beef delivered fresh each morning. Never frozen, pressed by hand on 450°F searing steel.',
      icon: Flame,
      tag: 'Quality Standard'
    },
    {
      title: 'Dine-In, Takeaway & Delivery',
      description: 'Eat in our vibrant dining court, grab from rapid thermal lockers, or order direct through our delivery fleet.',
      icon: Utensils,
      tag: 'Any Way You Like'
    },
    {
      title: 'Value Combos & Family Feasts',
      description: 'Heavyweight portions crafted for big appetites without the premium restaurant price markups.',
      icon: Award,
      tag: 'Best Value'
    }
  ];

  return (
    <section id="brand-story" className="relative py-16 sm:py-24 bg-[#F3E4CC] text-[#29231F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Confident Paragraph */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B2E24] text-[#F3E4CC] text-xs font-black uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D99A45]" />
            The Fast Meals Court Promise
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#29231F] leading-tight">
            BUILT FOR SPEED. <br />
            <span className="text-[#8B2E24]">CRAFTED FOR FLAVOR.</span>
          </h2>

          <p className="mt-5 text-lg sm:text-xl text-[#29231F]/85 font-semibold leading-relaxed">
            Fast Meals Court was created for people who refuse to trade quality for time. We took the speed of traditional quick-service and replaced frozen shortcuts with fresh daily Angus beef, flash-fried Idaho russets, and house-blended sauces. Fast food doesn’t have to mean second best.
          </p>
        </div>

        {/* 4-Item Selling Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {sellingPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-[#29231F] text-[#F3E4CC] p-6 sm:p-7 rounded-2xl border-2 border-[#8B2E24]/30 hover:border-[#D99A45] transition-all duration-200 shadow-xl hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#8B2E24] flex items-center justify-center text-[#D99A45] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D99A45] bg-[#D99A45]/10 px-2.5 py-1 rounded-md border border-[#D99A45]/30">
                    {point.tag}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-black uppercase tracking-tight text-[#F3E4CC] mb-2">
                  {point.title}
                </h3>

                <p className="text-sm text-[#F3E4CC]/80 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bold Burgundy Sub-Section with Punchy Statement in Large Cream Text */}
        <div className="rounded-3xl bg-[#8B2E24] p-8 sm:p-14 text-center text-[#F3E4CC] shadow-2xl border-4 border-[#29231F] relative overflow-hidden">
          {/* Background Decorative Stamp */}
          <div className="absolute -right-8 -bottom-10 opacity-10 text-[#F3E4CC] font-heading font-black text-9xl select-none pointer-events-none">
            FAST
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#29231F] text-[#D99A45] text-xs font-black uppercase tracking-widest mb-4">
              <Clock className="w-4 h-4 text-[#D99A45]" />
              Average Ticket: Under 4 Minutes
            </div>

            <h3 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight text-[#F3E4CC]">
              HOT OFF THE GRILL, <br />
              <span className="text-[#D99A45]">IN YOUR HANDS IN MINUTES.</span>
            </h3>

            <p className="mt-4 text-base sm:text-lg text-[#F3E4CC]/90 font-medium max-w-2xl mx-auto">
              No long queues, no soggy reheated patties. Our patented high-heat flat-tops and precision assembly lines ensure peak crunch and temperature from first bite to last.
            </p>

            {/* Performance Stats Row */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#F3E4CC]/20">
              {BRAND_STATS.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-heading text-3xl sm:text-4xl font-black text-[#D99A45]">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#F3E4CC] mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-[#F3E4CC]/70 mt-0.5">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
