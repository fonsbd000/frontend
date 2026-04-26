'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quoteSchema, QuoteFormData } from '@/lib/validations';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// ─── Reusable Field Components ────────────────────────────────────────────────

function FormField({
  label,
  id,
  required,
  error,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-zinc-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
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

// ─── Quote Form (inner component to use useSearchParams) ──────────────────────

function QuoteForm() {
  const searchParams = useSearchParams();
  const prefilledProduct = searchParams.get('product') || '';

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      productInterest: prefilledProduct,
    },
  });

  async function onSubmit(data: QuoteFormData) {
    setStatus('loading');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'quote' }),
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
      {/* Row 1: Name + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Full Name" id="quote-name" required error={errors.name?.message}>
          <input
            id="quote-name"
            type="text"
            placeholder="e.g. Ahmed Rahman"
            className={inputClass(!!errors.name)}
            {...register('name')}
          />
        </FormField>
        <FormField label="Company Name" id="quote-company" required error={errors.company?.message}>
          <input
            id="quote-company"
            type="text"
            placeholder="Your organization"
            className={inputClass(!!errors.company)}
            {...register('company')}
          />
        </FormField>
      </div>

      {/* Row 2: Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Email Address" id="quote-email" required error={errors.email?.message}>
          <input
            id="quote-email"
            type="email"
            placeholder="you@company.com"
            className={inputClass(!!errors.email)}
            {...register('email')}
          />
        </FormField>
        <FormField label="Phone Number" id="quote-phone" required error={errors.phone?.message}>
          <input
            id="quote-phone"
            type="tel"
            placeholder="+880 1XXX-XXXXXX"
            className={inputClass(!!errors.phone)}
            {...register('phone')}
          />
        </FormField>
      </div>

      {/* Product Interest */}
      <FormField label="Product / Equipment of Interest" id="quote-product" required error={errors.productInterest?.message}>
        <input
          id="quote-product"
          type="text"
          placeholder="e.g. Industrial Compressor, CNC Machine..."
          className={inputClass(!!errors.productInterest)}
          {...register('productInterest')}
        />
      </FormField>

      {/* Message */}
      <FormField label="Additional Requirements" id="quote-message" required error={errors.message?.message}>
        <textarea
          id="quote-message"
          rows={5}
          placeholder="Please describe your requirements, quantities, installation needs, or any other details..."
          className={`${inputClass(!!errors.message)} resize-none`}
          {...register('message')}
        />
      </FormField>

      {/* Status Feedback */}
      {status === 'success' && (
        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold">Request Received!</p>
            <p className="text-sm">{serverMessage} Our team will contact you within 1 business day.</p>
          </div>
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
        id="quote-submit-btn"
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#00C897] hover:bg-[#00b386] disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-full transition-colors text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        {status === 'loading' ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </>
        ) : (
          'Submit Quote Request'
        )}
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function QuotePage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#0A3D62] to-[#1E90FF] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#00C897] rounded-full animate-pulse"></span>
            Typically responds within 1 business day
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Request a Quote</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Tell us about your requirements and our team will prepare a detailed, competitive proposal for you.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Steps sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-bold text-zinc-900">How it works</h2>
            {[
              { step: '01', title: 'Fill the form', desc: 'Provide your contact details and describe the product or equipment you need.' },
              { step: '02', title: 'We review', desc: 'Our technical team reviews your requirements and prepares a tailored quote.' },
              { step: '03', title: 'Get your quote', desc: 'We reach out within 1 business day with pricing, delivery info, and terms.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <div className="w-10 h-10 bg-[#0A3D62] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-1">{title}</h3>
                  <p className="text-zinc-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}

            {/* Trust badges */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
              <h3 className="font-bold text-zinc-900 mb-4">Why choose FONS?</h3>
              <ul className="space-y-3">
                {['Competitive pricing', 'Genuine OEM equipment', 'Nationwide delivery', 'After-sales support'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-700">
                    <svg className="w-4 h-4 text-[#00C897] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Form Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-zinc-100 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-zinc-900 mb-1">Quote Request Form</h2>
            <p className="text-zinc-500 text-sm mb-8">All fields marked with <span className="text-red-500">*</span> are required.</p>
            <Suspense fallback={<div className="text-zinc-400 text-sm">Loading form...</div>}>
              <QuoteForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
