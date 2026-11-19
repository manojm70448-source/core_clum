'use client';

import React from 'react';
import { X, Check, MapPin, Package, Thermometer, Clock, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { ProductItem, CONTACT_INFO } from '@/data/shipyonData';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onSelectForQuote: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectForQuote,
}) => {
  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Shipyon Team, I am interested in importing "${product.name}" (Origin: ${product.origin}). Please provide current FOB/CIF rates and container availability.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 shadow-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500 text-slate-950">
                {product.category.toUpperCase()}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                {product.origin}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {product.name}
            </h2>
            <p className="text-sm text-slate-200 mt-1">
              {product.tagline}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Overview &amp; Export Grade
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Standard Export Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.specs.grade && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400">Grade &amp; Quality</div>
                    <div className="text-xs font-bold text-slate-800">{product.specs.grade}</div>
                  </div>
                </div>
              )}

              {product.specs.size && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                  <Package className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400">Calibration / Size</div>
                    <div className="text-xs font-bold text-slate-800">{product.specs.size}</div>
                  </div>
                </div>
              )}

              {product.specs.moisture && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                  <Thermometer className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400">Moisture Control</div>
                    <div className="text-xs font-bold text-slate-800">{product.specs.moisture}</div>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <Package className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[11px] font-semibold text-slate-400">Packaging Format</div>
                  <div className="text-xs font-bold text-slate-800">{product.specs.packaging}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[11px] font-semibold text-slate-400">Min. Order Quantity</div>
                  <div className="text-xs font-bold text-slate-800">{product.specs.minOrder}</div>
                </div>
              </div>

              {product.specs.temperature && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                  <Thermometer className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400">Reefer Transit Temp</div>
                    <div className="text-xs font-bold text-slate-800">{product.specs.temperature}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Key Features Bullets */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Compliance &amp; Quality Points
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onSelectForQuote(product.name);
              }}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/25 transition-all"
            >
              <span>Request Quote for {product.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-sm text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
