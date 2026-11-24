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
    <section className="hero-section relative overflow-hidden">
      {headerSlot}

      {/* Hero Background Banner with subtle zoom */}
      <div
        className="hero-image-bg absolute inset-0 transform scale-105 transition-transform duration-1000 ease-out"
        style={{ backgroundImage: 'url("/assets/hero-banner.jpg")' }}
      />

      {/* Modern Gradient Overlays */}
      <div className="hero-overlay" />
      <div className="hero-pattern" aria-hidden="true" />

      {/* Floating Ambient Light Blobs for depth */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-glow-slow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-float-reverse" />

      {/* Main Split Grid */}
      <div className="hero-split-container">
        {/* Left Column */}
        <div className="hero-left">
          {/* Eyebrow Badge with Pulsing Live Beacon */}
          <div className="hero-eyebrow flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span className="font-semibold tracking-wide text-xs sm:text-sm">
              Pattukkottai Export Desk &bull; Global Maritime Trade
            </span>
          </div>

          {/* Main Title */}
          <h1 className="hero-main-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight sm:leading-none">
            South India&apos;s Premier Trade &amp; Sourcing Company
            <span className="hero-highlight-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent mt-2 block">
              Export Solutions
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-main-subtitle text-sm sm:text-base md:text-lg text-slate-200/95 font-normal leading-relaxed">
            Seamless sourcing, cold-chain assurance &amp; container trade — from Pattukkottai and South India to global destination ports.
          </p>

          {/* Call to Actions with Shimmer & Micro-Interactions */}
          <div className="hero-cta-group flex flex-wrap gap-3 mb-6">
            <button
              id="hero-explore-btn"
              onClick={() => onNavigate('products')}
              className="hero-btn hero-btn-primary shimmer-sweep group shadow-xl shadow-emerald-950/40 w-full sm:w-auto"
            >
              <span className="font-bold">Explore Products</span>
              <ArrowRight className="hero-btn-icon group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <button
              id="hero-contact-btn"
              onClick={() => onNavigate('contact')}
              className="hero-btn hero-btn-secondary hover:border-emerald-400/60 transition-all duration-300 w-full sm:w-auto"
            >
              <span>Contact Us</span>
            </button>
          </div>

          {/* Operational Metrics Strip (Responsive for all mobile screens) */}
          <div className="hero-stats-strip shadow-lg border border-white/10 backdrop-blur-md rounded-2xl w-full">
            <div className="grid grid-cols-2 sm:grid-cols-4 w-full divide-x divide-y sm:divide-y-0 divide-white/10">
              <div className="p-3 sm:p-4 text-center group">
                <span className="block text-lg sm:text-xl md:text-2xl font-black text-emerald-400 group-hover:scale-105 transition-transform">
                  15k+ MT
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 font-medium">
                  Annual Volume
                </span>
              </div>
              <div className="p-3 sm:p-4 text-center group">
                <span className="block text-lg sm:text-xl md:text-2xl font-black text-emerald-400 group-hover:scale-105 transition-transform">
                  48 Hrs
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 font-medium">
                  Farm to Freight
                </span>
              </div>
              <div className="p-3 sm:p-4 text-center group">
                <span className="block text-lg sm:text-xl md:text-2xl font-black text-emerald-400 group-hover:scale-105 transition-transform">
                  100%
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 font-medium">
                  Cold-Chain Assured
                </span>
              </div>
              <div className="p-3 sm:p-4 text-center group">
                <span className="block text-lg sm:text-xl md:text-2xl font-black text-amber-300 group-hover:scale-105 transition-transform">
                  24/7
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 font-medium">
                  Export Support
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Globe & Floating Glass 3D Cards */}
        <div className="hero-right-modern flex flex-col items-center justify-center w-full relative z-10 mt-8 lg:mt-0">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-glow-slow" />

          {/* Mode Switcher Tabs for 3D Globe & Stats Cards */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 border border-emerald-500/30 rounded-2xl mb-4 backdrop-blur-xl shadow-lg">
            <button
              onClick={() => setActiveTab('globe')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
            <div className="w-full max-w-md animate-fadeIn">
              <InteractiveGlobe3D height={380} />
            </div>
          ) : (
            <div className="hero-stats-dock relative z-10 w-full max-w-md space-y-3.5 animate-fadeIn">
              {/* 3D Card 1 */}
              <Card3D maxTilt={14} perspective={900}>
                <div className="hero-stats-card-inner border border-white/20 bg-white/10 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">50+</span>
                    <span className="text-xs uppercase tracking-wider text-slate-200 font-semibold">
                      Countries Served Worldwide
                    </span>
                  </div>
                </div>
              </Card3D>

              {/* 3D Card 2 */}
              <Card3D maxTilt={14} perspective={900}>
                <div className="hero-stats-card-inner border border-white/20 bg-white/10 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">1000+</span>
                    <span className="text-xs uppercase tracking-wider text-slate-200 font-semibold">
                      Global Buyers &amp; Partners
                    </span>
                  </div>
                </div>
              </Card3D>

              {/* 3D Card 3 */}
              <Card3D maxTilt={14} perspective={900}>
                <div className="hero-stats-card-inner border border-white/20 bg-white/10 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">99.8%</span>
                    <span className="text-xs uppercase tracking-wider text-slate-200 font-semibold">
                      On-Time Container Dispatches
                    </span>
                  </div>
                </div>
              </Card3D>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Scroll Indicator with Gentle Pulse */}
      <div
        className="hero-scroll-indicator cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
        onClick={() => window.scrollTo({ top: 750, behavior: 'smooth' })}
      >
        <span className="hero-scroll-text text-[10px] tracking-widest uppercase">Scroll to explore</span>
        <ChevronDown className="hero-scroll-arrow animate-bounce w-4 h-4" />
      </div>
    </section>
  );
};
