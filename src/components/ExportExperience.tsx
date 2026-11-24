'use client';

import React, { useEffect, useRef } from 'react';
import { Leaf, Search, Package, Ship, Plane } from 'lucide-react';
import { Card3D } from './Card3D';

const cards = [
  {
    id: 1,
    icon: Leaf,
    title: 'Product Sourcing',
    description:
      'Direct partnerships with trusted farms and manufacturers across South India, ensuring the freshest, highest-quality produce at origin.',
  },
  {
    id: 2,
    icon: Search,
    title: 'Quality & Inspection',
    description:
      'Rigorous multi-point quality control and compliance checks at every stage — from field to freight — to meet global standards.',
  },
  {
    id: 3,
    icon: Package,
    title: 'Packaging & Documentation',
    description:
      'Export-ready packaging with full documentation support — phytosanitary, certificates of origin, and customs clearance handled end-to-end.',
  },
  {
    id: 4,
    icon: Ship,
    secondaryIcon: Plane,
    title: 'Global Shipping',
    description:
      'Sea and air freight coordination to 50+ countries, with real-time tracking and temperature-controlled logistics for perishables.',
  },
];

export const ExportExperience: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('exp-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="exp-section relative overflow-hidden py-16 sm:py-24">
      <div className="exp-particle exp-particle--a" />
      <div className="exp-particle exp-particle--b" />
      <div className="exp-particle exp-particle--c" />
      <div className="exp-orb exp-orb--1" />
      <div className="exp-orb exp-orb--2" />

      <div className="exp-inner max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="exp-header text-center mb-12 sm:mb-16">
          <span className="exp-eyebrow inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            What We Do Best
          </span>
          <h2 className="exp-title text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Our Export Expertise
          </h2>
          <p className="exp-subtitle text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-2 font-normal leading-relaxed">
            Four pillars that define how we source, prepare and deliver world-class agricultural products across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {cards.map((item, idx) => {
            const Icon = item.icon;
            const SecondaryIcon = item.secondaryIcon;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="h-full exp-card-wrapper"
              >
                <Card3D maxTilt={10} perspective={900} className="h-full">
                  <div className="rounded-3xl p-6 sm:p-8 bg-white/90 backdrop-blur-xl border border-emerald-500/20 shadow-xl shadow-slate-900/5 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      {/* 3D Sphere Icon */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-700 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        {SecondaryIcon ? (
                          <div className="flex flex-col items-center gap-0.5">
                            <Icon className="w-6 h-6 text-emerald-700" />
                            <SecondaryIcon className="w-3.5 h-3.5 text-amber-600" />
                          </div>
                        ) : (
                          <Icon className="w-7 h-7 text-emerald-700" />
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>100% Quality &amp; Compliance Assured</span>
                    </div>
                  </div>
                </Card3D>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
