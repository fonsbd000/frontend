/**
 * Shared Zod validation schemas for Contact and Quote forms.
 * Used by both client-side React Hook Form and server-side API route.
 */
import { z } from 'zod';

// ─── Contact Form Schema ─────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name must be under 100 characters.'),
  company: z
    .string()
    .max(150, 'Company name must be under 150 characters.')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .email('Please enter a valid email address.'),
  phone: z
    .string()
    .regex(/^[+\d\s\-().]{7,20}$/, 'Please enter a valid phone number.')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message must be under 2000 characters.'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ─── Quote Form Schema ────────────────────────────────────────────────────────

export const quoteSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name must be under 100 characters.'),
  company: z
    .string()
    .min(1, 'Company name is required.')
    .max(150, 'Company name must be under 150 characters.'),
  email: z
    .string()
    .email('Please enter a valid email address.'),
  phone: z
    .string()
    .regex(/^[+\d\s\-().]{7,20}$/, 'Please enter a valid phone number.'),
  productInterest: z
    .string()
    .min(1, 'Please select or describe a product of interest.'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message must be under 2000 characters.'),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;

// ─── Unified Inquiry Payload ─────────────────────────────────────────────────
// Matches the Strapi Inquiry content type fields.

export type InquiryPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  productInterest?: string;
  message: string;
  source: 'contact' | 'quote';
};
