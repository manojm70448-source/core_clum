'use client';

import React from 'react';
import { Globe, Users, ShieldCheck, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
  headerSlot?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, headerSlot }) => {
  return (
    <section className="hero-section relative overflow-hidden">
      {headerSlot}

      {/* Hero Background Banner with subtle parallax zoom */}
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
            <span className="font-semibold tracking-wide">Pattukkottai Export Desk &bull; Global Maritime Trade</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-main-title">
            South India&apos;s Premier Trade &amp; Sourcing Company
            <span className="hero-highlight-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Export Solutions
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-main-subtitle">
            Seamless sourcing, cold-chain assurance &amp; container trade — from Pattukkottai and South India to global ports.
          </p>

          {/* Call to Actions with Shimmer & Micro-Interactions */}
          <div className="hero-cta-group">
            <button
              id="hero-explore-btn"
              onClick={() => onNavigate('products')}
              className="hero-btn hero-btn-primary shimmer-sweep group shadow-xl shadow-emerald-950/40"
            >
              <span className="font-bold">Explore Products</span>
              <ArrowRight className="hero-btn-icon group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <button
              id="hero-contact-btn"
              onClick={() => onNavigate('contact')}
              className="hero-btn hero-btn-secondary hover:border-emerald-400/60 transition-all duration-300"
            >
              <span>Contact Us</span>
            </button>
          </div>

          {/* Bottom Stats Strip with Glassmorphism */}
          <div className="hero-stats-strip shadow-lg border border-white/10 backdrop-blur-md">
            <div className="hero-stat-item group">
              <span className="hero-stat-value text-emerald-400 group-hover:scale-105 transition-transform">50+</span>
              <span className="hero-stat-label">Countries Served</span>
            </div>
            <div className="hero-stat-item group">
              <span className="hero-stat-value text-emerald-400 group-hover:scale-105 transition-transform">1000+</span>
              <span className="hero-stat-label">Partners Worldwide</span>
            </div>
            <div className="hero-stat-item group">
              <span className="hero-stat-value text-emerald-400 group-hover:scale-105 transition-transform">99.8%</span>
              <span className="hero-stat-label">On-time Delivery</span>
            </div>
            <div className="hero-stat-item group">
              <span className="hero-stat-value text-amber-300 group-hover:scale-105 transition-transform">24/7</span>
              <span className="hero-stat-label">Support</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Floating Glass Cards with Dynamic Hover & Glow */}
        <div className="hero-right relative">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-glow-slow" />

          <div className="hero-stats-dock relative z-10">
            {/* Card 1 */}
            <div className="hero-stats-card hero-stats-card--left hover:scale-105 transition-all duration-300">
              <div className="hero-stats-card-inner border border-white/20 bg-white/10 backdrop-blur-xl hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all">
                <div className="hero-stats-icon-box bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                  <Globe className="hero-stats-icon" />
                </div>
                <div className="hero-stats-info">
                  <span className="hero-stats-number text-white font-black">50+</span>
                  <span className="hero-stats-label text-slate-200">Countries Served</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="hero-stats-card hero-stats-card--right hover:scale-105 transition-all duration-300">
              <div className="hero-stats-card-inner border border-white/20 bg-white/10 backdrop-blur-xl hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/20 transition-all">
                <div className="hero-stats-icon-box bg-amber-500/20 border border-amber-400/40 text-amber-300">
                  <Users className="hero-stats-icon" />
                </div>
                <div className="hero-stats-info">
                  <span className="hero-stats-number text-white font-black">1000+</span>
                  <span className="hero-stats-label text-slate-200">Global Partners</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="hero-stats-card hero-stats-card--left hover:scale-105 transition-all duration-300">
              <div className="hero-stats-card-inner border border-white/20 bg-white/10 backdrop-blur-xl hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all">
                <div className="hero-stats-icon-box bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                  <ShieldCheck className="hero-stats-icon" />
                </div>
                <div className="hero-stats-info">
                  <span className="hero-stats-number text-white font-black">99.8%</span>
                  <span className="hero-stats-label text-slate-200">On-Time Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator with Gentle Pulse */}
      <div className="hero-scroll-indicator cursor-pointer opacity-80 hover:opacity-100 transition-opacity" onClick={() => window.scrollTo({ top: 750, behavior: 'smooth' })}>
        <span className="hero-scroll-text text-xs tracking-widest uppercase">Scroll to explore</span>
        <ChevronDown className="hero-scroll-arrow animate-bounce" />
      </div>
    </section>
  );
};
