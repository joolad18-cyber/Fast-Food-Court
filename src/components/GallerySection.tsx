import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { Maximize2, X, Sparkles, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section id="gallery-section" className="py-16 sm:py-24 bg-[#29231F] text-[#F3E4CC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B2E24] text-[#F3E4CC] text-xs font-black uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5 text-[#D99A45]" />
            Restaurant Vibe & Kitchen Action
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F3E4CC] leading-tight">
            BEHIND THE <span className="text-[#D99A45]">COUNTER</span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#F3E4CC]/80 font-medium leading-relaxed">
            High energy, glowing flat-tops, fresh hand-cut ingredients, and bold modern fast-casual spaces designed for quick grab-and-go or high-energy dine-in.
          </p>
        </div>

        {/* 3D-Tilt Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer border-2 border-[#8B2E24]/30 hover:border-[#D99A45] transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#29231F] via-[#29231F]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Tag Chip */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-2.5 py-1 rounded-md bg-[#8B2E24] text-[#F3E4CC] text-[10px] font-black uppercase tracking-wider shadow">
                  {item.tag}
                </span>
              </div>

              {/* Zoom Icon on Hover */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-[#D99A45] text-[#29231F] flex items-center justify-center shadow-lg">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Caption & Title */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h4 className="font-heading text-2xl font-black uppercase text-[#F3E4CC] group-hover:text-[#D99A45] transition-colors">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-[#F3E4CC]/80 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhotoIndex !== null && (
          <div
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150"
          >
            <button
              type="button"
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-[#8B2E24] text-[#F3E4CC] hover:bg-[#D99A45] hover:text-[#29231F] flex items-center justify-center transition-colors shadow-xl"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-[#29231F]/80 text-[#F3E4CC] hover:bg-[#8B2E24] flex items-center justify-center transition-colors shadow-xl border border-[#F3E4CC]/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-[#29231F]/80 text-[#F3E4CC] hover:bg-[#8B2E24] flex items-center justify-center transition-colors shadow-xl border border-[#F3E4CC]/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image Box */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#29231F] rounded-2xl overflow-hidden border-2 border-[#D99A45] shadow-2xl animate-in zoom-in-95 duration-150"
            >
              <img
                src={GALLERY_ITEMS[selectedPhotoIndex].image}
                alt={GALLERY_ITEMS[selectedPhotoIndex].title}
                className="w-full max-h-[70vh] object-cover"
              />
              <div className="p-6 bg-[#29231F] border-t border-[#F3E4CC]/15">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#8B2E24] text-[#F3E4CC] text-xs font-black uppercase">
                    {GALLERY_ITEMS[selectedPhotoIndex].tag}
                  </span>
                  <span className="text-xs text-[#D99A45] font-bold">
                    {selectedPhotoIndex + 1} / {GALLERY_ITEMS.length}
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-black uppercase text-[#F3E4CC] mt-2">
                  {GALLERY_ITEMS[selectedPhotoIndex].title}
                </h3>
                <p className="mt-1 text-sm text-[#F3E4CC]/85">
                  {GALLERY_ITEMS[selectedPhotoIndex].caption}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
