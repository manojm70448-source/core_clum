'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CONTACT_INFO } from '@/data/shipyonData';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'About', path: 'about' },
    { name: 'Services', path: 'services' },
    { name: 'Products', path: 'products' },
    { name: 'Contact Us', path: 'contact' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="header-container">
      <div className="header-content relative">
        <div className="header-wrapper">
          <div className="header-inner">
            {/* Logo */}
            <div
              className="logo-container"
              onClick={() => onNavigate('home')}
            >
              <img
                src={CONTACT_INFO.images.logoIcon}
                alt="CORE & CULM Logo"
                className="logo-image"
              />
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 ml-2 hidden sm:inline">
                CORE &amp; CULM<span className="text-brand-600">™</span>
              </span>
            </div>

            {/* Desktop Navigation matching Shipyon pill */}
            <nav className="navigation">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`nav-button ${currentPage === item.path ? 'active' : ''}`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-800" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-navigation-dropdown">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`mobile-nav-item ${currentPage === item.path ? 'active' : ''} ${
                  item.path === 'contact' ? 'cta-button' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
