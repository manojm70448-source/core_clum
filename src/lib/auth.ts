import crypto from 'crypto';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'core_and_culm_admin_secret_key_2026';
const COOKIE_NAME = 'shipyon_admin_session';

export function isDefaultAdminPassword(): boolean {
  return !process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD === 'admin123';
}

export function verifyPassword(password: string): boolean {
  if (!password) return false;
  return password.trim() === ADMIN_PASSWORD.trim();
}

export function generateSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(`admin:${timestamp}`)
    .digest('hex');
  return `${timestamp}.${signature}`;
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Session valid for 7 days
  const maxAge = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > maxAge) return false;

  const expectedSignature = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(`admin:${timestampStr}`)
    .digest('hex');

  if (signature.length !== expectedSignature.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export function getAdminAuthStatus(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return verifySessionToken(token);
  } catch (err) {
    return false;
  }
}

export { COOKIE_NAME };
