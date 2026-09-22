import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
import { HeroSection } from './components/HeroSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { BrandStorySection } from './components/BrandStorySection';
import { MenuShowcase } from './components/MenuShowcase';
import { ItemDetailModal } from './components/ItemDetailModal';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationsSection } from './components/LocationsSection';
import { OrderDrawer } from './components/OrderDrawer';
import { Footer } from './components/Footer';
import { CartItem, MenuItem, RestaurantLocation } from './types';
import { MENU_ITEMS } from './data/restaurantData';
import { ShoppingBag, ArrowUp, Zap, Flame, Check } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Pre-populate with one signature combo item to showcase active cart
    {
      item: MENU_ITEMS[0],
      quantity: 1,
      selectedOptions: {
        makeCombo: true,
        extraCheese: false,
      },
    },
  ]);

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleQuickAdd = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((ci) => ci.item.id === item.id && !ci.selectedOptions?.makeCombo && !ci.selectedOptions?.extraCheese);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to order tray!`);
  };

  const handleAddToCartWithOptions = (
    item: MenuItem,
    quantity: number,
    options: { extraCheese: boolean; makeCombo: boolean; specialNotes: string }
  ) => {
    setCartItems((prev) => [
      ...prev,
      {
        item,
        quantity,
        selectedOptions: options,
      },
    ]);
    showToast(`Added ${quantity}x ${item.name} to order tray!`);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartOrderForLocation = (location: RestaurantLocation) => {
    setIsOrderDrawerOpen(true);
    showToast(`Pickup selected at ${location.name.replace('Fast Meals Court — ', '')}`);
  };

  return (
    <div className="min-h-screen bg-[#F3E4CC] text-[#29231F] flex flex-col font-sans selection:bg-[#8B2E24] selection:text-[#F3E4CC]">
      {/* Branded Fast Loading Screen */}
      <LoadingScreen />

      {/* Sticky High-Contrast Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsOrderDrawerOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Landing with 3D Dish Visualizer */}
        <HeroSection
          onViewMenu={() => scrollToSection('menu-showcase')}
          onFindLocation={() => scrollToSection('locations-section')}
        />

        {/* High-Energy Fast Marquee Banner */}
        <MarqueeTicker />

        {/* Brand Story & Quality Standards */}
        <BrandStorySection />

        {/* Interactive Fast Menu Showcase */}
        <MenuShowcase
          onQuickAdd={handleQuickAdd}
          onSelectItem={(item) => setSelectedMenuItem(item)}
        />

        {/* The Vibe: Kitchen & Action Gallery with 3D-Tilt & Lightbox */}
        <GallerySection />

        {/* Reviews & Speed Endorsements Carousel */}
        <ReviewsSection />

        {/* Metro Locations & Full Weekly Hours with Vector Map */}
        <LocationsSection onStartOrderForLocation={handleStartOrderForLocation} />
      </main>

      {/* Footer */}
      <Footer onNavigateSection={scrollToSection} />

      {/* Item Detail & Customization Modal */}
      <ItemDetailModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onAddToCart={handleAddToCartWithOptions}
      />

      {/* Order Tray / Checkout Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Toast Notification for Quick Actions */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#29231F] text-[#F3E4CC] border-2 border-[#D99A45] shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
          <div className="w-6 h-6 rounded-full bg-[#8B2E24] flex items-center justify-center text-[#D99A45]">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Floating Mobile Quick Order Tray Button */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-5 left-4 right-4 sm:hidden z-40">
          <button
            type="button"
            onClick={() => setIsOrderDrawerOpen(true)}
            className="w-full flex items-center justify-between py-3.5 px-5 rounded-2xl bg-[#8B2E24] text-[#F3E4CC] font-black uppercase tracking-wider text-xs shadow-2xl border-2 border-[#D99A45]"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#D99A45]" />
              <span>View Order Tray ({totalCartCount})</span>
            </div>
            <span className="text-[#D99A45] font-heading text-sm">Checkout ➔</span>
          </button>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30 w-10 h-10 rounded-xl bg-[#29231F] text-[#F3E4CC] hover:bg-[#8B2E24] hover:text-[#D99A45] flex items-center justify-center shadow-xl border border-[#F3E4CC]/20 transition-all duration-150"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
