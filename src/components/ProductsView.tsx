'use client';

import React from 'react';
import { TradeCategories } from './TradeCategories';
import { TimelineJourney } from './TimelineJourney';

interface ProductsViewProps {
  onNavigate: (page: string) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 pb-12 bg-white">
      <TradeCategories onNavigate={onNavigate} />
      <TimelineJourney />
    </div>
  );
};
