import { NextResponse } from 'next/server';

/**
 * Contact form & newsletter submission handler.
 *
 * The PayLow GoHighLevel form webhook is hardcoded here so the form works in
 * production without requiring CONTACT_FORM_WEBHOOK_URL to be set in Vercel.
 *
 * If you ever need to override (e.g. a staging webhook), set CONTACT_FORM_WEBHOOK_URL
 * in env and it will take precedence over the hardcoded default.
 */
const DEFAULT_WEBHOOK_URL =
  'https://lc.paylowstaffing.com/widget/form/1bJDrrS4rOrnEZPBoXDJ';

export async function POST(request: Request) {
  let payload: Record<string, unknown> = {};
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  // Minimal anti-spam: honeypot field 'website_url' should be empty.
  if (typeof payload.website_url === 'string' && payload.website_url.length > 0) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  // Validate that at minimum we have email or a body
  if (!payload.email && !payload.message && payload.kind !== 'newsletter') {
    return NextResponse.json(
      { ok: false, error: 'email or message is required' },
      { status: 400 }
    );
  }

  const webhook = process.env.CONTACT_FORM_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;

  try {
    // GoHighLevel form widgets accept multipart/form-data submissions.
    // We forward both as JSON (legacy) and as form data (so the GHL widget endpoint accepts it).
    const formData = new URLSearchParams();
    for (const [k, v] of Object.entries(payload)) {
      if (v == null) continue;
      formData.append(k, typeof v === 'string' ? v : JSON.stringify(v));
    }

    const upstream = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'PayLowStaffing-Website/1.0',
      },
      body: formData.toString(),
    });

    if (!upstream.ok) {
      // eslint-disable-next-line no-console
      console.error('[contact] upstream non-200:', upstream.status, await upstream.text().catch(() => ''));
      return NextResponse.json(
        { ok: false, error: `Upstream returned ${upstream.status}` },
        { status: 502 }
      );
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[contact] upstream error:', err);
    return NextResponse.json(
      { ok: false, error: 'Upstream submission failed' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
