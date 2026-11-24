'use client';

import React, { useState } from 'react';
import { Globe, Users, ShieldCheck, ArrowRight, ChevronDown, Compass, BarChart3 } from 'lucide-react';
import { InteractiveGlobe3D } from './InteractiveGlobe3D';
import { Card3D } from './Card3D';

interface HeroProps {
  onNavigate: (page: string) => void;
  headerSlot?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, headerSlot }) => {
  const [activeTab, setActiveTab] = useState<'globe' | 'metrics'>('globe');

  return (
    <section className="relative overflow-hidden bg-slate-950 min-h-[92vh] flex items-center pt-28 sm:pt-32 pb-16">
      {headerSlot}

      {/* Hero Background Banner with subtle zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000 ease-out"
        style={{ backgroundImage: 'url("/assets/hero-banner.jpg")' }}
      />

      {/* Modern Gradient Overlays for maximum legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-emerald-950/70 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.15)_0%,_transparent_60%)] z-0" />

      {/* Main Split Grid (Balanced 7/5 Grid) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column (7 cols on Desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-black text-white tracking-tight leading-tight sm:leading-[1.15] mb-5">
            South India&apos;s Premier Trade &amp; Sourcing Company
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent block mt-1">
              Export Solutions
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200/90 font-normal leading-relaxed mb-7 max-w-2xl">
            Seamless sourcing, cold-chain assurance &amp; container trade — from Pattukkottai and South India to global destination ports.
          </p>

          {/* Call to Actions with Shimmer */}
          <div className="flex flex-wrap gap-3.5 mb-8">
            <button
              id="hero-explore-btn"
              onClick={() => onNavigate('products')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 shimmer-sweep hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-contact-btn"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md hover:border-emerald-400/60 transition-all duration-300 w-full sm:w-auto"
            >
              <span>Contact Us</span>
            </button>
          </div>

          {/* Operational Metrics Strip */}
          <div className="rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-xl overflow-hidden w-full max-w-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/10">
              <div className="p-3.5 sm:p-4 text-center">
                <span className="block text-xl sm:text-2xl font-black text-emerald-400">
                  15k+ MT
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 font-semibold mt-0.5 block">
                  Annual Volume
                </span>
              </div>
              <div className="p-3.5 sm:p-4 text-center">
                <span className="block text-xl sm:text-2xl font-black text-emerald-400">
                  48 Hrs
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 font-semibold mt-0.5 block">
                  Farm to Freight
                </span>
              </div>
              <div className="p-3.5 sm:p-4 text-center">
                <span className="block text-xl sm:text-2xl font-black text-emerald-400">
                  100%
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 font-semibold mt-0.5 block">
                  Cold-Chain Assured
                </span>
              </div>
              <div className="p-3.5 sm:p-4 text-center">
                <span className="block text-xl sm:text-2xl font-black text-amber-300">
                  24/7
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 font-semibold mt-0.5 block">
                  Export Support
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols on Desktop): 3D Interactive Globe & Key Benchmarks */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center w-full relative z-10 mt-4 lg:mt-0">
          {/* View Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 border border-emerald-500/40 rounded-full mb-4 backdrop-blur-xl shadow-xl">
            <button
              onClick={() => setActiveTab('globe')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'globe'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>3D Global Network</span>
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'metrics'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Key Benchmarks</span>
            </button>
          </div>

          {/* Active View Container */}
          {activeTab === 'globe' ? (
            <div className="w-full max-w-lg animate-fadeIn">
              <InteractiveGlobe3D height={380} />
            </div>
          ) : (
            <div className="relative z-10 w-full max-w-lg space-y-4 animate-fadeIn">
              {/* 3D Card 1 */}
              <Card3D maxTilt={12} perspective={900}>
                <div className="border border-white/20 bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4.5 flex items-center gap-4 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center flex-shrink-0 p-3">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">50+</span>
                    <span className="text-xs uppercase tracking-wider text-slate-200 font-semibold mt-0.5">
                      Countries Served Worldwide
                    </span>
                  </div>
                </div>
              </Card3D>

              {/* 3D Card 2 */}
              <Card3D maxTilt={12} perspective={900}>
                <div className="border border-white/20 bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4.5 flex items-center gap-4 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/20 transition-all">
                  <div className="w-13 h-13 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0 p-3">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">1000+</span>
                    <span className="text-xs uppercase tracking-wider text-slate-200 font-semibold mt-0.5">
                      Global Buyers &amp; Partners
                    </span>
                  </div>
                </div>
              </Card3D>

              {/* 3D Card 3 */}
              <Card3D maxTilt={12} perspective={900}>
                <div className="border border-white/20 bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4.5 flex items-center gap-4 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center flex-shrink-0 p-3">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">99.8%</span>
                    <span className="text-xs uppercase tracking-wider text-slate-200 font-semibold mt-0.5">
                      On-Time Container Dispatches
                    </span>
                  </div>
                </div>
              </Card3D>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
