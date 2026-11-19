'use client';

import React from 'react';
import { Eye, Target } from 'lucide-react';

export const VisionMission: React.FC = () => {
  return (
    <section className="vm-section">
      <div className="vm-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="vm-header text-center mb-16">
          <span className="vm-eyebrow">Purpose &amp; Direction</span>
          <h2 className="vm-title">Vision &amp; Mission</h2>
          <p className="vm-subtitle">Two pillars that guide every decision we make</p>
        </div>

        <div className="vm-cards">
          {/* Vision Pane */}
          <div className="vm-pane vm-pane--vision">
            <div className="vm-pane__icon-orb">
              <div className="vm-pane__icon-inner">
                <Eye className="vm-pane__icon w-6 h-6 text-brand-600" />
              </div>
              <div className="vm-pane__icon-shine" />
            </div>
            <div className="vm-pane__body">
              <p className="vm-pane__label">Our Vision</p>
              <p className="vm-pane__text">
                To redefine agricultural and product sourcing in South India by building a seamless bridge between local producers and global markets, positioning Indian products as high-value global brands.
              </p>
              <div className="vm-pane__accent" />
            </div>
          </div>

          {/* Mission Pane */}
          <div className="vm-pane vm-pane--mission">
            <div className="vm-pane__icon-orb">
              <div className="vm-pane__icon-inner">
                <Target className="vm-pane__icon w-6 h-6 text-brand-600" />
              </div>
              <div className="vm-pane__icon-shine" />
            </div>
            <div className="vm-pane__body">
              <p className="vm-pane__label">Our Mission</p>
              <p className="vm-pane__text">
                To efficiently source quality products from India, elevate Indian offerings in domestic and global markets, introduce high-potential international products into India, and build a trusted, scalable supply chain that empowers businesses to grow beyond borders.
              </p>
              <div className="vm-pane__accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
