'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto relative">
        <div className="backdrop-blur-xl bg-white/95 border border-slate-200/80 shadow-lg shadow-slate-900/5 rounded-2xl sm:rounded-3xl px-3.5 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between transition-all duration-300 hover:border-emerald-500/30">
          
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-[1.02] flex-shrink-0"
            onClick={() => onNavigate('home')}
          >
            <div className="relative">
              <img
                src={CONTACT_INFO.images.logoIcon}
                alt="CORE & CULM Logo"
                className="w-auto h-8 sm:h-10 block"
              />
            </div>
            <div className="flex flex-col ml-2 sm:ml-2.5">
              <span className="font-black text-base sm:text-xl tracking-tight text-slate-900 leading-tight whitespace-nowrap">
                CORE &amp; CULM<span className="text-emerald-600">™</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-amber-600">
                Global Agro Exports
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  currentPage === item.path
                    ? 'bg-white text-emerald-800 font-bold shadow-sm'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-white/50'
                }`}
              >
                {currentPage === item.path && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block mr-1.5 animate-pulse" />
                )}
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Action Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 shimmer-sweep transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 rounded-xl bg-slate-100/90 border border-slate-200 hover:bg-emerald-50 text-slate-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-800" />
            ) : (
              <Menu className="w-5 h-5 text-slate-800" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[calc(100%+8px)] left-0 right-0 z-50 backdrop-blur-2xl bg-white/98 border border-slate-200/90 shadow-2xl rounded-3xl p-4 animate-fadeIn">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    currentPage === item.path
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.name}</span>
                  {currentPage === item.path && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <span>Request Official Export Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
                  'Hello Prabhakaran (CORE & CULM), I would like to inquire about agricultural export commodities.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-200 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Export Desk</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
