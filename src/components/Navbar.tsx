import React, { useState, useEffect } from 'react';
import { Flame, ShoppingBag, Menu as MenuIcon, X, MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onNavigateSection }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Menu', id: 'menu-showcase' },
    { label: 'Fresh Story', id: 'brand-story' },
    { label: 'The Vibe', id: 'gallery-section' },
    { label: 'Reviews', id: 'reviews-section' },
    { label: 'Locations & Hours', id: 'locations-section' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#29231F]/95 backdrop-blur-md shadow-xl py-3 border-b border-[#8B2E24]/30'
          : 'bg-[#29231F] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleLinkClick('hero-section')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#8B2E24] flex items-center justify-center border border-[#D99A45] shadow-md group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 text-[#D99A45]" />
          </div>
          <div>
            <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-[#F3E4CC] leading-none block">
              FAST MEALS <span className="text-[#D99A45]">COURT</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D99A45] block -mt-0.5">
              Quick-Service • Fresh Flame
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleLinkClick(link.id)}
              className="text-sm font-bold text-[#F3E4CC] hover:text-[#D99A45] uppercase tracking-wide transition-colors py-1"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions: Status Badge, Cart Button, Order CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Live Speed Status indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B2E24]/20 border border-[#D99A45]/30 text-xs font-semibold text-[#F3E4CC]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D99A45] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D99A45]"></span>
            </span>
            <span className="text-[11px] text-[#F3E4CC]">Avg Prep: <strong className="text-[#D99A45]">3.4 min</strong></span>
          </div>

          {/* Cart Tray Button */}
          <button
            type="button"
            onClick={onOpenCart}
            id="nav-cart-btn"
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#8B2E24]/30 hover:bg-[#8B2E24] text-[#F3E4CC] transition-colors border border-[#D99A45]/40"
            title="View Order Tray"
          >
            <ShoppingBag className="w-5 h-5 text-[#F3E4CC]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#D99A45] text-[#29231F] text-xs font-black flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary CTA: Order Now */}
          <button
            type="button"
            onClick={() => handleLinkClick('menu-showcase')}
            id="nav-order-now-btn"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#8B2E24] hover:bg-[#D99A45] text-[#F3E4CC] hover:text-[#29231F] font-bold text-sm uppercase tracking-wider transition-all duration-150 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
          >
            <span>Order Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#F3E4CC] hover:text-[#D99A45] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#29231F] border-b-2 border-[#8B2E24] px-4 pt-4 pb-6 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left text-lg font-bold text-[#F3E4CC] hover:text-[#D99A45] py-2 border-b border-[#F3E4CC]/10 uppercase tracking-wide"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs text-[#D99A45] font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Downtown Open until 11:30 PM • 3.4m Avg Prep</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleLinkClick('menu-showcase')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#8B2E24] hover:bg-[#D99A45] text-[#F3E4CC] hover:text-[#29231F] font-black uppercase tracking-wider text-center shadow-lg transition-colors"
                >
                  <span>Start Fast Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
