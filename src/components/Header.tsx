'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
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
        <div className="header-wrapper backdrop-blur-xl bg-white/90 border border-slate-200/80 shadow-xl shadow-slate-900/5 hover:border-emerald-500/30 transition-all duration-300">
          <div className="header-inner">
            {/* Logo with micro-zoom and badge */}
            <div
              className="logo-container group flex items-center cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => onNavigate('home')}
            >
              <div className="relative">
                <img
                  src={CONTACT_INFO.images.logoIcon}
                  alt="CORE & CULM Logo"
                  className="logo-image group-hover:rotate-1 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col ml-2.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 leading-tight">
                  CORE &amp; CULM<span className="text-emerald-600">™</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-bold text-amber-600 hidden sm:block">
                  Global Agro Exports
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="navigation">
              <div className="flex items-center gap-1 bg-slate-100/70 p-1 rounded-2xl border border-slate-200/60">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => onNavigate(item.path)}
                    className={`nav-button relative transition-all duration-300 ${
                      currentPage === item.path
                        ? 'active font-bold text-emerald-800'
                        : 'text-slate-600 hover:text-emerald-700'
                    }`}
                  >
                    {currentPage === item.path && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block mr-1.5 animate-pulse" />
                    )}
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Quick Action RFQ Button */}
              <button
                onClick={() => onNavigate('contact')}
                className="hidden lg:inline-flex items-center gap-1.5 ml-3 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 shimmer-sweep transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button p-2 rounded-xl bg-slate-100 border border-slate-200/80 hover:bg-emerald-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-800" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-navigation-dropdown backdrop-blur-2xl bg-white/95 border border-slate-200/90 shadow-2xl rounded-3xl p-5">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`mobile-nav-item flex items-center justify-between py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                  currentPage === item.path
                    ? 'active bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.name}</span>
                {currentPage === item.path && (
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                )}
              </button>
            ))}

            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <span>Request Official Export Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
