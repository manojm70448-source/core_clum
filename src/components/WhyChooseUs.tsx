'use client';

import React, { useState } from 'react';
import { Globe, MapPin, Box, Sprout } from 'lucide-react';

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
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="wcu-section">
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

      <div className="wcu-container">
        <div className="wcu-header">
          <h2 className="wcu-title">Why Choose Us</h2>
          <p className="wcu-subtitle">
            We are your trusted partner for agricultural trade with comprehensive solutions
          </p>
        </div>

        <div className="wcu-strip">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;

            return (
              <div
                key={item.id}
                className={`wcu-item ${isActive ? 'wcu-item--active' : ''}`}
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                <div className="wcu-icon-wrap">
                  <Icon className="wcu-icon" />
                </div>
                <div className="wcu-stat">{item.stat}</div>
                <h3 className="wcu-item-title">{item.title}</h3>
                <div className="wcu-underline" />
                {isActive && <p className="wcu-desc">{item.description}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
