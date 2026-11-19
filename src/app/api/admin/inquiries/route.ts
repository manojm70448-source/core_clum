import { NextResponse } from 'next/server';
import { getAdminAuthStatus } from '@/lib/auth';
import { getAllInquiries, getDbStatus } from '@/lib/db';

export async function GET() {
  if (!getAdminAuthStatus()) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin session required.' },
      { status: 401 }
    );
  }

  try {
    const inquiries = await getAllInquiries();
    const dbStatus = await getDbStatus();

    return NextResponse.json({
      success: true,
      inquiries,
      count: inquiries.length,
      dbStatus,
    });
  } catch (err) {
    console.error('Failed to fetch inquiries:', err);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}
