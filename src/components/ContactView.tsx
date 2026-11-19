'use client';

import React from 'react';
import { ContactSection } from './ContactSection';
import { InquiryLogItem } from './InquiryLogViewer';

interface ContactViewProps {
  onOpenLogViewer?: () => void;
  onNewLogAdded?: (item: InquiryLogItem) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onOpenLogViewer,
  onNewLogAdded,
}) => {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-50">
      {/* Contact Page Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-brand-600" />
          <span>Get in Touch with CORE &amp; CULM™</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3">
          Contact Our <span className="text-brand-600">Export Desk</span>
        </h1>
        <p className="max-w-2xl mx-auto text-base text-slate-600">
          For commodity sourcing inquiries, container allocations, or partnership opportunities — we are here to help.
        </p>
      </div>

      <ContactSection
        onOpenLogViewer={onOpenLogViewer}
        onNewLogAdded={onNewLogAdded}
      />
    </div>
  );
};
