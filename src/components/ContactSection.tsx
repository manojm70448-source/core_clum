'use client';

import React, { useState } from 'react';
import { CONTACT_INFO } from '@/data/shipyonData';
import { InquiryLogItem } from './InquiryLogViewer';
import { MessageCircle } from 'lucide-react';

interface ContactSectionProps {
  onOpenLogViewer?: () => void;
  onNewLogAdded?: (item: InquiryLogItem) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenLogViewer,
  onNewLogAdded,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const newLogItem: InquiryLogItem = {
      id: `ENQ-CC-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      commodity: 'Direct Website Inquiry',
      volume: 'General Trade Query',
      incoterm: 'FOB / CIF Quotation Requested',
      destination: 'Pattukkottai Export Desk',
      fullName: formData.name,
      company: formData.company || 'Direct Buyer',
      email: formData.email,
      phone: formData.phone,
      notes: formData.message,
      status: 'Stored in Local Store',
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

    if (onNewLogAdded) {
      onNewLogAdded(newLogItem);
    }

    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    });
  };

  return (
    <section className="ready-to-ship-section" id="contact">
      {/* Ready to Ship & Enquiry Form Container */}
      <div className="ready-to-ship-container">
        {/* Left Side: Brand & Call to Action Visual Card */}
        <div
          className="ready-to-ship-content relative overflow-hidden"
          style={{ backgroundImage: 'url("/images/ready-to-ship-bg.jpg")' }}
        >
          {/* Subtle gradient vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/60 to-emerald-950/40 z-0" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 sm:p-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-5 backdrop-blur-md">
              🚢 Maritime &amp; Air Logistics
            </span>

            <h2 className="ready-to-ship-title text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 drop-shadow-md">
              Ready to Source or Ship Products?
            </h2>

            <p className="ready-to-ship-subtitle text-slate-200 text-sm sm:text-base max-w-md mx-auto mb-8 font-normal leading-relaxed drop-shadow-sm">
              Submit your inquiry or order — we&apos;ll coordinate farm grading, container stuffing &amp; maritime shipping.
            </p>

            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
                'Hello Prabhakaran (CORE & CULM), I would like to source export products.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-emerald-50 text-slate-950 hover:text-emerald-950 font-black text-sm uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 shimmer-sweep border-2 border-white"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-slate-950 font-black">CONTACT CORE &amp; CULM</span>
            </a>
          </div>
        </div>

        {/* Right Side: Exact Get in Touch Form */}
        <div className="ready-to-ship-form">
          <h3 className="form-section-title">Get in Touch</h3>

          <form onSubmit={handleSubmit} className="get-in-touch-form" noValidate>
            {/* Name */}
            <div className="simple-form-group">
              <label htmlFor="form-name">Name</label>
              <input
                id="form-name"
                type="text"
                name="name"
                placeholder="Enter your Name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error-input' : ''}
              />
              {errors.name && (
                <span className="error-message-text">{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="simple-form-group">
              <label htmlFor="form-email">Email</label>
              <input
                id="form-email"
                type="text"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error-input' : ''}
              />
              {errors.email && (
                <span className="error-message-text">{errors.email}</span>
              )}
            </div>

            {/* Phone Number */}
            <div className="simple-form-group">
              <label htmlFor="form-phone">Phone Number</label>
              <input
                id="form-phone"
                type="text"
                name="phone"
                placeholder="Enter your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error-input' : ''}
              />
              {errors.phone && (
                <span className="error-message-text">{errors.phone}</span>
              )}
            </div>

            {/* Company / Organization Name */}
            <div className="simple-form-group">
              <label htmlFor="form-company">Company / Organization Name</label>
              <input
                id="form-company"
                type="text"
                name="company"
                placeholder="Enter your Company / Organization Name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            {/* Message */}
            <div className="simple-form-group">
              <label htmlFor="form-message">Message</label>
              <textarea
                id="form-message"
                name="message"
                placeholder="Enter your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error-input' : ''}
              />
              {errors.message && (
                <span className="error-message-text">{errors.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-form-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </div>

      {/* Exact Animated Success Modal matching Shipyon.in */}
      {showSuccessModal && (
        <div className="success-modal-backdrop-overlay">
          <div className="success-modal-card-window">
            <div className="success-checkmark-wrapper">
              <svg viewBox="0 0 52 52" className="checkmark-svg">
                <circle
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                  className="checkmark-circle-stroke"
                />
                <path
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  className="checkmark-check-path"
                />
              </svg>
            </div>
            <h4 className="modal-success-headline">Message sent!</h4>
            <p className="modal-success-subtext">
              Thank you for contacting us. Your message has been sent directly to our export desk.
            </p>

            <div className="flex flex-col gap-2">
              <button onClick={handleContinue} className="close-success-modal-btn">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dock Terminal Cards Canvas (3 Terminals matching Shipyon.in with Core & Culm Credentials) */}
      <div className="contact-bottom-section">
        <div className="node-terminal-canvas">
          {/* Laser Rail */}
          <div className="laser-connection-rail">
            <div className="laser-neon-pulse" />
          </div>

          {/* Dock 1: About Core & Culm */}
          <div className="dock-terminal-item">
            <div className="node-terminal-hub">
              <div className="glass-ring glass-ring--1" />
              <div className="glass-ring glass-ring--2" />
              <div className="glass-ring glass-ring--3" />
              <div className="node-center-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" className="node-neon-svg">
                  <path
                    d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div className="node-text-block">
              <h3>ABOUT CORE &amp; CULM</h3>
              <p>Global Sourcing Network</p>
              <p>Supply Chain Solutions</p>
            </div>
          </div>

          {/* Dock 2: Phone & WhatsApp */}
          <div className="dock-terminal-item">
            <div className="node-terminal-hub">
              <div className="glass-ring glass-ring--1" />
              <div className="glass-ring glass-ring--2" />
              <div className="glass-ring glass-ring--3" />
              <div className="node-center-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" className="node-neon-svg">
                  <path
                    d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div className="node-text-block">
              <h3>PHONE &amp; WHATSAPP</h3>
              <p>+91 89253 62787</p>
              <p>+91 78711 08232</p>
            </div>
          </div>

          {/* Dock 3: Office Location & GST */}
          <div className="dock-terminal-item">
            <div className="node-terminal-hub">
              <div className="glass-ring glass-ring--1" />
              <div className="glass-ring glass-ring--2" />
              <div className="glass-ring glass-ring--3" />
              <div className="node-center-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" className="node-neon-svg">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div className="node-text-block">
              <h3>OUR OFFICE LOCATION</h3>
              <p>100/19, Kandiyan Street</p>
              <p>Pattukkottai, Tamil Nadu, India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
