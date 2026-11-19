'use client';

import React from 'react';
import { MapPin, Phone, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/data/shipyonData';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="footer-canvas">
      <div className="footer-card">
        <div className="footer-columns-grid">
          {/* Brand Column */}
          <div className="footer-col footer-col--brand">
            <div className="footer-logo-wrapper">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
                <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-md">
                  <img
                    src={CONTACT_INFO.images.logoIcon}
                    alt="CORE & CULM"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  CORE &amp; CULM<span className="text-emerald-200">™</span>
                </span>
              </div>
            </div>

            <p className="footer-brand-narrative">
              IMPORT AND EXPORTS
              <span>Logistics Support | International and Domestic Supply</span>
            </p>

            <ul className="footer-contact-details">
              <li className="footer-contact-item">
                <MapPin className="footer-contact-icon" />
                <span className="footer-contact-text">{CONTACT_INFO.address.fullText}</span>
              </li>
              <li className="footer-contact-item">
                <Phone className="footer-contact-icon" />
                <a href={`tel:${CONTACT_INFO.phones[0].raw}`} className="footer-contact-text hover:underline">
                  {CONTACT_INFO.phones[0].number}
                </a>
              </li>
              <li className="footer-contact-item">
                <Phone className="footer-contact-icon" />
                <a href={`tel:${CONTACT_INFO.phones[1].raw}`} className="footer-contact-text hover:underline">
                  {CONTACT_INFO.phones[1].number}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col footer-col--links">
            <h3 className="footer-col-header">Quick Links</h3>
            <ul className="footer-link-stack">
              <li>
                <a
                  href="/"
                  className="footer-text-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home');
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="footer-text-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('about');
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="footer-text-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('services');
                  }}
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="footer-text-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('products');
                  }}
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="footer-text-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('contact');
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer-col footer-col--services">
            <h3 className="footer-col-header">Services</h3>
            <ul className="footer-link-stack">
              <li>
                <button className="footer-text-link" onClick={() => onNavigate('products')}>
                  Fresh Fruits Sourcing
                </button>
              </li>
              <li>
                <button className="footer-text-link" onClick={() => onNavigate('products')}>
                  Organic Vegetables Import
                </button>
              </li>
              <li>
                <button className="footer-text-link" onClick={() => onNavigate('products')}>
                  Premium Spices Trade
                </button>
              </li>
              <li>
                <button className="footer-text-link" onClick={() => onNavigate('products')}>
                  Grains &amp; Pulses Distribution
                </button>
              </li>
              <li>
                <button className="footer-text-link" onClick={() => onNavigate('products')}>
                  Bulk Procurement &amp; Logistics
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions Column & Follow Us */}
          <div className="footer-col footer-col--solutions">
            <h3 className="footer-col-header">Solutions</h3>
            <ul className="footer-link-stack">
              <li>
                <button className="footer-text-link" onClick={() => onNavigate('services')}>
                  Sourcing &amp; Supply Chain
                </button>
              </li>
              <li>
                <button className="footer-text-link" onClick={() => onNavigate('services')}>
                  Custom Packaging &amp; Canning
                </button>
              </li>
              <li>
                <button className="footer-text-link" onClick={() => onNavigate('services')}>
                  Global Freight &amp; Customs
                </button>
              </li>
              <li>
                <button className="footer-text-link" onClick={() => onNavigate('services')}>
                  Warehousing &amp; Cold Chain
                </button>
              </li>
            </ul>

            <div className="footer-follow-section">
              <span className="footer-follow-label">Follow Us</span>
              <div className="footer-social-row">
                <a
                  href="#"
                  className="footer-social-icon-node"
                  aria-label="Facebook"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Facebook className="social-svg" />
                </a>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                  className="footer-social-icon-node"
                  aria-label="WhatsApp"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MessageCircle className="social-svg" />
                </a>
                <a
                  href="#"
                  className="footer-social-icon-node"
                  aria-label="Instagram"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Instagram className="social-svg" />
                </a>
                <a
                  href="#"
                  className="footer-social-icon-node"
                  aria-label="LinkedIn"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Linkedin className="social-svg" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="footer-transition-line" />

        {/* CTA Row */}
        <div className="footer-cta-row">
          <h4 className="footer-cta-heading">Get in touch</h4>
          <a
            href="/contact"
            className="footer-cta-btn"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contact');
            }}
          >
            Connect with Our Experts &rarr;
          </a>
        </div>

        <p className="footer-narrative-relocated">
          Connecting global markets with seamless supply chains and premium quality sourcing.
          <br />
          Empowering your trade journey with absolute efficiency.
        </p>

        <hr className="footer-transition-line" />

        {/* Baseline Copyright & Legal Links */}
        <div className="footer-baseline-row">
          <p className="footer-copyright-text">
            &copy; {new Date().getFullYear()} CORE &amp; CULM. All rights reserved. | Premier Trade &amp; Sourcing Co.
          </p>
          <div className="footer-baseline-right">
            <button className="footer-legal-link" onClick={() => onNavigate('about')}>
              Terms of Use
            </button>
            <span className="footer-legal-divider">&bull;</span>
            <button className="footer-legal-link" onClick={() => onNavigate('about')}>
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
