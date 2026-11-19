'use client';

import React from 'react';
import { Globe, Users, ShieldCheck, ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
  headerSlot?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, headerSlot }) => {
  return (
    <section className="hero-section relative overflow-hidden">
      {headerSlot}

      {/* Hero Background Banner */}
      <div
        className="hero-image-bg absolute inset-0"
        style={{ backgroundImage: 'url("/assets/hero-banner.jpg")' }}
      />

      {/* Overlays */}
      <div className="hero-overlay" />
      <div className="hero-pattern" aria-hidden="true" />

      {/* Main Split Grid */}
      <div className="hero-split-container">
        {/* Left Column */}
        <div className="hero-left">
          {/* Eyebrow Badge */}
          <div className="hero-eyebrow">
            🌿 Trusted by 1000+ Partners Worldwide
          </div>

          {/* Main Title */}
          <h1 className="hero-main-title">
            South India&apos;s Premier Trade &amp; Sourcing Company
            <span className="hero-highlight-text">Export Solutions</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-main-subtitle">
            Seamless sourcing, trade &amp; market expansion — from South India to the world.
          </p>

          {/* Call to Actions */}
          <div className="hero-cta-group">
            <button
              id="hero-explore-btn"
              onClick={() => onNavigate('products')}
              className="hero-btn hero-btn-primary"
            >
              <span>Explore Products</span>
              <ArrowRight className="hero-btn-icon" />
            </button>

            <button
              id="hero-contact-btn"
              onClick={() => onNavigate('contact')}
              className="hero-btn hero-btn-secondary"
            >
              Contact Us
            </button>
          </div>

          {/* Bottom Stats Strip */}
          <div className="hero-stats-strip">
            <div className="hero-stat-item">
              <span className="hero-stat-value">50+</span>
              <span className="hero-stat-label">Countries Served</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">1000+</span>
              <span className="hero-stat-label">Partners Worldwide</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">99.8%</span>
              <span className="hero-stat-label">On-time Delivery</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">24/7</span>
              <span className="hero-stat-label">Support</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Floating Glass Cards */}
        <div className="hero-right">
          <div className="hero-stats-dock">
            {/* Card 1 */}
            <div className="hero-stats-card hero-stats-card--left">
              <div className="hero-stats-card-inner">
                <div className="hero-stats-icon-box">
                  <Globe className="hero-stats-icon" />
                </div>
                <div className="hero-stats-info">
                  <span className="hero-stats-number">50+</span>
                  <span className="hero-stats-label">Countries Served</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="hero-stats-card hero-stats-card--right">
              <div className="hero-stats-card-inner">
                <div className="hero-stats-icon-box">
                  <Users className="hero-stats-icon" />
                </div>
                <div className="hero-stats-info">
                  <span className="hero-stats-number">1000+</span>
                  <span className="hero-stats-label">Global Partners</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="hero-stats-card hero-stats-card--left">
              <div className="hero-stats-card-inner">
                <div className="hero-stats-icon-box">
                  <ShieldCheck className="hero-stats-icon" />
                </div>
                <div className="hero-stats-info">
                  <span className="hero-stats-number">99.8%</span>
                  <span className="hero-stats-label">On-Time Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <span className="hero-scroll-text">Scroll to explore</span>
        <ChevronDown className="hero-scroll-arrow" />
      </div>
    </section>
  );
};
