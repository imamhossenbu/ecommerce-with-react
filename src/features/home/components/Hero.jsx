import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion'; 
import hero1 from '../../../assets/hero.png'
import hero2 from '../../../assets/hero2.png'
import hero3 from '../../../assets/hero3.png'

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

export default function Hero() {
  const images = [
   hero1,
   hero2,
   hero3
  ];

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center overflow-hidden bg-dark">
      
      {/* BACKGROUND SLIDER */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            prevEl: '.prev-btn',
            nextEl: '.next-btn',
          }}
          loop={true}
          className="h-full w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div 
                className="h-full w-full bg-center bg-cover bg-no-repeat transition-transform duration-[7000ms] scale-110 active-slide-zoom"
                style={{ backgroundImage: `url(${img})` }}
              >
                <div className="absolute inset-0 bg-black/45"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="site-container relative z-10 w-full">
        <div className="max-w-[650px] text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-h1 mb-6 leading-[1.1] text-white">
              Discover your skin's <br /> true potential
            </h1>
            <p className="text-body text-gray-100 mb-10 max-w-[500px]">
              Premium skincare that combines innovation with clean, effective 
              ingredients for all skin types.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-dark px-10 py-4 rounded-full text-[14px] font-semibold hover:bg-accent hover:text-white transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                Shop Now
              </button>
              <button className="bg-white/15 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full text-[14px] font-medium hover:bg-white/25 transition-all duration-300 shadow-lg transform hover:-translate-y-1 cursor-pointer">
                About Us
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="absolute bottom-10 right-10 z-20 hidden md:flex gap-4">
        <button className="prev-btn w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300 cursor-pointer outline-none">
          <ChevronLeft size={24} />
        </button>
        <button className="next-btn w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300 cursor-pointer outline-none">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}