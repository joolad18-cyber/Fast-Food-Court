import React from 'react';
import { Flame, Zap, Award, Clock } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { text: 'FLAME-SEARD IN 180 SECONDS', icon: Flame },
    { text: 'FAST. FRESH. NO COMPROMISE.', icon: Zap },
    { text: '100% ANGUS SMASH PATTIES', icon: Award },
    { text: 'DOUBLE-FLASH FRIED CRISPY RUSSETS', icon: Flame },
    { text: 'AVG PREP TIME 3.4 MINUTES', icon: Clock },
    { text: 'ZERO COMPROMISE CRAFT COMBOS', icon: Zap },
  ];

  return (
    <div className="relative overflow-hidden bg-[#8B2E24] text-[#F3E4CC] py-3.5 border-y-2 border-[#D99A45] select-none shadow-md">
      <div className="animate-marquee-fast flex items-center space-x-8">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center space-x-3 whitespace-nowrap">
              <span className="font-heading text-lg sm:text-xl font-black uppercase tracking-wider text-[#F3E4CC]">
                {item.text}
              </span>
              <Icon className="w-4 h-4 text-[#D99A45]" />
              <span className="text-[#D99A45] font-black text-xl">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
