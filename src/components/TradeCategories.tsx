'use client';

import React from 'react';
import {
  Leaf,
  Flame,
  Apple,
  Package,
  Factory,
  Users,
  ArrowRight,
} from 'lucide-react';
import { Card3D } from './Card3D';

interface TradeCategoriesProps {
  onNavigate: (page: string) => void;
}

export const TradeCategories: React.FC<TradeCategoriesProps> = ({ onNavigate }) => {
  const categories = [
    {
      id: 1,
      title: 'Fresh Produce',
      description: 'Farm-fresh bulk vegetables, shallots, drumsticks, and root crops from trusted South Indian grower networks.',
      icon: Leaf,
      users: '245+ MT',
      color: '#059669',
      path: 'products',
    },
    {
      id: 2,
      title: 'Spices & Plantation Crops',
      description: 'Premium Guntur chillies, turmeric, Malabar black pepper, and matured coconut products directly from origin.',
      icon: Flame,
      users: '189+ MT',
      color: '#d97706',
      path: 'products',
    },
    {
      id: 3,
      title: 'Export Grade Fruits',
      description: 'Calibrated Cavendish G9 bananas, mangoes, and pomegranates packed under strict cold-chain protocols.',
      icon: Apple,
      users: '312+ MT',
      color: '#ea580c',
      path: 'products',
    },
    {
      id: 4,
      title: 'Processed & Value-Added',
      description: 'Ready-to-trade seedless tamarind slabs, coconut copra, coir pith blocks, and virgin cold-pressed oils.',
      icon: Package,
      users: '156+ MT',
      color: '#0284c7',
      path: 'products',
    },
    {
      id: 5,
      title: 'Industrial & Commercial',
      description: 'Bulk agricultural supplies, contract farming allocations, and commercial container shipments.',
      icon: Factory,
      users: '203+ MT',
      color: '#7c3aed',
      path: 'products',
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            Commodity Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Our Core Trade Categories
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-3 font-normal leading-relaxed">
            Explore our premium selection of agricultural products sourced from the fertile regions of South India.
          </p>
        </div>

        {/* Categories Grid - Balanced Equal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <Card3D key={cat.id} maxTilt={8} perspective={900} className="h-full">
                <div
                  onClick={() => onNavigate(cat.path)}
                  className="cursor-pointer rounded-3xl p-7 sm:p-8 bg-white border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between h-full group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300"
                        style={{
                          backgroundColor: `${cat.color}15`,
                          border: `1px solid ${cat.color}35`,
                          color: cat.color,
                        }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                        <Users className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{cat.users}</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2.5 group-hover:text-emerald-700 transition-colors">
                      {cat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1.5">
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      FOB / CIF
                    </span>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Global Action CTA Button */}
        <div className="flex justify-center mt-14 sm:mt-16">
          <button
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-700/20 hover:scale-105 active:scale-95 transition-all duration-300 shimmer-sweep"
            onClick={() => onNavigate('products')}
          >
            <span>View All Export Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
