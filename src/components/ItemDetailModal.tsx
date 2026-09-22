import React, { useState } from 'react';
import { X, Flame, Clock, Plus, Minus, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, options: { extraCheese: boolean; makeCombo: boolean; specialNotes: string }) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [extraCheese, setExtraCheese] = useState<boolean>(false);
  const [makeCombo, setMakeCombo] = useState<boolean>(false);
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const comboAddon = 4.25;
  const cheeseAddon = 1.25;

  const unitPrice = item.price + (makeCombo ? comboAddon : 0) + (extraCheese ? cheeseAddon : 0);
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart(item, quantity, { extraCheese, makeCombo, specialNotes });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#29231F] text-[#F3E4CC] rounded-3xl overflow-hidden border-2 border-[#D99A45]/50 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#29231F]/80 text-[#F3E4CC] hover:text-[#D99A45] hover:bg-[#8B2E24] flex items-center justify-center transition-colors shadow-md border border-[#F3E4CC]/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-56 sm:h-64 w-full bg-[#1F1916] overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#29231F] via-transparent to-black/40" />

          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#8B2E24] text-[#F3E4CC] text-xs font-black uppercase tracking-wider">
              {item.category}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#29231F]/90 text-[#D99A45] text-xs font-bold border border-[#D99A45]/40 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {item.prepTimeMin} min prep
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#F3E4CC]">
                {item.name}
              </h3>
              <div className="font-heading text-2xl font-black text-[#D99A45] whitespace-nowrap">
                ${unitPrice.toFixed(2)}
              </div>
            </div>
            <p className="mt-2 text-sm text-[#F3E4CC]/80 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Ingredients Breakdown */}
          <div className="p-3.5 rounded-xl bg-[#1F1916] border border-[#F3E4CC]/10">
            <div className="text-xs font-black uppercase tracking-wider text-[#D99A45] mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Ingredients & Craft Prep
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-[#29231F] text-[#F3E4CC] text-xs font-medium border border-[#F3E4CC]/15"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D99A45]">
              Customize Your Order
            </h4>

            {/* Upgrade to Combo */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#1F1916] border border-[#F3E4CC]/15 cursor-pointer hover:border-[#D99A45] transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={makeCombo}
                  onChange={(e) => setMakeCombo(e.target.checked)}
                  className="w-4 h-4 accent-[#8B2E24] rounded"
                />
                <div>
                  <span className="text-sm font-bold text-[#F3E4CC] block">Upgrade to Fast Combo</span>
                  <span className="text-xs text-[#F3E4CC]/60 block">Includes Double-Flash Fries + Craft Fountain Drink</span>
                </div>
              </div>
              <span className="text-sm font-black text-[#D99A45]">+${comboAddon.toFixed(2)}</span>
            </label>

            {/* Extra Cheese */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#1F1916] border border-[#F3E4CC]/15 cursor-pointer hover:border-[#D99A45] transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={extraCheese}
                  onChange={(e) => setExtraCheese(e.target.checked)}
                  className="w-4 h-4 accent-[#8B2E24] rounded"
                />
                <div>
                  <span className="text-sm font-bold text-[#F3E4CC] block">Add Melted Double American Cheddar</span>
                  <span className="text-xs text-[#F3E4CC]/60 block">Extra golden gooey melted cheese layer</span>
                </div>
              </div>
              <span className="text-sm font-black text-[#D99A45]">+${cheeseAddon.toFixed(2)}</span>
            </label>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#F3E4CC]/70 mb-1">
                Kitchen Notes (e.g. No pickles, extra napkins)
              </label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="Type kitchen instructions..."
                className="w-full px-3 py-2 rounded-lg bg-[#1F1916] border border-[#F3E4CC]/20 text-[#F3E4CC] placeholder-[#F3E4CC]/40 text-xs focus:outline-none focus:border-[#D99A45]"
              />
            </div>
          </div>

        </div>

        {/* Modal Sticky Footer */}
        <div className="p-4 sm:p-5 bg-[#1F1916] border-t border-[#F3E4CC]/15 flex items-center justify-between gap-4 flex-shrink-0">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 bg-[#29231F] px-3 py-1.5 rounded-xl border border-[#F3E4CC]/20">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 hover:text-[#D99A45] disabled:opacity-30"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-heading text-lg font-black text-[#F3E4CC] w-6 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 hover:text-[#D99A45]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#8B2E24] hover:bg-[#D99A45] text-[#F3E4CC] hover:text-[#29231F] font-black uppercase tracking-wider text-sm transition-all duration-150 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Order • ${totalPrice.toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
