'use client';

import React, { useState } from 'react';
import { TRADE_CORRIDORS, CONTACT_INFO } from '@/data/shipyonData';
import { Globe, Ship, Clock, CheckCircle2, ArrowRight, Anchor, Navigation } from 'lucide-react';

interface GlobalReachProps {
  onOpenQuoteModal: () => void;
}

export const GlobalReach: React.FC<GlobalReachProps> = ({ onOpenQuoteModal }) => {
  const [selectedCorridor, setSelectedCorridor] = useState(0);

  return (
    <section id="corridors" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5 text-brand-600" />
            <span>Maritime &amp; Air Corridors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Connecting South India to Over 50 Countries
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Strategic proximity to major deep-water container transshipment ports ensures minimal sailing times and optimal shelf life preservation upon port discharge.
          </p>
        </div>

        {/* Operating Gateway Ports Strip */}
        <div className="mb-12 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Anchor className="w-6 h-6 text-brand-600 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Primary Maritime Dispatch Hubs:
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-4 mt-1">
                  {CONTACT_INFO.operatingPorts.map((port) => (
                    <span
                      key={port}
                      className="text-xs font-bold text-slate-800 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm"
                    >
                      {port}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={onOpenQuoteModal}
              className="whitespace-nowrap text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1.5"
            >
              <span>Check Freight Rates for Your Port</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Corridor Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Corridor Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {TRADE_CORRIDORS.map((corridor, idx) => {
              const isSelected = selectedCorridor === idx;

              return (
                <button
                  key={corridor.region}
                  onClick={() => setSelectedCorridor(idx)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xl'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-brand-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-extrabold">{corridor.region}</span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        isSelected
                          ? 'bg-brand-500 text-slate-950'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {corridor.transitDays}
                    </span>
                  </div>
                  <p
                    className={`text-xs ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    Key Commodities: {corridor.leadCommodities}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Corridor Deep Dive */}
          <div className="lg:col-span-7 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
                    Trade Corridor Spotlight
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-1">
                    {TRADE_CORRIDORS[selectedCorridor].region}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-brand-300">
                  <Clock className="w-4 h-4 text-brand-400" />
                  <span>{TRADE_CORRIDORS[selectedCorridor].transitDays}</span>
                </div>
              </div>

              {/* Destination Ports Listed */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Frequent Destination Ports &amp; Terminals
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TRADE_CORRIDORS[selectedCorridor].countries.map((country) => (
                    <div
                      key={country}
                      className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2.5 text-xs font-semibold text-slate-200"
                    >
                      <Navigation className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                      <span>{country}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Commodities */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  High-Demand Export Volumes
                </span>
                <p className="text-sm text-slate-200 font-medium">
                  {TRADE_CORRIDORS[selectedCorridor].leadCommodities}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={onOpenQuoteModal}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-brand-500 hover:bg-brand-400 text-slate-950 shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Request Route Rate for {TRADE_CORRIDORS[selectedCorridor].region}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
