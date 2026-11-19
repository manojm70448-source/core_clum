'use client';

import React from 'react';
import { FarmToFreight } from './FarmToFreight';
import { WhyChooseUs } from './WhyChooseUs';
import { GlobalReach } from './GlobalReach';

interface ServicesViewProps {
  onNavigate: (page: string) => void;
  onOpenQuoteModal: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onNavigate,
  onOpenQuoteModal,
}) => {
  return (
    <div className="pt-24 pb-12 bg-white">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
          <span>End-to-End Trade Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Sourcing &amp; Export Services
        </h1>
        <p className="max-w-2xl mx-auto text-base text-slate-600">
          From farm-level grading in Pattukkottai to ocean freight dispatch at Tuticorin, Chennai, and Cochin container terminals.
        </p>
      </div>

      <FarmToFreight />
      <WhyChooseUs />
      <GlobalReach onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};
