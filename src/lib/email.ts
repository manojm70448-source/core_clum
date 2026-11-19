import { InquiryRecord } from './db';

const NOTIFY_EMAIL = (process.env.NOTIFY_EMAIL || 'coreandculm@gmail.com').toLowerCase().trim();
const FROM_EMAIL = process.env.FROM_EMAIL || 'CORE & CULM Export Desk <onboarding@resend.dev>';

export async function sendInquiryNotificationEmail(inquiry: InquiryRecord): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info('[Email] RESEND_API_KEY not configured. Skipping email notification. Inquiry is safely stored in database/fallback.');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  const subject = `🚨 New Export RFQ: ${inquiry.commodity} from ${inquiry.full_name} (${inquiry.company})`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #14532d; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
          .header p { margin: 6px 0 0; font-size: 13px; color: #86efac; }
          .badge { display: inline-block; background: #dcfce7; color: #15803d; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 99px; margin-top: 10px; }
          .content { padding: 24px; }
          .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
          .detail-grid { margin-bottom: 20px; }
          .detail-row { display: flex; padding: 8px 0; border-bottom: 1px solid #f8fafc; font-size: 14px; }
          .detail-label { width: 140px; font-weight: 600; color: #475569; flex-shrink: 0; }
          .detail-value { font-weight: 500; color: #0f172a; flex: 1; word-break: break-word; }
          .highlight { color: #16a34a; font-weight: 700; }
          .notes-box { background: #f8fafc; border-left: 4px solid #16a34a; padding: 12px 16px; border-radius: 0 8px 8px 0; font-size: 13px; color: #334155; line-height: 1.6; margin-top: 8px; }
          .actions { padding: 20px 24px; background: #f8fafc; text-align: center; border-top: 1px solid #e2e8f0; }
          .btn-reply { display: inline-block; background: #16a34a; color: #ffffff; text-decoration: none; padding: 10px 24px; font-size: 13px; font-weight: 700; border-radius: 8px; margin: 4px; }
          .btn-wa { display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; padding: 10px 24px; font-size: 13px; font-weight: 700; border-radius: 8px; margin: 4px; }
          .footer { text-align: center; font-size: 11px; color: #94a3b8; padding: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CORE &amp; CULM™</h1>
            <p>Direct Agricultural Sourcing &bull; Global Export Desk</p>
            <div class="badge">Inquiry ID: ${inquiry.id}</div>
          </div>
          <div class="content">
            <div class="section-title">Commodity &amp; Shipping Details</div>
            <div class="detail-grid">
              <div class="detail-row">
                <span class="detail-label">Commodity:</span>
                <span class="detail-value highlight">${inquiry.commodity}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Volume:</span>
                <span class="detail-value">${inquiry.volume}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Incoterm:</span>
                <span class="detail-value">${inquiry.incoterm}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Destination Port:</span>
                <span class="detail-value highlight">${inquiry.destination}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date Received:</span>
                <span class="detail-value">${new Date(inquiry.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
              </div>
            </div>

            <div class="section-title">Buyer Contact Information</div>
            <div class="detail-grid">
              <div class="detail-row">
                <span class="detail-label">Full Name:</span>
                <span class="detail-value">${inquiry.full_name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Company:</span>
                <span class="detail-value">${inquiry.company}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone / WhatsApp:</span>
                <span class="detail-value">${inquiry.phone}</span>
              </div>
            </div>

            ${
              inquiry.notes
                ? `
                <div class="section-title">Buyer Notes &amp; Packaging Specifications</div>
                <div class="notes-box">${inquiry.notes}</div>
              `
                : ''
            }
          </div>

          <div class="actions">
            <a href="mailto:${inquiry.email}?subject=RE: CORE %26 CULM Quotation for ${encodeURIComponent(inquiry.commodity)}" class="btn-reply">
              ✉️ Reply via Email
            </a>
            ${
              inquiry.phone && inquiry.phone !== 'N/A'
                ? `
              <a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${inquiry.full_name}, this is Prabhakaran from CORE & CULM regarding your export quotation request for ${inquiry.commodity}.`
                  )}" target="_blank" class="btn-wa">
                💬 Chat on WhatsApp
              </a>
            `
                : ''
            }
          </div>

          <div class="footer">
            CORE &amp; CULM &bull; Pattukkottai, Tamil Nadu, India &bull; GSTIN: 33EBBPG3505C1ZH
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    let res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [NOTIFY_EMAIL],
        reply_to: inquiry.email,
        subject,
        html,
      }),
    });

    let result = await res.json();

    // If Resend free tier restricts to registered email, retry with registered email
    if (!res.ok && result.message?.includes('only send testing emails to your own email address')) {
      console.warn('[Email] Falling back to registered account email: coreandculm@gmail.com');
      res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: ['coreandculm@gmail.com'],
          reply_to: inquiry.email,
          subject,
          html,
        }),
      });
      result = await res.json();
    }

    if (res.ok) {
      console.info(`[Email] Notification sent successfully (ID: ${result.id})`);
      return { success: true, id: result.id };
    } else {
      console.warn('[Email] Resend API error:', result);
      return { success: false, error: result.message || 'Failed to send notification email' };
    }
  } catch (err: any) {
    console.warn('[Email] Network error while calling Resend:', err?.message);
    return { success: false, error: err?.message };
  }
}
