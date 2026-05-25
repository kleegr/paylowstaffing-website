import { NextResponse } from 'next/server';

/**
 * Contact form & newsletter submission handler.
 *
 * Behavior:
 *  - If CONTACT_FORM_WEBHOOK_URL is set, the JSON body is forwarded there.
 *  - Otherwise, the submission is logged to the server console.
 *
 * The live PayLow site embeds a GoHighLevel widget for its contact form
 * (https://lc.paylowstaffing.com/widget/form/1bJDrrS4rOrnEZPBoXDJ). In production
 * you can either:
 *   (a) keep this endpoint and POST the form to /api/contact, or
 *   (b) embed the upstream iframe directly (see ContactForm component).
 */
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

  const webhook = process.env.CONTACT_FORM_WEBHOOK_URL;

  if (webhook) {
    try {
      const upstream = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!upstream.ok) {
        // eslint-disable-next-line no-console
        console.error('[contact] upstream non-200:', upstream.status);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[contact] upstream error:', err);
      return NextResponse.json(
        { ok: false, error: 'Upstream submission failed' },
        { status: 502 }
      );
    }
  } else {
    // eslint-disable-next-line no-console
    console.log('[contact] submission received (no webhook configured):', payload);
  }

  return NextResponse.json({ ok: true });
}
