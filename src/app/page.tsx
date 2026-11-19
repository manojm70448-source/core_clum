'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TradeCategories } from '@/components/TradeCategories';
import { TimelineJourney } from '@/components/TimelineJourney';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { ExportExperience } from '@/components/ExportExperience';
import { ValuesSection } from '@/components/ValuesSection';
import { AboutView } from '@/components/AboutView';
import { ServicesView } from '@/components/ServicesView';
import { ProductsView } from '@/components/ProductsView';
import { ContactView } from '@/components/ContactView';
import { Footer } from '@/components/Footer';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/data/shipyonData';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative text-slate-900">
      {/* Header Pill Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Pages Switch matching Shipyon.in architecture */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* 1. Exact Hero matching Shipyon.in */}
            <Hero onNavigate={handleNavigate} />

            {/* 2. Core Trade Categories Grid */}
            <TradeCategories onNavigate={handleNavigate} />

            {/* 3. End-to-End Trade Journey Timeline */}
            <TimelineJourney />

            {/* 4. Why Choose Us with Animated Truck & Road */}
            <WhyChooseUs />

            {/* 5. The Export Experience Cards */}
            <ExportExperience />

            {/* 6. Our Values - The Pillars of Our Promise */}
            <ValuesSection />
          </>
        )}

        {currentPage === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentPage === 'services' && (
          <ServicesView
            onNavigate={handleNavigate}
            onOpenQuoteModal={() => handleNavigate('contact')}
          />
        )}

        {currentPage === 'products' && (
          <ProductsView onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* WhatsApp Direct Connect to Prabhakaran */}
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
            'Hello Prabhakaran (CORE & CULM), I would like to inquire about agricultural export commodities.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
          aria-label="Contact Prabhakaran on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-bold transition-all duration-300">
            WhatsApp Desk
          </span>
        </a>
      </div>
    </div>
  );
}
