import { NextResponse } from 'next/server';
import { saveInquiry, getAllInquiries } from '@/lib/db';
import { getAdminAuthStatus } from '@/lib/auth';
import { sendInquiryNotificationEmail } from '@/lib/email';

export async function GET() {
  // Protect inquiries data: Only authorized admins can read client inquiries
  if (!getAdminAuthStatus()) {
    return NextResponse.json(
      { error: 'Unauthorized. Confidential company inquiry details are accessible only by administrators.' },
      { status: 401 }
    );
  }

  try {
    const inquiries = await getAllInquiries();
    return NextResponse.json({ inquiries });
  } catch (err) {
    console.error('Failed to get inquiries:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve inquiries' },
      { status: 500 }
    );
  }
}

function sanitize(val: any, maxLen = 255): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case '\0':
          return '';
        case '\n':
          return ' ';
        case '\r':
          return '';
        default:
          return char;
      }
    })
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .trim()
    .slice(0, maxLen);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    let data: any;
    try {
      data = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload received.' },
        { status: 400 }
      );
    }

    const rawName = data.fullName || data.full_name || data.name;
    const rawEmail = data.email;

    const fullName = sanitize(rawName, 100);
    const email = sanitize(rawEmail, 150);
    const commodity = sanitize(data.commodity || 'General Inquiry', 120);
    const volume = sanitize(data.volume || 'Standard Container / Inquiry', 120);
    const incoterm = sanitize(data.incoterm || 'CIF', 80);
    const destination = sanitize(data.destination || 'Direct Inquiry Desk', 150);
    const company = sanitize(data.company || 'Direct Buyer', 150);
    const phone = sanitize(data.phone || 'N/A', 50);
    const notes = sanitize(data.notes || data.message || '', 2500);

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: 'Please provide a valid full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid corporate email address.' },
        { status: 400 }
      );
    }

    const savedRecord = await saveInquiry({
      commodity,
      volume,
      incoterm,
      destination,
      full_name: fullName,
      company,
      email,
      phone,
      notes,
      status: 'New Inquiry',
    });

    // Trigger instant email notification to Coreandculm@gmail.com (non-blocking)
    sendInquiryNotificationEmail(savedRecord).catch((err) =>
      console.warn('[Email] Background notification dispatch error:', err)
    );

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been securely stored and transmitted to the CORE & CULM export desk.',
      inquiryId: savedRecord.id,
    });
  } catch (err) {
    console.error('Failed to process quotation request:', err);
    return NextResponse.json(
      { error: 'Internal server error while processing quotation request. Please connect via WhatsApp or try again.' },
      { status: 500 }
    );
  }
}
