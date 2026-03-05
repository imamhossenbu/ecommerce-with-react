import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import img from '../../../assets/philosophy.png'

export default function Philosophy() {
  return (
    <section className="bg-primary overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 py-16 md:py-24 lg:py-32 pr-0 lg:pr-16"
          >
            <h2 className="text-h2 text-primary mb-8 font-medium leading-tight">
              Our Skincare Philosophy
            </h2>
            
            <div className="space-y-6 text-body text-secondary max-w-xl">
              <p>
                Seoul Mirage was born from a deep appreciation for Korean skincare innovation 
                and the belief that effective products should be accessible to everyone.
              </p>
              <p>
                We combine time-tested Korean ingredients with modern science to create 
                formulations that deliver visible results. Each product is meticulously 
                crafted to honor the tradition of the multi-step skincare ritual while 
                fitting seamlessly into your daily routine.
              </p>
            </div>

            <Link 
              to="/about"
              className="mt-10 inline-block bg-white text-dark px-10 py-3.5 rounded-full text-[14px] font-medium shadow-sm hover:bg-accent hover:text-white transition-all duration-300 transform hover:-translate-y-1"
            >
              About Us
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2 h-full min-h-80 lg:min-h-full"
          >
            <div className="h-full w-full">
              <img 
                src={img}
                alt="Skincare Philosophy" 
                className="w-full h-full object-cover object-center lg:object-right"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}