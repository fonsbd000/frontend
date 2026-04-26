/**
 * Next.js API Route: POST /api/inquiries
 *
 * Acts as a proxy between the frontend forms and Strapi, and also
 * sends an email notification via Nodemailer on every new inquiry.
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { contactSchema, quoteSchema } from '@/lib/validations';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
const RECIPIENT_EMAIL = process.env.INQUIRY_RECIPIENT_EMAIL || 'info@fonsbangladesh.com';

// ─── Nodemailer Transport ─────────────────────────────────────────────────────

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ─── Email Template ───────────────────────────────────────────────────────────

function buildEmailHtml(data: Record<string, string>, source: string): string {
  const rows = Object.entries(data)
    .map(
      ([key, value]) =>
        `<tr>
          <td style="padding:10px 16px;font-weight:600;color:#0A3D62;background:#f0f7ff;border-bottom:1px solid #e2e8f0;width:160px">${key}</td>
          <td style="padding:10px 16px;color:#2F3542;background:#fff;border-bottom:1px solid #e2e8f0">${value || '—'}</td>
        </tr>`
    )
    .join('');

  return `
    <div style="font-family:Inter,sans-serif;max-width:640px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
      <div style="background:#0A3D62;padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:22px">New ${source === 'quote' ? 'Quote Request' : 'Contact Inquiry'}</h1>
        <p style="color:#93c5fd;margin:6px 0 0;font-size:14px">Submitted via FONS Bangladesh Ltd website</p>
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${rows}
      </table>
      <div style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0">
        <p style="margin:0;color:#94a3b8;font-size:12px">This notification was sent automatically. Please log into Strapi to manage this inquiry.</p>
      </div>
    </div>
  `;
}

// ─── POST Handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const source: 'contact' | 'quote' = body.source || 'contact';

    // 1. Validate payload server-side
    let parsed: Record<string, string>;
    try {
      if (source === 'quote') {
        parsed = quoteSchema.parse(body) as unknown as Record<string, string>;
      } else {
        parsed = contactSchema.parse(body) as unknown as Record<string, string>;
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        return NextResponse.json({ success: false, errors: err.flatten().fieldErrors }, { status: 422 });
      }
      throw err;
    }

    // 2. POST to Strapi Inquiries collection
    const strapiRes = await fetch(`${STRAPI_URL}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          name: parsed.name,
          company: parsed.company || null,
          email: parsed.email,
          phone: parsed.phone || null,
          productInterest: (parsed as any).productInterest || null,
          message: parsed.message,
          source: source,
        },
      }),
    });

    if (!strapiRes.ok) {
      const strapiError = await strapiRes.text();
      console.error('[API/inquiries] Strapi error:', strapiError);
      return NextResponse.json(
        { success: false, message: 'Failed to save inquiry. Please try again.' },
        { status: 502 }
      );
    }

    // 3. Send email notification (non-blocking — don't fail the request if email fails)
    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = createTransport();
        const emailData: Record<string, string> = {
          Name: parsed.name,
          Company: parsed.company || '',
          Email: parsed.email,
          Phone: parsed.phone || '',
          ...(source === 'quote' && { 'Product Interest': (parsed as any).productInterest }),
          Message: parsed.message,
        };

        await transporter.sendMail({
          from: `"FONS Website" <${process.env.SMTP_USER}>`,
          to: RECIPIENT_EMAIL,
          subject: `[FONS] New ${source === 'quote' ? 'Quote Request' : 'Contact Inquiry'} from ${parsed.name}`,
          html: buildEmailHtml(emailData, source),
        });
      } else {
        console.warn('[API/inquiries] SMTP credentials not configured — skipping email notification.');
      }
    } catch (emailErr) {
      console.error('[API/inquiries] Email send failed (non-fatal):', emailErr);
    }

    return NextResponse.json({ success: true, message: 'Your inquiry has been submitted successfully!' });
  } catch (err) {
    console.error('[API/inquiries] Unexpected error:', err);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
