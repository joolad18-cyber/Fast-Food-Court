import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle, Flame } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [autoplay, setAutoplay] = useState<boolean>(true);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CUSTOMER_REVIEWS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + CUSTOMER_REVIEWS.length) % CUSTOMER_REVIEWS.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % CUSTOMER_REVIEWS.length);
  };

  const currentReview = CUSTOMER_REVIEWS[currentIndex];

  return (
    <section id="reviews-section" className="py-16 sm:py-24 bg-[#F3E4CC] text-[#29231F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B2E24] text-[#F3E4CC] text-xs font-black uppercase tracking-widest mb-3">
            <Flame className="w-3.5 h-3.5 text-[#D99A45]" />
            Speed & Taste Endorsements
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#29231F]">
            WORD ON THE <span className="text-[#8B2E24]">COURT</span>
          </h2>

          <p className="mt-2 text-base text-[#29231F]/80 font-semibold">
            Over 25,000 smash-seared burgers served this month. Here is what commuters, food lovers, and regulars say.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#29231F] text-[#F3E4CC] rounded-3xl p-8 sm:p-12 border-4 border-[#8B2E24] shadow-2xl overflow-hidden">
            
            {/* Big Quote Graphic */}
            <Quote className="absolute -top-4 -right-4 w-32 h-32 text-[#8B2E24]/20 pointer-events-none" />

            {/* Stars Row with Animated Warm Gold Effect */}
            <div className="flex items-center gap-1.5 mb-6">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-lg bg-[#8B2E24]/40 flex items-center justify-center border border-[#D99A45]/30 text-[#D99A45] transition-transform duration-200 hover:scale-110"
                >
                  <Star className="w-4 h-4 fill-[#D99A45] text-[#D99A45]" />
                </div>
              ))}
              <span className="ml-3 text-xs font-extrabold uppercase tracking-widest text-[#D99A45]">
                5.0 Verified Speed & Taste
              </span>
            </div>

            {/* Quote Text */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold leading-relaxed text-[#F3E4CC] mb-8 min-h-[100px] sm:min-h-[90px] flex items-center">
              "{currentReview.quote}"
            </p>

            {/* Review Author & Dish Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#F3E4CC]/15">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-heading text-2xl font-black uppercase tracking-tight text-[#F3E4CC]">
                    {currentReview.author}
                  </h4>
                  {currentReview.verified && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#D99A45] bg-[#D99A45]/15 px-2 py-0.5 rounded-full border border-[#D99A45]/30">
                      <CheckCircle className="w-3 h-3 text-[#D99A45]" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#F3E4CC]/70 font-medium mt-0.5">
                  {currentReview.role} • Ordered: <strong className="text-[#D99A45]">{currentReview.dishOrdered}</strong>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-xl bg-[#8B2E24] hover:bg-[#D99A45] text-[#F3E4CC] hover:text-[#29231F] flex items-center justify-center transition-colors shadow"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 px-2">
                  {CUSTOMER_REVIEWS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setAutoplay(false);
                        setCurrentIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all duration-200 ${
                        currentIndex === idx ? 'w-6 bg-[#D99A45]' : 'w-2 bg-[#F3E4CC]/30'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-xl bg-[#8B2E24] hover:bg-[#D99A45] text-[#F3E4CC] hover:text-[#29231F] flex items-center justify-center transition-colors shadow"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
