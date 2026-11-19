'use client';

import React from 'react';
import { CONTACT_INFO } from '@/data/shipyonData';
import {
  Compass,
  Target,
  ShieldCheck,
  Award,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Globe2,
  Anchor,
  MessageCircle,
  ArrowRight,
  Sprout,
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (page: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-24 bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-50 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-200/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-sm text-emerald-800 text-xs font-bold uppercase tracking-wider mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span>About CORE &amp; CULM™ &bull; Pattukkottai Global Desk</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
            Nature&apos;s Strength.{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
              Global Reach.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Rooted in the agricultural heartland of{' '}
            <strong className="text-slate-900 font-semibold">Pattukkottai, Tamil Nadu</strong>, CORE &amp; CULM was founded to bridge heritage growers directly to international container vessels across 50+ destination ports worldwide.
          </p>
        </div>
      </div>

      {/* Official Business Presentation Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative group">
          {/* Ambient light glow behind the card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/25 via-teal-500/20 to-amber-500/25 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition duration-1000 -z-10" />

          {/* Presentation Card */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-white p-2 sm:p-4 transition-all duration-300">
            <div className="relative rounded-2xl overflow-hidden bg-white">
              <img
                src={CONTACT_INFO.images.brandBanner}
                alt="CORE & CULM Brand Presentation"
                className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500"
              />
            </div>

            {/* Quality Commitment Ribbon */}
            <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 px-2 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700 py-1">
                <Sprout className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Direct Farm Sourcing</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700 py-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Export Grade</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700 py-1">
                <Anchor className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Ocean Freight Ready</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700 py-1">
                <Globe2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Worldwide Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Panes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-lg hover:shadow-xl hover:border-emerald-300/80 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 flex items-center justify-center mb-6 shadow-sm border border-emerald-200/60 group-hover:scale-105 transition-transform">
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Our Vision
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1 mb-4">
                Redefining Agricultural Exports from South India
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                To establish South Indian agricultural commodities—especially Pattukkottai matured coconuts, shallots, spices, and coir—as world-class export benchmarks through unyielding quality assurance, cold-chain integrity, and direct farm partnerships.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Farm-to-Freight Traceability</span>
            </div>
          </div>

          {/* Mission */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#011C15] text-white shadow-2xl border border-emerald-800/40 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle inner radial glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Our Mission
              </span>
              <h3 className="text-2xl font-black text-white mt-1 mb-4">
                Seamless Global Supply Chains for Every Harvest
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                To eliminate intermediary delays, enforce cold-chain integrity from farm packing houses to maritime container terminals, and provide transparent FOB / CIF agreements to global food processors and distributors.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-semibold text-emerald-300 relative z-10">
              <Award className="w-4 h-4 text-amber-400" />
              <span>APEDA, FSSAI, Spices Board &amp; DGFT Compliance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Profile: Prabhakaran */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl transition-all duration-300">
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-white">
            <img
              src={CONTACT_INFO.images.businessCard}
              alt="Prabhakaran Business Card"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 mb-1">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Leadership &amp; Founder</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-1">
              {CONTACT_INFO.proprietor}
            </h2>
            <span className="text-sm font-semibold text-emerald-700 mb-4">
              {CONTACT_INFO.designation} &bull; CORE &amp; CULM™
            </span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
              Leading the company with deep agricultural roots in Pattukkottai and Thanjavur. Overseeing direct sourcing from grower cooperatives, strict phytosanitary audits, container stuffing, and maritime coordination.
            </p>

            <div className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Registered Office:</strong> {CONTACT_INFO.address.fullText}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Certifications:</strong> APEDA &bull; FSSAI &bull; Spices Board &bull; DGFT</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Direct Lines:</strong> {CONTACT_INFO.phones[0].number} / {CONTACT_INFO.phones[1].number}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Email:</strong> {CONTACT_INFO.emails[0]}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
              >
                <span>Connect with Prabhakaran</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
                  'Hello Prabhakaran (CORE & CULM), I would like to inquire about agricultural export commodities.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 shadow-sm transition-all flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
