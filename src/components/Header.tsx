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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div
          className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-[1.02] flex-shrink-0"
          onClick={() => onNavigate('home')}
        >
          <div className="relative flex items-center">
            <img
              src={CONTACT_INFO.images.logoIcon}
              alt="CORE & CULM Logo"
              className="w-auto h-9 sm:h-11 object-contain block"
            />
          </div>
          <div className="flex flex-col ml-3">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                CORE &amp; CULM
              </span>
              <span className="text-[10px] font-bold text-emerald-600 border border-emerald-300 bg-emerald-50 px-1.5 py-0.2 rounded">
                TM
              </span>
            </div>
            <span className="text-[10px] tracking-widest uppercase font-bold text-amber-600 mt-0.5">
              Global Agro Exports
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/70 shadow-inner">
          {navItems.map((item) => {
            const isActive = currentPage === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`relative px-4 py-2 rounded-full text-xs lg:text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20'
                    : 'text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
              'Hello Prabhakaran (CORE & CULM), I would like to inquire about agricultural export commodities.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 shadow-sm transition-all hover:scale-105 active:scale-95"
            title="WhatsApp Export Desk"
            aria-label="WhatsApp Export Desk"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
          </a>

          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 shimmer-sweep transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile: Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
              'Hello Prabhakaran (CORE & CULM), I would like to inquire about agricultural export commodities.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
          </a>

          <button
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 transition-colors"
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
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-2xl px-4 py-5 shadow-2xl animate-fadeIn">
          <div className="space-y-1.5 mb-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-extrabold border border-emerald-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20"
            >
              <span>Request Official Export Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
