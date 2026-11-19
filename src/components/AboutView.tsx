'use client';

import React from 'react';
import { CONTACT_INFO } from '@/data/shipyonData';
import { Compass, Target, ShieldCheck, Award, MapPin } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (page: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-20 bg-[#F8F5F0]">
      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-600" />
            <span>About CORE &amp; CULM™</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Nature&apos;s Strength. <span className="text-brand-600">Global Reach.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Rooted in the agricultural heartland of <strong>Pattukkottai, Tamil Nadu</strong>, CORE &amp; CULM was founded to bridge local farmers directly to international container vessels.
          </p>
        </div>
      </div>

      {/* Official Business Presentation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
          <img
            src={CONTACT_INFO.images.brandBanner}
            alt="CORE & CULM Brand Presentation"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Vision & Mission Panes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-6">
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                Our Vision
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1 mb-4">
                Redefining Agricultural Exports from South India
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To establish South Indian agricultural commodities—especially Pattukkottai matured coconuts, shallots, spices, and coir—as world-class export benchmarks through unyielding quality assurance and direct farm partnerships.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>100% Farm-to-Freight Traceability</span>
            </div>
          </div>

          {/* Mission */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-500 text-slate-950 flex items-center justify-center mb-6 font-bold">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
                Our Mission
              </span>
              <h3 className="text-2xl font-black text-white mt-1 mb-4">
                Seamless Global Supply Chains for Every Harvest
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                To eliminate intermediary delays, enforce cold-chain integrity from farm packing houses to maritime container terminals, and provide transparent FOB / CIF agreements to global food processors and distributors.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-semibold text-brand-300">
              <Award className="w-4 h-4 text-brand-400" />
              <span>APEDA, FSSAI &amp; Spices Board Compliance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Profile: Prabhakaran */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-md border border-slate-100">
            <img
              src={CONTACT_INFO.images.businessCard}
              alt="Prabhakaran Business Card"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-1">
              Leadership &amp; Founder
            </span>
            <h2 className="text-3xl font-black text-slate-900 mb-1">
              {CONTACT_INFO.proprietor}
            </h2>
            <span className="text-sm font-semibold text-brand-700 mb-4">
              {CONTACT_INFO.designation} &bull; CORE &amp; CULM™
            </span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Leading the company with deep agricultural roots in Pattukkottai and Thanjavur. Overseeing direct sourcing from grower cooperatives, strict phytosanitary audits, container stuffing, and maritime coordination.
            </p>

            <div className="space-y-2 text-xs text-slate-700 pt-4 border-t border-slate-100">
              <div><strong>Registered Office:</strong> {CONTACT_INFO.address.fullText}</div>
              <div><strong>GSTIN:</strong> <span className="font-mono font-bold text-brand-700">{CONTACT_INFO.gst}</span></div>
              <div><strong>Phones:</strong> {CONTACT_INFO.phones[0].number} / {CONTACT_INFO.phones[1].number}</div>
              <div><strong>Email:</strong> {CONTACT_INFO.emails[0]}</div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-brand-600 hover:bg-brand-700 text-white shadow-md transition-all"
              >
                Get in Touch with Prabhakaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
