'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validations';
import Link from 'next/link';

// ─── Form Field Components ────────────────────────────────────────────────────

function FormField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-zinc-700">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1">
          <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-zinc-900 text-sm placeholder:text-zinc-400 outline-none transition-all ${
    hasError
      ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200'
      : 'border-zinc-200 bg-white focus:border-[#1E90FF] focus:ring-2 focus:ring-blue-100'
  }`;

// ─── Contact Form Component ───────────────────────────────────────────────────

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus('loading');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'contact' }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        setServerMessage(json.message);
        reset();
      } else {
        setStatus('error');
        setServerMessage(json.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setServerMessage('Network error. Please check your connection and try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Full Name *" id="contact-name" error={errors.name?.message}>
          <input
            id="contact-name"
            type="text"
            placeholder="e.g. Ahmed Rahman"
            className={inputClass(!!errors.name)}
            {...register('name')}
          />
        </FormField>
        <FormField label="Company" id="contact-company" error={errors.company?.message}>
          <input
            id="contact-company"
            type="text"
            placeholder="Your company name"
            className={inputClass(!!errors.company)}
            {...register('company')}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Email Address *" id="contact-email" error={errors.email?.message}>
          <input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            className={inputClass(!!errors.email)}
            {...register('email')}
          />
        </FormField>
        <FormField label="Phone Number" id="contact-phone" error={errors.phone?.message}>
          <input
            id="contact-phone"
            type="tel"
            placeholder="+880 1XXX-XXXXXX"
            className={inputClass(!!errors.phone)}
            {...register('phone')}
          />
        </FormField>
      </div>

      <FormField label="Message *" id="contact-message" error={errors.message?.message}>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Tell us how we can help you..."
          className={`${inputClass(!!errors.message)} resize-none`}
          {...register('message')}
        />
      </FormField>

      {/* Status Feedback */}
      {status === 'success' && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium">{serverMessage}</p>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium">{serverMessage}</p>
        </div>
      )}

      <button
        id="contact-submit-btn"
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#0A3D62] hover:bg-[#1E90FF] disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-full transition-colors text-base flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Header */}
      <section className="bg-[#0A3D62] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Have a question or need a consultation? Our team is here to help.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info Sidebar */}
          <aside className="lg:col-span-2 flex flex-col gap-6">
            {/* Info Cards */}
            {[
              {
                icon: '📍',
                label: 'Address',
                value: '143/1 New Baily Road ,Dhaka-1000, Bangladesh '
              },
              {
                icon: '📞',
                label: 'Phone',
                value: '+880 2222226654',
              },
              {
                icon: '📞',
                label: 'Mobile',
                value: '+8801922114807',
              },
              {
                icon: '✉️',
                label: 'Email',
                value: 'sales@fonsbd.com'
              },
              {
                icon: '🕐',
                label: 'Business Hours',
                value: 'Sat – Thu: 9:00 AM – 6:00 PM',
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 flex items-start gap-4">
                <div className="text-3xl">{icon}</div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-zinc-900 font-medium">{value}</p>
                </div>
              </div>
            ))}

            {/* CTA to Quote */}
            <div className="bg-gradient-to-br from-[#0A3D62] to-[#1E90FF] text-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-2">Need a Quote?</h3>
              <p className="text-blue-100 text-sm mb-4">
                For specific product inquiries, use our dedicated quote request form for faster processing.
              </p>
              <Link
                href="/quote"
                className="inline-block bg-white text-[#0A3D62] font-semibold py-2.5 px-6 rounded-full text-sm hover:bg-blue-50 transition-colors"
              >
                Request a Quote →
              </Link>
            </div>
          </aside>

          {/* Form + Map */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {/* Map */}
            <div className="w-full h-64 rounded-2xl overflow-hidden shadow-sm border border-zinc-100">
              <iframe
                title="FONS Bangladesh Ltd Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.26013228787815!2d90.40797209820501!3d23.741597651849276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b88b791b1459%3A0x24bb5ba51e884cc3!2sFONS%20Bangladesh%20Limited!5e0!3m2!1sen!2sbd!4v1776830788336!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">Send Us a Message</h2>
              <p className="text-zinc-500 text-sm mb-8">
                Fill out the form below and we'll get back to you within 1 business day.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
