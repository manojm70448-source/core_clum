'use client';

import React, { useEffect, useRef } from 'react';

const steps = [
  {
    id: 1,
    label: 'Step 01',
    title: 'Farm-Level Sourcing',
    body: 'We partner directly with farmers across South India — from the hills of Nilgiris to the plains of Guntur — ensuring premium quality at every origin point.',
    image: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Farmers harvesting fresh produce',
  },
  {
    id: 2,
    label: 'Step 02',
    title: 'Quality Inspection & Grading',
    body: 'Every batch goes through multi-point quality checks and strict grading standards before it leaves the farm gate — guaranteeing consistency with every shipment.',
    image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Quality inspection of grains',
  },
  {
    id: 3,
    label: 'Step 03',
    title: 'Logistics & Cold Chain',
    body: 'Temperature-controlled storage and logistics ensure that every product — from vegetables to spices — reaches the destination as fresh as the day it was harvested.',
    image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Logistics and freight shipping',
  },
  {
    id: 4,
    label: 'Step 04',
    title: 'Global Export & Delivery',
    body: 'We export to 50+ countries, managing all customs, compliance and documentation so you receive a seamless, on-time delivery every time.',
    image: 'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Cargo ship at port for global export',
  },
];

export const TimelineJourney: React.FC = () => {
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('tl-visible');
          } else {
            entry.target.classList.remove('tl-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    rowsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="tl-section">
      <div className="tl-header">
        <span className="tl-eyebrow">How We Deliver</span>
        <h2 className="tl-title">Our End-to-End Trade Journey</h2>
        <p className="tl-subtitle">
          From farm to freight — a transparent, quality-driven process built for global trade.
        </p>
      </div>

      <div className="tl-rows">
        <div className="tl-spine-container" aria-hidden="true">
          <div className="tl-spine-line" />
        </div>

        {steps.map((step, idx) => (
          <div
            key={step.id}
            ref={(el) => {
              rowsRef.current[idx] = el;
            }}
            className={`tl-row ${idx % 2 === 0 ? 'tl-row--img-left' : 'tl-row--img-right'}`}
          >
            <div className="tl-img-wrap">
              <img
                src={step.image}
                alt={step.imageAlt}
                className="tl-img"
                loading="lazy"
              />
              <div className="tl-img-ring" aria-hidden="true" />
            </div>

            <div className="tl-dot-wrap" aria-hidden="true">
              <div className="tl-dot">
                <span className="tl-dot-inner" />
              </div>
            </div>

            <div className="tl-text-wrap">
              <span className="tl-step-label">{step.label}</span>
              <h3 className="tl-step-title">{step.title}</h3>
              <p className="tl-step-body">{step.body}</p>
              <div className="tl-accent-line" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
