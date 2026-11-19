'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle, Ship, ShieldCheck, AlertCircle, Database } from 'lucide-react';
import { PRODUCTS, CONTACT_INFO } from '@/data/shipyonData';
import { InquiryLogItem } from './InquiryLogViewer';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
  onNewLogAdded?: (item: InquiryLogItem) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
  onNewLogAdded,
}) => {
  const [commodity, setCommodity] = useState(initialProduct || PRODUCTS[0].name);
  const [volume, setVolume] = useState('1 x 40ft HC Container (51,250 Coconuts / 26 MT)');
  const [incoterm, setIncoterm] = useState('CIF (Cost, Insurance & Freight)');
  const [destination, setDestination] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastStoredItem, setLastStoredItem] = useState<InquiryLogItem | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setCommodity(initialProduct);
    }
  }, [initialProduct]);

  if (!isOpen) return null;

  const handleWhatsAppDirect = () => {
    const text = `*CORE & CULM™ EXPORT RFQ*
• Exporter: ${CONTACT_INFO.proprietor} (${CONTACT_INFO.designation})
• Commodity: ${commodity}
• Volume: ${volume}
• Incoterm: ${incoterm}
• Destination Port: ${destination || 'To be specified'}
• Company: ${company || 'Direct Buyer'}
• Contact: ${fullName} (${email} / ${phone})
• Notes: ${notes || 'Standard packaging'}`;

    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !destination) {
      setErrorMsg('Please complete all required fields (Name, Email, Destination Port).');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    const newLogItem: InquiryLogItem = {
      id: `RFQ-CC-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      commodity,
      volume,
      incoterm,
      destination,
      fullName,
      company: company || 'Direct Buyer',
      email,
      phone: phone || 'N/A',
      notes: notes || 'Standard export packaging',
      status: 'Saved in Local Store',
    };

    // 1. Save in Browser LocalStorage
    try {
      const existing = localStorage.getItem('core_culm_inquiries') || '[]';
      const arr = JSON.parse(existing);
      arr.unshift(newLogItem);
      localStorage.setItem('core_culm_inquiries', JSON.stringify(arr));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }

    // 2. Transmit to server API to save in local file data/inquiries.json
    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLogItem),
      });
    } catch (err) {
      console.warn('API save failed:', err);
    }

    setLastStoredItem(newLogItem);
    if (onNewLogAdded) {
      onNewLogAdded(newLogItem);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Quotation Stored in Local Log &amp; Transmitted!
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-md">
              Thank you, <strong>{fullName}</strong>. Your export inquiry for <strong>{commodity}</strong> has been logged to the local database under ID <span className="font-mono font-bold text-brand-700">{lastStoredItem?.id}</span>.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-brand-50 border border-brand-200 text-xs text-brand-900 font-semibold max-w-md text-left">
              <div>&bull; Destination: {destination} ({incoterm})</div>
              <div>&bull; Volume: {volume}</div>
              <div>&bull; Exporter Desk: {CONTACT_INFO.proprietor} (+91 89253 62787)</div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <button
                onClick={handleWhatsAppDirect}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Connect</span>
              </button>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Ship className="w-4 h-4" />
                <span>CORE &amp; CULM™ Export Desk &bull; GST: {CONTACT_INFO.gst}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Request Official Export Quotation
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Direct FOB / CIF container pricing backed by Pattukkottai and South Indian harvests. Every inquiry is automatically stored locally.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Commodity & Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Commodity of Interest *
                  </label>
                  <select
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                    <option value="Custom Coconut / Agro Sourcing Contract">
                      Other / Custom Sourcing Contract
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Volume / Container Quantity *
                  </label>
                  <select
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="1 x 40ft HC Container (51,250 Coconuts / 26 MT)">1 x 40ft HC Container (26 MT)</option>
                    <option value="1 x 20ft FCL (14-18 MT)">1 x 20ft FCL (14 - 18 MT)</option>
                    <option value="Multiple 40ft Containers (Annual Contract)">Multiple 40ft Containers (Annual Contract)</option>
                    <option value="Air Freight (500kg - 3 MT Consignment)">Air Cargo (500kg - 3 MT)</option>
                    <option value="Trial Pallet Order / LCL">Trial Pallet Order / LCL</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Incoterm & Destination Port */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Incoterm *
                  </label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="CIF (Cost, Insurance & Freight)">CIF (Cost, Insurance &amp; Freight)</option>
                    <option value="FOB (Free On Board - Tuticorin / Chennai)">FOB (Tuticorin / Chennai Port)</option>
                    <option value="CFR (Cost & Freight)">CFR (Cost &amp; Freight)</option>
                    <option value="EXW (Ex-Works Pattukkottai Warehouse)">EXW (Ex-Works Pattukkottai Warehouse)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Destination Port &amp; Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jebel Ali, UAE / Singapore / Hamburg / London"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Row 3: Buyer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Row 4: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp / Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 / +971 / +65 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Row 5: Notes & Packaging Customization */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Packaging / Grade / Calibration Specifications
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., 25 nuts/bag, Anti-fungal dipping, Leno mesh bag 10kg, Private branding..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-brand-600 hover:bg-brand-700 active:scale-95 shadow-md shadow-brand-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry Request'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>Instant WhatsApp Connect</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                <span>Protected &amp; Confidential &bull; Direct access to Prabhakaran</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
