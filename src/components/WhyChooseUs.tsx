'use client';

import React, { useState } from 'react';
import { Globe, MapPin, Box, Sprout, ChevronDown } from 'lucide-react';
import { Card3D } from './Card3D';

const items = [
  {
    id: 1,
    icon: Globe,
    title: 'Sourcing Locations',
    stat: '50+',
    description: 'Direct partnerships across 50+ sourcing points in South India — from Nashik grapes to Guntur chillies.',
  },
  {
    id: 2,
    icon: MapPin,
    title: 'Pan-India Supplier Network',
    stat: '100+',
    description: 'A robust supplier network spanning every major agricultural region, ensuring year-round availability.',
  },
  {
    id: 3,
    icon: Box,
    title: 'Multi-Category Trade',
    stat: '6',
    description: 'From fresh produce and spices to processed goods and industrial commodities — all under one roof.',
  },
  {
    id: 4,
    icon: Sprout,
    title: 'Global Distribution',
    stat: '50+',
    description: 'Seamless domestic and international logistics to 50+ countries with temperature-controlled shipping.',
  },
];

export const WhyChooseUs: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(1); // Default first item open for nice mobile preview

  const toggleItem = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="wcu-section relative overflow-hidden py-16 sm:py-24">
      {/* Animated Road & Delivery Truck with CORE & CULM Logo */}
      <div className="wcu-truck-track">
        <div className="wcu-road" />
        <div className="wcu-road-dashes" />
        <div className="wcu-truck-wrapper">
          <div className="wcu-truck-trail" />
          <img
            src="/assets/core-and-culm-truck.png"
            alt="CORE & CULM Delivery Truck"
            className="wcu-truck"
          />
          <div className="wcu-truck-shadow" />
        </div>
      </div>

      <div className="wcu-container px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <div className="wcu-header text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            ✨ Verified Trade Advantages
          </span>
          <h2 className="wcu-title text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Why Choose Us
          </h2>
          <p className="wcu-subtitle text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-2 font-normal leading-relaxed">
            We are your trusted partner for agricultural trade with comprehensive farm-to-port logistics solutions.
          </p>
        </div>

        {/* Desktop & Mobile Responsive 3D Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;

            return (
              <Card3D key={item.id} maxTilt={10} perspective={800} className="h-full">
                <div
                  onClick={() => toggleItem(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
                  className={`cursor-pointer rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between h-full border ${
                    isActive
                      ? 'bg-gradient-to-br from-emerald-600 to-emerald-800 text-white border-emerald-500 shadow-xl shadow-emerald-900/20 -translate-y-1'
                      : 'bg-white/90 hover:bg-white text-slate-800 border-slate-200/80 shadow-md hover:border-emerald-300'
                  }`}
                >
                  <div>
                    {/* Top Icon & Stat */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-2xl sm:text-3xl font-black tracking-tight ${
                          isActive ? 'text-amber-300' : 'text-emerald-700'
                        }`}
                      >
                        {item.stat}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-lg font-extrabold mb-2 leading-snug ${
                        isActive ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isActive ? 'text-emerald-50' : 'text-slate-600'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Tap hint for mobile */}
                  <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between text-[11px] font-semibold opacity-75 sm:hidden">
                    <span>{isActive ? 'Active Feature' : 'Tap to expand'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isActive ? 'rotate-180' : ''
                      }`}
                    />
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
