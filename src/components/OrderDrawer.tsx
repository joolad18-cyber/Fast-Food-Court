import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Clock, ArrowRight, CheckCircle2, Flame, MapPin } from 'lucide-react';
import { CartItem, RestaurantLocation } from '../types';
import { RESTAURANT_LOCATIONS } from '../data/restaurantData';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'takeaway' | 'dinein' | 'delivery'>('takeaway');
  const [selectedLocation, setSelectedLocation] = useState<RestaurantLocation>(RESTAURANT_LOCATIONS[0]);
  const [customerName, setCustomerName] = useState<string>('');
  const [isOrdered, setIsOrdered] = useState<boolean>(false);
  const [ticketNumber, setTicketNumber] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, ci) => {
    let itemPrice = ci.item.price;
    if (ci.selectedOptions?.makeCombo) itemPrice += 4.25;
    if (ci.selectedOptions?.extraCheese) itemPrice += 1.25;
    return sum + itemPrice * ci.quantity;
  }, 0);

  const tax = subtotal * 0.0875;
  const deliveryFee = orderType === 'delivery' ? 2.99 : 0;
  const total = subtotal + tax + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = 'FMC-' + Math.floor(100 + Math.random() * 900);
    setTicketNumber(randomTicket);
    setIsOrdered(true);
  };

  const handleFinish = () => {
    setIsOrdered(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#29231F] text-[#F3E4CC] border-l-2 border-[#8B2E24] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
          
          {/* Order Complete Screen */}
          {isOrdered ? (
            <div className="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-[#8B2E24] border-2 border-[#D99A45] flex items-center justify-center text-[#D99A45] animate-bounce shadow-2xl">
                <Flame className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#D99A45] block mb-1">
                  Ticket Fired To Kitchen!
                </span>
                <h3 className="font-heading text-4xl font-black uppercase text-[#F3E4CC]">
                  ORDER #{ticketNumber}
                </h3>
              </div>

              <div className="p-5 rounded-2xl bg-[#1F1916] border border-[#D99A45]/40 w-full text-left space-y-3">
                <div className="flex items-center justify-between text-xs font-bold border-b border-[#F3E4CC]/10 pb-2">
                  <span className="text-[#F3E4CC]/70">Pickup Location</span>
                  <span className="text-[#D99A45]">{selectedLocation.name.replace('Fast Meals Court — ', '')}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold border-b border-[#F3E4CC]/10 pb-2">
                  <span className="text-[#F3E4CC]/70">Ready Estimate</span>
                  <span className="text-[#F3E4CC] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D99A45]" />
                    3.8 Minutes
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#F3E4CC]/70">Mode</span>
                  <span className="capitalize text-[#D99A45]">{orderType}</span>
                </div>
              </div>

              <p className="text-xs text-[#F3E4CC]/80">
                Show ticket #{ticketNumber} at the Express Counter or App Locker to grab your hot tray.
              </p>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl bg-[#8B2E24] hover:bg-[#D99A45] text-[#F3E4CC] hover:text-[#29231F] font-black uppercase tracking-wider text-sm transition-colors shadow-lg"
              >
                Done & Return to Menu
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-5 bg-[#1F1916] border-b border-[#F3E4CC]/15 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#8B2E24] flex items-center justify-center text-[#D99A45]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-black uppercase text-[#F3E4CC]">
                      Your Fast Order Tray
                    </h3>
                    <span className="text-[11px] text-[#D99A45] font-bold">
                      {items.length} {items.length === 1 ? 'item' : 'items'} in tray
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-[#29231F] hover:bg-[#8B2E24] text-[#F3E4CC] flex items-center justify-center transition-colors border border-[#F3E4CC]/15"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Order Mode Toggle */}
              <div className="p-4 bg-[#241E1A] border-b border-[#F3E4CC]/10 flex gap-1.5 flex-shrink-0">
                {[
                  { id: 'takeaway', label: 'Takeaway / Bag' },
                  { id: 'dinein', label: 'Dine-In Tray' },
                  { id: 'delivery', label: 'Fast Delivery' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setOrderType(mode.id as any)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                      orderType === mode.id
                        ? 'bg-[#8B2E24] text-[#F3E4CC] shadow'
                        : 'bg-[#1F1916] text-[#F3E4CC]/70 hover:text-[#F3E4CC]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {/* Scrollable Items Area */}
              <div className="p-5 flex-1 overflow-y-auto space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-[#F3E4CC]/30 mx-auto mb-3" />
                    <p className="font-heading text-2xl font-black uppercase text-[#F3E4CC]">
                      Your tray is empty
                    </p>
                    <p className="text-xs text-[#F3E4CC]/60 mt-1">
                      Choose from our flame-seared burgers, crispy sides, and fresh craft shakes.
                    </p>
                  </div>
                ) : (
                  items.map((cartItem, idx) => {
                    let itemTotal = cartItem.item.price;
                    if (cartItem.selectedOptions?.makeCombo) itemTotal += 4.25;
                    if (cartItem.selectedOptions?.extraCheese) itemTotal += 1.25;
                    itemTotal *= cartItem.quantity;

                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#1F1916] border border-[#F3E4CC]/10 flex items-center justify-between gap-3 shadow-md"
                      >
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading text-base font-black uppercase text-[#F3E4CC] truncate">
                            {cartItem.item.name}
                          </h4>
                          <div className="text-[11px] text-[#D99A45] font-bold">
                            ${itemTotal.toFixed(2)}
                          </div>
                          {cartItem.selectedOptions?.makeCombo && (
                            <span className="inline-block text-[10px] text-[#F3E4CC]/60 bg-[#29231F] px-1.5 py-0.5 rounded mr-1 mt-0.5">
                              + Combo Upgrade
                            </span>
                          )}
                          {cartItem.selectedOptions?.extraCheese && (
                            <span className="inline-block text-[10px] text-[#F3E4CC]/60 bg-[#29231F] px-1.5 py-0.5 rounded mt-0.5">
                              + Extra Cheddar
                            </span>
                          )}
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 bg-[#29231F] px-2 py-1 rounded-lg border border-[#F3E4CC]/15">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(idx, cartItem.quantity - 1)}
                            className="p-0.5 hover:text-[#D99A45]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-black w-4 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(idx, cartItem.quantity + 1)}
                            className="p-0.5 hover:text-[#D99A45]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => onRemoveItem(idx)}
                          className="text-[#F3E4CC]/40 hover:text-[#8B2E24] p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })
                )}

                {/* Pickup Location Selector */}
                {items.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#F3E4CC]/15 space-y-3">
                    <label className="block text-xs font-black uppercase tracking-wider text-[#D99A45]">
                      Pick Up Court Location
                    </label>
                    <select
                      value={selectedLocation.id}
                      onChange={(e) => {
                        const loc = RESTAURANT_LOCATIONS.find((l) => l.id === e.target.value);
                        if (loc) setSelectedLocation(loc);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#1F1916] border border-[#F3E4CC]/20 text-[#F3E4CC] text-xs font-bold focus:outline-none focus:border-[#D99A45]"
                    >
                      {RESTAURANT_LOCATIONS.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name} ({l.status})
                        </option>
                      ))}
                    </select>

                    {/* Customer Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#F3E4CC]/70 mb-1">
                        Name for Kitchen Callout
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Alex M."
                        className="w-full px-3 py-2 rounded-xl bg-[#1F1916] border border-[#F3E4CC]/20 text-[#F3E4CC] placeholder-[#F3E4CC]/40 text-xs font-medium focus:outline-none focus:border-[#D99A45]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary Sticky Footer */}
              {items.length > 0 && (
                <div className="p-5 bg-[#1F1916] border-t border-[#F3E4CC]/15 space-y-3 flex-shrink-0">
                  <div className="space-y-1.5 text-xs text-[#F3E4CC]/80">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    {orderType === 'delivery' && (
                      <div className="flex justify-between text-[#D99A45]">
                        <span>Fast Courier Fee</span>
                        <span className="font-bold">${deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Estimated Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-black text-[#F3E4CC] pt-2 border-t border-[#F3E4CC]/10">
                      <span className="font-heading uppercase">Total</span>
                      <span className="text-[#D99A45] font-heading text-xl">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#8B2E24] hover:bg-[#D99A45] text-[#F3E4CC] hover:text-[#29231F] font-black uppercase tracking-wider text-sm transition-all duration-150 shadow-xl"
                  >
                    <span>Fire Order to Kitchen • Ready in 3.8m</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};
