import React, { useState } from 'react';
import { Plus, Flame, Sparkles, Clock, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  onQuickAdd: (item: MenuItem) => void;
  onSelectDetails: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onQuickAdd, onSelectDetails }) => {
  const [justAdded, setJustAdded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onSelectDetails(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#29231F] text-[#F3E4CC] rounded-2xl overflow-hidden border-2 border-[#8B2E24]/30 hover:border-[#D99A45] transition-all duration-150 shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#1F1916]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient Shadow Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#29231F] via-transparent to-black/30 pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {item.isSignature && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#8B2E24] text-[#F3E4CC] text-[10px] font-black uppercase tracking-wider shadow-md border border-[#D99A45]/40">
              <Flame className="w-3 h-3 text-[#D99A45]" />
              Signature
            </span>
          )}

          {item.isSpicy && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#D99A45] text-[#29231F] text-[10px] font-black uppercase tracking-wider shadow-md">
              <Flame className="w-3 h-3 text-[#8B2E24]" />
              Blaze Hot
            </span>
          )}

          {item.isVegetarian && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#48A02C] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
              Plant-Based
            </span>
          )}
        </div>

        {/* Prep Time Chip */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#29231F]/90 backdrop-blur-md text-[11px] font-bold text-[#D99A45] border border-[#D99A45]/30">
          <Clock className="w-3 h-3 text-[#D99A45]" />
          <span>{item.prepTimeMin}m Prep</span>
        </div>

        {/* Subtle Steam Shimmer Animation on Hover for Signature Items */}
        {item.isSignature && isHovered && (
          <div className="absolute top-4 right-4 pointer-events-none flex flex-col items-center animate-steam">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#D99A45] bg-[#29231F]/80 px-2 py-0.5 rounded">
              Sizzling Hot
            </span>
          </div>
        )}
      </div>

      {/* Item Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-heading text-xl font-black uppercase tracking-tight text-[#F3E4CC] group-hover:text-[#D99A45] transition-colors leading-tight">
              {item.name}
            </h4>
            <span className="font-heading text-xl font-black text-[#D99A45] whitespace-nowrap">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-[#F3E4CC]/75 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Card Footer: Calories & Quick Add Button */}
        <div className="mt-4 pt-3 border-t border-[#F3E4CC]/10 flex items-center justify-between">
          <span className="text-xs text-[#F3E4CC]/60 font-medium">
            {item.calories} cal
          </span>

          <button
            type="button"
            onClick={handleAdd}
            id={`add-btn-${item.id}`}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-150 shadow ${
              justAdded
                ? 'bg-[#48A02C] text-white scale-105'
                : 'bg-[#8B2E24] hover:bg-[#D99A45] text-[#F3E4CC] hover:text-[#29231F]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
