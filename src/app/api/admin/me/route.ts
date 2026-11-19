import { NextResponse } from 'next/server';
import { getAdminAuthStatus, isDefaultAdminPassword } from '@/lib/auth';
import { getDbStatus } from '@/lib/db';

export async function GET() {
  const isAuthenticated = getAdminAuthStatus();
  const dbStatus = await getDbStatus();

  return NextResponse.json({
    authenticated: isAuthenticated,
    db: dbStatus,
    isDefaultPassword: isDefaultAdminPassword(),
  });
}
