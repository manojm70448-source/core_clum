'use client';

import React from 'react';
import { CheckCircle, Sprout, Award, Globe } from 'lucide-react';
import { Card3D } from './Card3D';

const values = [
  {
    id: 1,
    icon: CheckCircle,
    title: 'Quality Assured',
    desc: 'Certified organic produce from trusted farms across South India.',
  },
  {
    id: 2,
    icon: Sprout,
    title: 'Farm Direct',
    desc: 'Direct sourcing ensures exceptional freshness and fair farmer pricing.',
  },
  {
    id: 3,
    icon: Award,
    title: 'Fast Logistics',
    desc: 'Rapid temperature-controlled ocean & air container shipping.',
  },
  {
    id: 4,
    icon: Globe,
    title: 'Global Delivery',
    desc: 'Consistent export to 50+ destination countries worldwide.',
  },
];

export const ValuesSection: React.FC = () => {
  return (
    <section className="vh-section relative overflow-hidden py-16 sm:py-24">
      <div className="vh-orb vh-orb--1" />
      <div className="vh-orb vh-orb--2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            Our Core Values
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            The Pillars of Our Promise
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-2 font-normal leading-relaxed">
            Four commitments that define every product we source and every international partnership we build.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <Card3D key={val.id} maxTilt={14} perspective={800} className="h-full">
                <div className="rounded-3xl p-6 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border border-emerald-500/30 text-emerald-700 flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {val.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                    <span>Verified Standard</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
