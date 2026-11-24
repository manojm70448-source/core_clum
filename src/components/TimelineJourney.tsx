'use client';

import React, { useEffect, useRef } from 'react';
import { Card3D } from './Card3D';

const steps = [
  {
    id: 1,
    label: 'Step 01',
    title: 'Farm-Level Sourcing',
    body: 'We partner directly with farmers across South India — from the hills of Nilgiris to the fertile plains of Pattukkottai and Guntur — ensuring premium quality at origin.',
    image: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Farmers harvesting fresh produce',
  },
  {
    id: 2,
    label: 'Step 02',
    title: 'Quality Inspection & Grading',
    body: 'Every batch goes through multi-point phytosanitary checks and strict grading standards before it leaves the packing shed — guaranteeing consistency with every shipment.',
    image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Quality inspection of agricultural commodities',
  },
  {
    id: 3,
    label: 'Step 03',
    title: 'Logistics & Cold Chain',
    body: 'Temperature-controlled storage and refrigerated container logistics ensure that every product reaches the port as fresh as the day it was harvested.',
    image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Logistics and freight shipping',
  },
  {
    id: 4,
    label: 'Step 04',
    title: 'Global Export & Delivery',
    body: 'We export to 50+ countries worldwide, handling all customs clearance, DGFT compliance and documentation for seamless, on-time discharge.',
    image: 'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Cargo ship at port for global export',
  },
];

export const TimelineJourney: React.FC = () => {
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('tl-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    rowsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="tl-section relative overflow-hidden py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="tl-header text-center mb-12 sm:mb-16">
          <span className="tl-eyebrow inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            How We Deliver
          </span>
          <h2 className="tl-title text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Our End-to-End Trade Journey
          </h2>
          <p className="tl-subtitle text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-2 font-normal leading-relaxed">
            From farm to freight — a transparent, quality-driven methodology built for global trade.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              ref={(el) => {
                rowsRef.current[idx] = el;
              }}
              className="tl-row-wrapper"
            >
              <Card3D maxTilt={6} perspective={1000}>
                <div
                  className={`flex flex-col ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center gap-6 sm:gap-10 p-5 sm:p-8 rounded-3xl bg-white/95 border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Image with 3D Ring */}
                  <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden group shadow-md aspect-video sm:aspect-auto sm:h-64">
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                      {step.label}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 mb-1">
                      Phase 0{idx + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                      {step.body}
                    </p>
                    <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full" />
                  </div>
                </div>
              </Card3D>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
