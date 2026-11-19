'use client';

import React from 'react';
import { CheckCircle, Sprout, Award, Globe } from 'lucide-react';

const values = [
  {
    id: 1,
    icon: CheckCircle,
    title: 'Quality Assured',
    desc: 'Certified organic produce from trusted farms',
  },
  {
    id: 2,
    icon: Sprout,
    title: 'Farm Direct',
    desc: 'Direct sourcing ensures freshness',
  },
  {
    id: 3,
    icon: Award,
    title: 'Fast Logistics',
    desc: 'Temperature-controlled shipping',
  },
  {
    id: 4,
    icon: Globe,
    title: 'Global Delivery',
    desc: 'Export to 50+ countries worldwide',
  },
];

export const ValuesSection: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    e.currentTarget.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) translateY(var(--base-y,0px)) scale(1.04)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <section className="vh-section">
      <div className="vh-orb vh-orb--1" />
      <div className="vh-orb vh-orb--2" />

      <div className="vh-inner">
        <div className="vh-header">
          <span className="vh-badge">Our Values</span>
          <h2 className="vh-title">The Pillars of Our Promise</h2>
          <p className="vh-subtitle">
            Four commitments that define every product we source and every partnership we build.
          </p>
        </div>

        <div className="vh-cloud">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={val.id}
                className={`vh-card vh-card--${idx + 1}`}
                style={{ '--vi': idx } as React.CSSProperties}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="vh-card__icon-wrap">
                  <div className="vh-card__icon-inner">
                    <Icon className="vh-card__icon" />
                  </div>
                  <div className="vh-card__icon-shine" />
                </div>
                <h3 className="vh-card__title">{val.title}</h3>
                <p className="vh-card__desc">{val.desc}</p>
                <div className="vh-card__bar" />
                <div className="vh-card__glow" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
