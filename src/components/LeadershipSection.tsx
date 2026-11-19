'use client';

import React from 'react';
import { CONTACT_INFO } from '@/data/shipyonData';

export const LeadershipSection: React.FC = () => {
  const leaders = [
    {
      name: CONTACT_INFO.proprietor,
      role: CONTACT_INFO.designation,
      image: CONTACT_INFO.images.logoIcon,
      description:
        'Leading CORE & CULM with deep agricultural roots in Pattukkottai and Thanjavur. Overseeing direct sourcing from grower cooperatives, strict phytosanitary audits, container stuffing, and maritime trade across 50+ countries.',
    },
    {
      name: 'Trade & Compliance Desk',
      role: 'Export Regulatory & Logistics',
      image: CONTACT_INFO.images.logoIcon,
      description:
        `Ensures all operations meet statutory standards (GSTIN: ${CONTACT_INFO.gst}, APEDA, FSSAI, Spices Board), managing maritime freight and cold-chain integrity from South Indian container ports.`,
    },
  ];

  return (
    <section className="lt-section">
      <div className="lt-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lt-header text-center mb-16">
          <span className="lt-eyebrow">The People Behind It</span>
          <h2 className="lt-title">Our Leadership Team</h2>
          <p className="lt-subtitle">Driving Trust, Quality &amp; Growth</p>
        </div>

        <div className="lt-cluster grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {leaders.map((leader, i) => (
            <div key={leader.name} className={`lt-capsule lt-capsule--${i + 1}`}>
              <div className="lt-orbit lt-orbit--1" />
              <div className="lt-orbit lt-orbit--2" />

              <div className="lt-avatar">
                <div className="lt-avatar__frame bg-white p-2">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="lt-avatar__img object-contain"
                  />
                </div>
                <div className="lt-avatar__shine" />
                <div className="lt-avatar__ring" />
              </div>

              <div className="lt-identity">
                <h3 className="lt-name">{leader.name}</h3>
                <span className="lt-role">{leader.role}</span>
              </div>

              <div className="lt-bio">
                <p className="lt-bio__text">{leader.description}</p>
                <div className="lt-bio__bar" />
              </div>

              <div className="lt-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
