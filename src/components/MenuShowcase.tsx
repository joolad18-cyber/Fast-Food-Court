import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, Search, Filter } from 'lucide-react';
import { CategoryType, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuCard } from './MenuCard';

interface MenuShowcaseProps {
  onQuickAdd: (item: MenuItem) => void;
  onSelectItem: (item: MenuItem) => void;
}

export const MenuShowcase: React.FC<MenuShowcaseProps> = ({ onQuickAdd, onSelectItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'signature' | 'spicy' | 'popular' | 'vegetarian'>('all');

  const categories: (CategoryType | 'All')[] = ['All', 'Burgers', 'Combos', 'Sides', 'Drinks', 'Desserts'];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Quick filter
      if (activeFilter === 'signature' && !item.isSignature) return false;
      if (activeFilter === 'spicy' && !item.isSpicy) return false;
      if (activeFilter === 'popular' && !item.isPopular) return false;
      if (activeFilter === 'vegetarian' && !item.isVegetarian) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchIng = item.ingredients.some(ing => ing.toLowerCase().includes(q));
        return matchName || matchDesc || matchIng;
      }

      return true;
    });
  }, [selectedCategory, activeFilter, searchQuery]);

  return (
    <section id="menu-showcase" className="py-16 sm:py-24 bg-[#F3E4CC] text-[#29231F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B2E24] text-[#F3E4CC] text-xs font-black uppercase tracking-widest mb-3">
              <Flame className="w-3.5 h-3.5 text-[#D99A45]" />
              Rapid Kitchen Showcase
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#29231F] leading-tight">
              HOT, FRESH & <span className="text-[#8B2E24]">READY FAST</span>
            </h2>
            <p className="mt-2 text-base text-[#29231F]/80 font-semibold max-w-xl">
              Select your favorites below. Smashed, crisped, and poured strictly to order in under 4 minutes.
            </p>
          </div>

          {/* Rapid Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#29231F]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search burgers, sides, shakes..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border-2 border-[#29231F]/20 text-[#29231F] placeholder-[#29231F]/50 text-xs font-semibold focus:outline-none focus:border-[#8B2E24] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8B2E24] hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Sharp High-Contrast Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b-2 border-[#29231F]/15 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-heading text-lg sm:text-xl font-black uppercase tracking-wider transition-all duration-150 whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#8B2E24] text-[#F3E4CC] shadow-lg scale-105 border-2 border-[#D99A45]'
                  : 'bg-[#29231F]/10 hover:bg-[#29231F]/20 text-[#29231F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dietary & Style Filter Chips */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#29231F]/70 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#8B2E24]" />
            Filter:
          </span>

          {[
            { id: 'all', label: 'All Items' },
            { id: 'signature', label: '★ Signature' },
            { id: 'spicy', label: '🔥 Blaze Spicy' },
            { id: 'popular', label: '⚡ Most Popular' },
            { id: 'vegetarian', label: '🌱 Plant-Based' },
          ].map((flt) => (
            <button
              key={flt.id}
              type="button"
              onClick={() => setActiveFilter(flt.id as any)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-150 ${
                activeFilter === flt.id
                  ? 'bg-[#29231F] text-[#F3E4CC] ring-2 ring-[#D99A45]'
                  : 'bg-white/60 hover:bg-white text-[#29231F] border border-[#29231F]/20'
              }`}
            >
              {flt.label}
            </button>
          ))}

          <span className="ml-auto text-xs font-bold text-[#29231F]/60">
            Showing {filteredItems.length} items
          </span>
        </div>

        {/* 3D Snappy Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#29231F]/5 rounded-2xl border-2 border-dashed border-[#29231F]/20">
            <p className="font-heading text-2xl font-black uppercase text-[#29231F]">
              No dishes found matching "{searchQuery}"
            </p>
            <p className="text-xs text-[#29231F]/70 mt-1">
              Try resetting your filter or searching for another crave-worthy favorite.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setActiveFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#8B2E24] text-[#F3E4CC] font-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onQuickAdd={onQuickAdd}
                onSelectDetails={onSelectItem}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
