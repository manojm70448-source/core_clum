import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://coreandculm.com'),
  title: "CORE & CULM™ – Nature's Strength. Global Reach.",
  description:
    'CORE & CULM connects trusted South Indian producers to global markets. Export-grade semi-husked coconuts, shallots, world-class spices, fresh drumsticks, and coir products. Proprietor & Exporter: Prabhakaran. Pattukkottai, Tamil Nadu.',
  keywords: [
    'CORE & CULM',
    'Core and Culm',
    'Prabhakaran exporter',
    'Pattukkottai coconuts export',
    'semi husked coconuts export India',
    'shallots export Tamil Nadu',
    'spices export South India',
    'farm to freight',
    'certified agricultural exporter India',
  ],
  authors: [{ name: 'Prabhakaran (Core & Culm)' }],
  openGraph: {
    title: "CORE & CULM™ – Nature's Strength. Global Reach.",
    description:
      'From Nature to the World. Certified South Indian agricultural trade and global exports by Prabhakaran. Pattukkottai, Tamil Nadu.',
    url: 'https://coreandculm.com/',
    siteName: 'CORE & CULM',
    images: [
      {
        url: '/images/brand_banner.png',
        width: 1200,
        height: 630,
        alt: 'CORE & CULM Global Exports',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/assets/logo_icon.png" type="image/png" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
