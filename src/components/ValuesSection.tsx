'use client';

import React from 'react';
import { CheckCircle, Sprout, Award, Globe } from 'lucide-react';
import { Card3D } from './Card3D';

const values = [
  {
    id: 1,
    icon: CheckCircle,
    title: 'Quality Assured',
    desc: 'Certified organic and export-grade produce from trusted farms across South India.',
  },
  {
    id: 2,
    icon: Sprout,
    title: 'Farm Direct',
    desc: 'Direct sourcing ensures exceptional freshness, transparent origin, and fair grower pricing.',
  },
  {
    id: 3,
    icon: Award,
    title: 'Fast Logistics',
    desc: 'Rapid temperature-controlled ocean reefer and air container freight dispatch.',
  },
  {
    id: 4,
    icon: Globe,
    title: 'Global Delivery',
    desc: 'Consistent on-time export delivery to 50+ destination countries worldwide.',
  },
];

export const ValuesSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-white via-emerald-50/20 to-white">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            Our Core Values
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            The Pillars of Our Promise
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-3 font-normal leading-relaxed">
            Four commitments that define every product we source and every international partnership we build.
          </p>
        </div>

        {/* 4 Balanced Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <Card3D key={val.id} maxTilt={10} perspective={800} className="h-full">
                <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2.5 leading-snug">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {val.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Verified Standard</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
