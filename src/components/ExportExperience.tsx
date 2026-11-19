'use client';

import React, { useEffect, useRef } from 'react';
import { Leaf, Search, Package, Ship, Plane } from 'lucide-react';

const cards = [
  {
    id: 1,
    icon: Leaf,
    title: 'Product Sourcing',
    description:
      'Direct partnerships with trusted farms and manufacturers across South India, ensuring the freshest, highest-quality produce at origin.',
  },
  {
    id: 2,
    icon: Search,
    title: 'Quality & Inspection',
    description:
      'Rigorous multi-point quality control and compliance checks at every stage — from field to freight — to meet global standards.',
  },
  {
    id: 3,
    icon: Package,
    title: 'Packaging & Documentation',
    description:
      'Export-ready packaging with full documentation support — phytosanitary, certificates of origin, and customs clearance handled end-to-end.',
  },
  {
    id: 4,
    icon: Ship,
    secondaryIcon: Plane,
    title: 'Global Shipping',
    description:
      'Sea and air freight coordination to 50+ countries, with real-time tracking and temperature-controlled logistics for perishables.',
  },
];

export const ExportExperience: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('exp-visible');
          }
        });
      },
      { threshold: 0.18 }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    e.currentTarget.style.setProperty('--tilt-x', `${x}deg`);
    e.currentTarget.style.setProperty('--tilt-y', `${y}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--tilt-x', '0deg');
    e.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <section className="exp-section">
      <div className="exp-particle exp-particle--a" />
      <div className="exp-particle exp-particle--b" />
      <div className="exp-particle exp-particle--c" />
      <div className="exp-orb exp-orb--1" />
      <div className="exp-orb exp-orb--2" />

      {/* Floating Background Supply Workspace SVGs */}
      <div className="exp-logistics-workspace" aria-hidden="true">
        <div className="glass-supply-item glass-supply-item--vessel glass-supply-item--foreground exp-bob-a">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 38 H58 L52 48 H12 Z" />
            <rect x="14" y="26" width="10" height="12" />
            <rect x="26" y="22" width="12" height="16" />
            <rect x="40" y="28" width="10" height="10" />
            <path d="M48 38 V32 H54 V38" />
            <path d="M2 50 Q16 46 32 50 T62 50" />
          </svg>
        </div>
        <div className="glass-supply-item glass-supply-item--box glass-supply-item--foreground exp-bob-b">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M32 6 L58 19 L58 45 L32 58 L6 45 L6 19 Z" />
            <path d="M32 6 L32 58" />
            <path d="M32 32 L58 19" />
            <path d="M32 32 L6 19" />
            <path d="M22 14.2 L48 27.2" />
            <path d="M16 17 L42 30" />
          </svg>
        </div>
        <div className="glass-supply-item glass-supply-item--airplane glass-supply-item--background exp-bob-c">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 32 C12 28, 22 26, 32 28 L48 10 H52 L44 28 H56 L58 20 H60 L58 32 L60 44 H58 L56 36 H44 L52 54 H48 L32 36 C22 38, 12 36, 8 32 Z" />
          </svg>
        </div>
        <div className="glass-supply-item glass-supply-item--scanner glass-supply-item--foreground exp-bob-d">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 12 H48 V22 L36 32 V52 H28 V32 L16 22 Z" />
            <path d="M28 36 H24 V42 H28" />
            <path d="M10 8 H54" stroke="#16a34a" strokeWidth="2" />
            <path d="M18 16 V18" />
            <path d="M24 16 V18" />
            <path d="M30 16 V18" />
            <path d="M36 16 V18" />
            <path d="M42 16 V18" />
            <path d="M46 16 V18" />
          </svg>
        </div>
        <div className="glass-supply-item glass-supply-item--tractor glass-supply-item--background exp-bob-e">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 44 C6 36, 30 36, 30 44" strokeDasharray="2 2" />
            <path d="M38 47 C38 41, 54 41, 54 47" strokeDasharray="2 2" strokeWidth="1" />
            <circle cx="18" cy="44" r="11" strokeWidth="1.5" />
            <circle cx="18" cy="44" r="5" stroke="#16a34a" strokeWidth="1" />
            <circle cx="46" cy="47" r="8" strokeWidth="1.5" />
            <circle cx="46" cy="47" r="4" stroke="#16a34a" strokeWidth="1" />
            <path d="M12 32 H26 L22 16 H14 Z" />
            <path d="M15 19 H21 V26 H15 Z" fill="rgba(22, 163, 74, 0.12)" />
            <path d="M26 32 H52 V44 H40 M32 44 V32" />
            <rect x="42" y="35" width="8" height="6" rx="1.5" />
            <path d="M30 32 V14 H32 V32" stroke="#16a34a" strokeWidth="2" />
            <circle cx="52" cy="35" r="2.5" fill="#16a34a" />
          </svg>
        </div>
        <div className="glass-supply-item glass-supply-item--stamp glass-supply-item--foreground exp-bob-f">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 52 H42 V44 C42 34, 38 30, 32 30 C26 30, 22 34, 22 44 Z" />
            <path d="M28 30 V18 C28 14, 30 10, 32 10 C34 10, 36 14, 36 18 V30" />
            <circle cx="32" cy="10" r="4" />
            <rect x="14" y="52" width="36" height="6" rx="1" />
            <path d="M20 40 H44" />
            <path d="M28 40 L30 42 L36 36" stroke="#16a34a" />
          </svg>
        </div>
      </div>

      <div className="exp-inner">
        <div className="exp-header">
          <span className="exp-eyebrow">What We Do Best</span>
          <h2 className="exp-title">Our Expertise</h2>
          <p className="exp-subtitle">
            Four pillars that define how we source, prepare and deliver world-class agricultural products across the globe.
          </p>
        </div>

        <div className="exp-grid">
          {cards.map((item, idx) => {
            const Icon = item.icon;
            const SecondaryIcon = item.secondaryIcon;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className={`exp-card exp-card--${idx + 1}`}
                style={
                  {
                    '--delay': `${idx * 0.13}s`,
                    '--base-y': idx % 2 === 0 ? '0px' : '48px',
                  } as React.CSSProperties
                }
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="exp-sphere" aria-hidden="true">
                  <div className="exp-sphere__inner">
                    {SecondaryIcon ? (
                      <div className="exp-dual-icon">
                        <Icon className="exp-icon" />
                        <SecondaryIcon className="exp-icon exp-icon--sm" />
                      </div>
                    ) : (
                      <Icon className="exp-icon" />
                    )}
                  </div>
                  <div className="exp-sphere__shine" />
                </div>

                <div className="exp-body">
                  <h3 className="exp-card-title">{item.title}</h3>
                  <p className="exp-card-desc">{item.description}</p>
                </div>

                <div className="exp-bar" />
                <div className="exp-glow" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
