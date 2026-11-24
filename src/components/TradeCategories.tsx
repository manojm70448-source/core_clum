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
  Plane,
  Ship,
  Sprout,
  Tractor,
  Truck,
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
      description: 'Farm-fresh bulk vegetables from trusted South Indian grower networks.',
      icon: Leaf,
      users: '245+ MT',
      color: '#059669',
      path: 'products',
    },
    {
      id: 2,
      title: 'Spices & Plantation Crops',
      description: 'Premium Guntur chillies, turmeric, pepper, and coconut products.',
      icon: Flame,
      users: '189+ MT',
      color: '#d97706',
      path: 'products',
    },
    {
      id: 3,
      title: 'Export Grade Fruits',
      description: 'Quality seasonal fruits tailored for domestic and ocean container trade.',
      icon: Apple,
      users: '312+ MT',
      color: '#ea580c',
      path: 'products',
    },
    {
      id: 4,
      title: 'Processed & Value-Added',
      description: 'Ready-to-trade coconut copra, coir pith, desiccated coconut and agro goods.',
      icon: Package,
      users: '156+ MT',
      color: '#0284c7',
      path: 'products',
    },
    {
      id: 5,
      title: 'Industrial & Commercial',
      description: 'Bulk industrial agri-supply solutions and container allocations.',
      icon: Factory,
      users: '203+ MT',
      color: '#7c3aed',
      path: 'products',
    },
  ];

  return (
    <section className="trade-categories-section relative overflow-hidden py-16 sm:py-24">
      {/* Background Floating Vectors (Contained so no overflow) */}
      <div className="background-vectors pointer-events-none opacity-40">
        <Plane className="bg-vector vector-1" strokeWidth={0.5} />
        <Package className="bg-vector vector-2" strokeWidth={0.5} />
        <Ship className="bg-vector vector-3" strokeWidth={0.5} />
        <Sprout className="bg-vector vector-4" strokeWidth={0.5} />
        <Tractor className="bg-vector vector-5" strokeWidth={0.5} />
        <Truck className="bg-vector vector-6" strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="section-header text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            Commodity Portfolio
          </span>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Our Core Trade Categories
          </h2>
          <p className="section-subtitle text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-2 font-normal leading-relaxed">
            Explore our premium selection of agricultural products sourced from the fertile regions of South India.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isFirst = idx === 0;

            return (
              <div
                key={cat.id}
                className={isFirst ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <Card3D maxTilt={10} perspective={900} className="h-full">
                  <div
                    onClick={() => onNavigate(cat.path)}
                    className="cursor-pointer rounded-3xl p-6 sm:p-7 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
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

                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                        {cat.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
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
              </div>
            );
          })}
        </div>

        {/* Global Action CTA Button */}
        <div className="global-action-container flex justify-center mt-12">
          <button
            className="global-products-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-700/20 hover:scale-105 active:scale-95 transition-all duration-300 shimmer-sweep"
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
