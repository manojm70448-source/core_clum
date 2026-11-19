'use client';

import React, { useState, useEffect } from 'react';
import { X, Database, Clock, Download, RefreshCw, Trash2, CheckCircle2, User, Phone, Mail, MapPin, Package } from 'lucide-react';

export interface InquiryLogItem {
  id: string;
  timestamp: string;
  commodity: string;
  volume: string;
  incoterm: string;
  destination: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  notes?: string;
  status?: string;
}

interface InquiryLogViewerProps {
  isOpen: boolean;
  onClose: () => void;
  newlyAddedItem?: InquiryLogItem | null;
}

export const InquiryLogViewer: React.FC<InquiryLogViewerProps> = ({
  isOpen,
  onClose,
  newlyAddedItem,
}) => {
  const [logs, setLogs] = useState<InquiryLogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      // 1. Fetch from server local JSON file
      const res = await fetch('/api/quote');
      if (res.ok) {
        const data = await res.json();
        const serverLogs: InquiryLogItem[] = data.inquiries || [];

        // 2. Also check browser localStorage
        const localRaw = localStorage.getItem('core_culm_inquiries');
        const localItems: InquiryLogItem[] = localRaw ? JSON.parse(localRaw) : [];

        // Merge without duplicate IDs
        const map = new Map<string, InquiryLogItem>();
        [...localItems, ...serverLogs].forEach((item) => {
          if (!map.has(item.id)) {
            map.set(item.id, item);
          }
        });

        const merged = Array.from(map.values()).sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setLogs(merged);
      }
    } catch (e) {
      console.error('Failed to load inquiry logs:', e);
      // Fallback to localStorage only
      const localRaw = localStorage.getItem('core_culm_inquiries');
      if (localRaw) {
        setLogs(JSON.parse(localRaw));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen, newlyAddedItem]);

  if (!isOpen) return null;

  const filteredLogs = logs.filter(
    (item) =>
      item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `core_culm_inquiries_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearLocalStorage = () => {
    if (confirm('Clear local browser storage logs?')) {
      localStorage.removeItem('core_culm_inquiries');
      fetchLogs();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500 text-slate-950 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  Local Stored RFQ &amp; Inquiries
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-brand-500 text-slate-950">
                  {logs.length} Stored
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Persistent local database &amp; browser storage log viewer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLogs}
              title="Refresh logs"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleExportJSON}
              title="Download JSON Export"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors hidden sm:flex items-center gap-1 text-xs"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <input
            type="text"
            placeholder="Search by commodity, buyer name, port, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-md text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          />

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs text-slate-500">
            <span>Showing {filteredLogs.length} of {logs.length} inquiries</span>
            <button
              onClick={handleClearLocalStorage}
              className="ml-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Clear browser cache"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredLogs.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <Database className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">No inquiries match your query.</p>
              <p className="text-xs">Submit a quote request using the form to see it stored here.</p>
            </div>
          ) : (
            filteredLogs.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 shadow-sm transition-all flex flex-col gap-3"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      {item.id}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {item.commodity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(item.timestamp).toLocaleString()}</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                      {item.status || 'Stored Locally'}
                    </span>
                  </div>
                </div>

                {/* Grid Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block">Volume &amp; Incoterm</span>
                      <span className="font-semibold text-slate-800">
                        {item.volume} • {item.incoterm}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block">Destination Port</span>
                      <span className="font-semibold text-slate-800">
                        {item.destination}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block">Buyer / Company</span>
                      <span className="font-semibold text-slate-800">
                        {item.fullName} {item.company ? `(${item.company})` : ''}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    <a href={`mailto:${item.email}`} className="font-semibold text-brand-700 hover:underline">
                      {item.email}
                    </a>
                  </div>

                  {item.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-brand-600 flex-shrink-0" />
                      <a href={`tel:${item.phone}`} className="font-semibold text-slate-800">
                        {item.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Notes */}
                {item.notes && (
                  <div className="mt-1 p-2.5 rounded-xl bg-slate-50 text-xs text-slate-600 border border-slate-100">
                    <span className="font-bold text-slate-700">Specification Notes: </span>
                    {item.notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-brand-600" />
            <span>Synced to local database file (<code>data/inquiries.json</code>)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
