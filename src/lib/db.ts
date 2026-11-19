import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

export interface InquiryRecord {
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

let pool: Pool | null = null;
let isInitialized = false;

function getPool(): Pool | null {
  const databaseUrl = process.env.DATABASE_URL;
  if (!pool && databaseUrl) {
    const isLocal = databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: !isLocal ? { rejectUnauthorized: false } : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

// Fallback JSON file paths for local development and serverless environments (/tmp)
const primaryJsonPath = path.join(process.cwd(), 'data', 'inquiries.json');
const serverlessJsonPath = path.join('/tmp', 'inquiries.json');
let inMemoryInquiries: InquiryRecord[] = [];

function getFallbackInquiries(): InquiryRecord[] {
  let diskList: any[] = [];

  // Try primary directory first
  if (fs.existsSync(primaryJsonPath)) {
    try {
      const raw = fs.readFileSync(primaryJsonPath, 'utf-8');
      diskList = JSON.parse(raw);
    } catch (err) {
      console.warn('Could not read primary inquiries file:', err);
    }
  } else if (fs.existsSync(serverlessJsonPath)) {
    // Try /tmp directory for serverless (Vercel/Netlify)
    try {
      const raw = fs.readFileSync(serverlessJsonPath, 'utf-8');
      diskList = JSON.parse(raw);
    } catch (err) {
      console.warn('Could not read serverless inquiries file:', err);
    }
  }

  const parsedDisk: InquiryRecord[] = diskList.map((item: any) => ({
    id: item.id,
    created_at: item.timestamp || item.created_at || new Date().toISOString(),
    commodity: item.commodity || '',
    volume: item.volume || '',
    incoterm: item.incoterm || 'CIF',
    destination: item.destination || '',
    full_name: item.fullName || item.full_name || '',
    company: item.company || '',
    email: item.email || '',
    phone: item.phone || '',
    notes: item.notes || '',
    status: item.status || 'New Inquiry',
  }));

  // Merge in-memory and disk records (deduplicated by id)
  const map = new Map<string, InquiryRecord>();
  for (const item of inMemoryInquiries) {
    map.set(item.id, item);
  }
  for (const item of parsedDisk) {
    map.set(item.id, item);
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

function saveFallbackInquiry(inquiry: InquiryRecord) {
  // Always update in-memory list first
  inMemoryInquiries = inMemoryInquiries.filter((i) => i.id !== inquiry.id);
  inMemoryInquiries.unshift(inquiry);

  const fullList = getFallbackInquiries();
  const serialized = JSON.stringify(fullList, null, 2);

  // 1. Try writing to primary project directory (VPS / Docker / Local)
  try {
    const dir = path.dirname(primaryJsonPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(primaryJsonPath, serialized);
    return;
  } catch (err) {
    // On serverless (Vercel/Netlify), process.cwd() is read-only
  }

  // 2. Fallback to /tmp which is writable on serverless platforms
  try {
    fs.writeFileSync(serverlessJsonPath, serialized);
  } catch (err) {
    console.warn('Fallback file write to /tmp skipped, using in-memory store:', err);
  }
}

export async function initDb() {
  if (isInitialized) return true;
  const p = getPool();
  if (!p) return false;

  try {
    const client = await p.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS inquiries (
          id VARCHAR(64) PRIMARY KEY,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          commodity VARCHAR(255) NOT NULL,
          volume VARCHAR(255),
          incoterm VARCHAR(64),
          destination VARCHAR(255),
          full_name VARCHAR(255) NOT NULL,
          company VARCHAR(255),
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(64),
          notes TEXT,
          status VARCHAR(64) DEFAULT 'New Inquiry'
        );
      `);
      isInitialized = true;
      return true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn('PostgreSQL connection check failed, using fallback storage:', (err as any)?.message);
    return false;
  }
}

export async function getDbStatus(): Promise<{ connected: boolean; provider: string }> {
  const p = getPool();
  if (!p) {
    return { connected: false, provider: 'Local Fallback Storage (Configure DATABASE_URL for PostgreSQL)' };
  }
  try {
    const client = await p.connect();
    client.release();
    return { connected: true, provider: 'PostgreSQL Database' };
  } catch (err) {
    return { connected: false, provider: 'PostgreSQL Disconnected / Fallback Storage' };
  }
}

export async function saveInquiry(data: Omit<InquiryRecord, 'id' | 'created_at'>): Promise<InquiryRecord> {
  const id = `RFQ-CC-${Date.now().toString().slice(-6)}`;
  const created_at = new Date().toISOString();

  const record: InquiryRecord = {
    id,
    created_at,
    commodity: data.commodity,
    volume: data.volume || '1 x 40ft Container',
    incoterm: data.incoterm || 'CIF',
    destination: data.destination || 'Not Specified',
    full_name: data.full_name,
    company: data.company || 'Direct Buyer',
    email: data.email,
    phone: data.phone || 'N/A',
    notes: data.notes || '',
    status: data.status || 'New Inquiry',
  };

  const p = getPool();
  if (p) {
    try {
      await initDb();
      const query = `
        INSERT INTO inquiries (id, created_at, commodity, volume, incoterm, destination, full_name, company, email, phone, notes, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *;
      `;
      const values = [
        record.id,
        record.created_at,
        record.commodity,
        record.volume,
        record.incoterm,
        record.destination,
        record.full_name,
        record.company,
        record.email,
        record.phone,
        record.notes,
        record.status,
      ];
      const res = await p.query(query, values);
      return res.rows[0];
    } catch (err) {
      console.warn('Failed to insert into PostgreSQL, saving to fallback:', (err as any)?.message);
    }
  }

  saveFallbackInquiry(record);
  return record;
}

export async function getAllInquiries(): Promise<InquiryRecord[]> {
  const p = getPool();
  if (p) {
    try {
      await initDb();
      const res = await p.query('SELECT * FROM inquiries ORDER BY created_at DESC');
      return res.rows;
    } catch (err) {
      console.warn('Failed to query PostgreSQL, loading from fallback:', (err as any)?.message);
    }
  }
  return getFallbackInquiries();
}

export async function updateInquiryStatus(id: string, status: string): Promise<boolean> {
  const p = getPool();
  if (p) {
    try {
      await initDb();
      await p.query('UPDATE inquiries SET status = $1 WHERE id = $2', [status, id]);
      return true;
    } catch (err) {
      console.warn('Failed to update status in PostgreSQL:', (err as any)?.message);
    }
  }

  // Fallback update
  try {
    const list = getFallbackInquiries();
    const item = list.find((i) => i.id === id);
    if (item) {
      item.status = status;
      // Update in-memory list
      inMemoryInquiries = inMemoryInquiries.map((i) => (i.id === id ? { ...i, status } : i));
      const serialized = JSON.stringify(list, null, 2);
      try {
        fs.writeFileSync(primaryJsonPath, serialized);
      } catch {
        try {
          fs.writeFileSync(serverlessJsonPath, serialized);
        } catch {}
      }
      return true;
    }
  } catch (err) {
    console.error('Failed to update fallback item:', err);
  }
  return false;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const p = getPool();
  if (p) {
    try {
      await initDb();
      await p.query('DELETE FROM inquiries WHERE id = $1', [id]);
      return true;
    } catch (err) {
      console.warn('Failed to delete from PostgreSQL:', (err as any)?.message);
    }
  }

  // Fallback delete
  try {
    let list = getFallbackInquiries();
    list = list.filter((i) => i.id !== id);
    inMemoryInquiries = inMemoryInquiries.filter((i) => i.id !== id);
    const serialized = JSON.stringify(list, null, 2);
    try {
      fs.writeFileSync(primaryJsonPath, serialized);
    } catch {
      try {
        fs.writeFileSync(serverlessJsonPath, serialized);
      } catch {}
    }
    return true;
  } catch (err) {
    console.error('Failed to delete fallback item:', err);
  }
  return false;
}
