'use client';

import React, { useState } from 'react';
import { PROCESS_STEPS } from '@/data/shipyonData';
import { Trees, CheckCircle2, Snowflake, Ship, ShieldCheck } from 'lucide-react';
import { Card3D } from './Card3D';

const iconMap = {
  Trees: Trees,
  CheckCircle2: CheckCircle2,
  Snowflake: Snowflake,
  Ship: Ship,
};

export const FarmToFreight: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-950/90 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span>Integrated Supply Chain</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            The Farm-to-Freight™ Methodology
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
            From the fertile soils of South India to maritime container terminals—we control every single touchpoint to preserve freshness, eliminate transit delays, and guarantee international compliance.
          </p>
        </div>

        {/* 4 Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PROCESS_STEPS.map((step, idx) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Ship;
            const isSelected = activeStep === idx;

            return (
              <Card3D key={step.step} maxTilt={8} perspective={800} className="h-full">
                <div
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between h-full ${
                    isSelected
                      ? 'bg-slate-800 border-brand-500/80 shadow-2xl shadow-brand-500/10 -translate-y-1'
                      : 'bg-slate-850/80 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-500'
                  }`}
                >
                  <div>
                    {/* Top Row: Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl sm:text-4xl font-black text-brand-400/80 tracking-tighter">
                        {step.step}
                      </span>
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-brand-500 text-slate-950 font-bold'
                            : 'bg-slate-700/60 text-slate-300'
                        }`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl font-extrabold text-white mb-1 leading-snug">
                      {step.title}
                    </h3>
                    <div className="text-xs font-semibold text-brand-400 mb-3.5">
                      {step.subtitle}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                      {step.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-semibold bg-slate-900/80 text-slate-300 rounded border border-slate-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Highlight Metric */}
                    <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Benchmark:</span>
                      <span className="font-bold text-brand-300">{step.highlight}</span>
                    </div>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Interactive Highlight Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-brand-400 animate-ping flex-shrink-0" />
            <span className="text-xs sm:text-sm text-slate-200">
              Active Shipments live-monitored with temperature data loggers from packing house to discharge port.
            </span>
          </div>
          <span className="text-xs font-mono text-brand-400 font-bold tracking-wider whitespace-nowrap">
            PORT DISPATCH: TUTICORIN • CHENNAI • COCHIN
          </span>
        </div>
      </div>
    </section>
  );
};
