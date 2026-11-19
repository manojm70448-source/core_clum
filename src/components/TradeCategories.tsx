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

interface TradeCategoriesProps {
  onNavigate: (page: string) => void;
}

export const TradeCategories: React.FC<TradeCategoriesProps> = ({ onNavigate }) => {
  const categories = [
    {
      id: 1,
      title: 'Fresh produce',
      description: 'Farm-fresh bulk vegetables from trusted sources.',
      icon: Leaf,
      users: 245,
      color: '#16a34a',
      path: 'products',
    },
    {
      id: 2,
      title: 'Spices & Plantation Crops',
      description: 'Premium spices and plantation products.',
      icon: Flame,
      users: 189,
      color: '#dc2626',
      path: 'products',
    },
    {
      id: 3,
      title: 'Fruits',
      description: 'Quality fruits for domestic and global trade.',
      icon: Apple,
      users: 312,
      color: '#ea580c',
      path: 'products',
    },
    {
      id: 4,
      title: 'Processed & Value-Added',
      description: 'Ready-to-trade processed and specialty products.',
      icon: Package,
      users: 156,
      color: '#0891b2',
      path: 'products',
    },
    {
      id: 5,
      title: 'Industrial & Commercial',
      description: 'Bulk industrial and commercial supply solutions.',
      icon: Factory,
      users: 203,
      color: '#7c3aed',
      path: 'products',
    },
  ];

  return (
    <section className="trade-categories-section">
      {/* Background Floating Vectors */}
      <div className="background-vectors">
        <Plane className="bg-vector vector-1" strokeWidth={0.5} />
        <Package className="bg-vector vector-2" strokeWidth={0.5} />
        <Ship className="bg-vector vector-3" strokeWidth={0.5} />
        <Sprout className="bg-vector vector-4" strokeWidth={0.5} />
        <Tractor className="bg-vector vector-5" strokeWidth={0.5} />
        <Truck className="bg-vector vector-6" strokeWidth={0.5} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <h2 className="section-title">Our Core Trade Categories</h2>
          <p className="section-subtitle">
            Explore our premium selection of agricultural products sourced from the best farms
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="category-card"
                style={{ '--category-color': cat.color } as React.CSSProperties}
                onClick={() => onNavigate(cat.path)}
              >
                <div className="card-header">
                  <div className="category-icon">
                    <Icon className="icon-component" />
                  </div>
                  <div className="user-count">
                    <Users className="users-icon" />
                    <span className="users-number">{cat.users}</span>
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="category-title">{cat.title}</h3>
                  <p className="category-description">{cat.description}</p>
                </div>

                <div className="card-footer">
                  <button
                    className="view-products-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(cat.path);
                    }}
                  >
                    View Products
                    <ArrowRight className="arrow-icon" />
                  </button>
                </div>

                <div className="card-overlay" />
              </div>
            );
          })}
        </div>

        {/* Global Action CTA Button */}
        <div className="global-action-container">
          <button
            className="global-products-btn"
            onClick={() => onNavigate('products')}
          >
            View All Products
            <ArrowRight className="arrow-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};
