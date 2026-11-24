'use client';

import React, { useState, useEffect } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  LogOut,
  RefreshCw,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Send,
  Trash2,
  ExternalLink,
  Shield,
  Database,
  Mail,
  Phone,
  Building,
  MapPin,
  X,
  FileText
} from 'lucide-react';
import { CONTACT_INFO } from '@/data/shipyonData';

interface InquiryRecord {
  id: string;
  created_at: string;
  commodity: string;
  volume: string;
  incoterm: string;
  destination: string;
  full_name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
  status: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; provider: string }>({
    connected: false,
    provider: 'Checking...',
  });
  const [isDefaultPassword, setIsDefaultPassword] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Check auth on load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const res = await fetch('/api/admin/me');
      const data = await res.json();
      setIsDefaultPassword(!!data.isDefaultPassword);
      if (data.authenticated) {
        setIsAuthenticated(true);
        setDbStatus(data.db || { connected: false, provider: 'Local Storage' });
        fetchInquiries();
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        setPassword('');
        checkAuthStatus();
      } else {
        setLoginError(data.error || 'Invalid administrator password');
      }
    } catch (err) {
      setLoginError('Authentication failed. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setInquiries([]);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const fetchInquiries = async () => {
    setIsLoadingData(true);
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
        if (data.dbStatus) {
          setDbStatus(data.dbStatus);
        }
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        showNotification(`Status updated to "${newStatus}"`);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete inquiry ${id}? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
        showNotification(`Inquiry ${id} deleted successfully.`);
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    }
  };

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      alert('No records available to export.');
      return;
    }

    const headers = [
      'Inquiry ID',
      'Date & Time',
      'Commodity',
      'Volume',
      'Incoterm',
      'Destination Port',
      'Buyer Name',
      'Company Name',
      'Email',
      'Phone',
      'Status',
      'Notes',
    ];

    const rows = inquiries.map((i) => [
      `"${i.id}"`,
      `"${new Date(i.created_at).toLocaleString()}"`,
      `"${i.commodity.replace(/"/g, '""')}"`,
      `"${(i.volume || '').replace(/"/g, '""')}"`,
      `"${i.incoterm || ''}"`,
      `"${(i.destination || '').replace(/"/g, '""')}"`,
      `"${i.full_name.replace(/"/g, '""')}"`,
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${i.phone || ''}"`,
      `"${i.status}"`,
      `"${(i.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `core_and_culm_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === 'New Inquiry').length;
  const underReviewCount = inquiries.filter((i) => i.status === 'Under Review').length;
  const dispatchedCount = inquiries.filter((i) => i.status === 'Quotation Dispatched').length;

  // Initial loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex flex-col justify-center items-center p-4 sm:p-6 text-white relative overflow-hidden">
        {/* Decorative background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#16a34a15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4 shadow-inner">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              CORE &amp; CULM<span className="text-emerald-500">™</span>
            </h1>
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mt-1">
              Admin Control Center
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Confidential Client RFQ &amp; Database Portal
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-800/80 text-red-200 text-xs font-semibold flex items-center gap-2">
              <Lock className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full space-y-5" style={{ width: '100%' }}>
            <div className="w-full" style={{ width: '100%' }}>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Administrator Password
              </label>
              <div className="relative w-full" style={{ width: '100%' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  required
                  autoFocus
                  className="w-full px-4 py-3 bg-slate-950/70 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all pr-12"
                  style={{ width: '100%' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/50 transition-all duration-200 flex flex-row items-center justify-center gap-2.5 disabled:opacity-50 whitespace-nowrap cursor-pointer"
              style={{ width: '100%', minWidth: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold tracking-wide">Access Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-slate-500">
              <Shield className="w-3.5 h-3.5 text-emerald-500/80 flex-shrink-0" />
              <span>Restricted System &bull; Authorized Personnel Only</span>
            </div>
            <div className="mt-4">
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <span>&larr; Back to Public Website</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-white p-1 flex items-center justify-center shadow">
              <img
                src={CONTACT_INFO.images.logoIcon}
                alt="CORE & CULM Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-lg font-black text-white tracking-tight">
              CORE &amp; CULM<span className="text-emerald-500">™</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-700">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Admin Portal
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                dbStatus.connected
                  ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                  : 'bg-amber-950/80 border-amber-700 text-amber-300'
              }`}
              title={dbStatus.provider}
            >
              <Database className="w-3 h-3" />
              <span>{dbStatus.provider}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-red-300 hover:text-red-200 bg-red-950/60 hover:bg-red-900/80 border border-red-800/60 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Action Notice Toast */}
        {actionNotice && (
          <div className="p-3 rounded-xl bg-emerald-900/80 border border-emerald-600 text-emerald-200 text-xs font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{actionNotice}</span>
            </div>
            <button onClick={() => setActionNotice(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Security Warning: Default Password Active */}
        {isDefaultPassword && (
          <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-600/80 text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <strong className="block text-amber-100 font-bold">Security Notice: Default Admin Password Active</strong>
                <span>The dashboard is currently protected using the initial default password. For production security, configure <code className="bg-amber-900/60 px-1.5 py-0.5 rounded text-amber-200 font-mono">ADMIN_PASSWORD</code> in your environment variables.</span>
              </div>
            </div>
          </div>
        )}

        {/* Header & Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Total Inquiries
            </span>
            <div className="text-3xl font-black text-white mt-2">{totalCount}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">All-time received</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                New Leads
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-3xl font-black text-emerald-400 mt-2">{newCount}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Require initial response</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              Under Review
            </span>
            <div className="text-3xl font-black text-amber-400 mt-2">{underReviewCount}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Rate calculation ongoing</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
            <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
              Dispatched Quotes
            </span>
            <div className="text-3xl font-black text-cyan-400 mt-2">{dispatchedCount}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">FOB/CIF quote sent</span>
          </div>
        </div>

        {/* Toolbar: Search, Filters & Export */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-1">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by buyer, company, commodity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Status Filter Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Statuses</option>
              <option value="New Inquiry">New Inquiries</option>
              <option value="Under Review">Under Review</option>
              <option value="Quotation Dispatched">Quotation Dispatched</option>
              <option value="Closed">Closed / Deal Won</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={fetchInquiries}
              disabled={isLoadingData}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md shadow-emerald-950/40 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export to CSV</span>
            </button>
          </div>
        </div>

        {/* Inquiries Data Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4">Date / RFQ ID</th>
                  <th className="py-3.5 px-4">Buyer &amp; Company</th>
                  <th className="py-3.5 px-4">Commodity &amp; Volume</th>
                  <th className="py-3.5 px-4">Destination &amp; Incoterm</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {isLoadingData ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-500" />
                      <span>Loading records from PostgreSQL...</span>
                    </td>
                  </tr>
                ) : filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <FileText className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                      <p className="font-semibold">No inquiries match the current filter.</p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        When buyers submit RFQs on the website, they will appear here securely.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedInquiry(item)}
                    >
                      {/* Date & ID */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-bold text-white font-mono">{item.id}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {new Date(item.created_at).toLocaleDateString()}{' '}
                          <span className="text-slate-500">
                            {new Date(item.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </td>

                      {/* Buyer & Company */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{item.full_name}</span>
                        </div>
                        <div className="text-emerald-400 text-[11px] font-medium flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-emerald-500" />
                          <span>{item.company || 'Individual Buyer'}</span>
                        </div>
                        <div className="text-slate-400 text-[11px] mt-1 flex items-center gap-3">
                          <a
                            href={`mailto:${item.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-emerald-300 inline-flex items-center gap-1"
                            title="Send Email"
                          >
                            <Mail className="w-3 h-3 text-slate-500" />
                            <span>{item.email}</span>
                          </a>
                          {item.phone && item.phone !== 'N/A' && (
                            <a
                              href={`tel:${item.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="hover:text-emerald-300 inline-flex items-center gap-1"
                              title="Call Phone"
                            >
                              <Phone className="w-3 h-3 text-slate-500" />
                              <span>{item.phone}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Commodity & Volume */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-100">{item.commodity}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Volume: <span className="text-slate-200 font-semibold">{item.volume}</span>
                        </div>
                      </td>

                      {/* Destination & Incoterm */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-slate-200">
                          <MapPin className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                          <span>{item.destination}</span>
                        </div>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {item.incoterm}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border focus:outline-none ${
                            item.status === 'New Inquiry'
                              ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                              : item.status === 'Under Review'
                              ? 'bg-amber-950/80 border-amber-600 text-amber-300'
                              : item.status === 'Quotation Dispatched'
                              ? 'bg-cyan-950/80 border-cyan-600 text-cyan-300'
                              : 'bg-slate-800 border-slate-600 text-slate-300'
                          }`}
                        >
                          <option value="New Inquiry">New Inquiry</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Quotation Dispatched">Quotation Dispatched</option>
                          <option value="Closed">Closed / Deal Won</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedInquiry(item)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="View Full Details"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/60 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Full Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {selectedInquiry.id}
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  Quotation Request Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              {/* Buyer info card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">Buyer Full Name</span>
                  <p className="text-sm font-bold text-white mt-0.5">{selectedInquiry.full_name}</p>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">Company Name</span>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">{selectedInquiry.company || 'Individual / Direct'}</p>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">Email Address</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-sm text-cyan-400 hover:underline mt-0.5 block">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">Phone / WhatsApp</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-sm text-cyan-400 hover:underline mt-0.5 block">
                    {selectedInquiry.phone || 'N/A'}
                  </a>
                </div>
              </div>

              {/* Commodity & Shipping Details */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">Requested Commodity</span>
                  <p className="text-sm font-bold text-white mt-0.5">{selectedInquiry.commodity}</p>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">Required Volume</span>
                  <p className="text-sm font-bold text-white mt-0.5">{selectedInquiry.volume}</p>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">Incoterm &amp; Port</span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {selectedInquiry.incoterm} &bull; {selectedInquiry.destination}
                  </p>
                </div>
              </div>

              {/* Special Instructions / Notes */}
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                  Buyer Notes / Calibration &amp; Packing Specifications
                </span>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.notes || 'No special specifications provided by buyer.'}
                </div>
              </div>

              {/* Status Update bar inside modal */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Change Status:</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  >
                    <option value="New Inquiry">New Inquiry</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Quotation Dispatched">Quotation Dispatched</option>
                    <option value="Closed">Closed / Deal Won</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                      `Quotation for ${selectedInquiry.commodity} - CORE & CULM™`
                    )}&body=${encodeURIComponent(
                      `Dear ${selectedInquiry.full_name},\n\nThank you for your RFQ (${selectedInquiry.id}) regarding ${selectedInquiry.commodity}.\n\nBest regards,\nPrabhakaran\nCORE & CULM™`
                    )}`}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Quote via Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
