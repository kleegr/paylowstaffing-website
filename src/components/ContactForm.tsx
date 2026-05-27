'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string | boolean> = {
      kind: 'contact',
      first_name: String(fd.get('first_name') ?? ''),
      last_name: String(fd.get('last_name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      message: String(fd.get('message') ?? ''),
      sms_consent_reminders: fd.get('sms_consent_reminders') === 'on',
      sms_consent_marketing: fd.get('sms_consent_marketing') === 'on',
      website_url: String(fd.get('website_url') ?? ''),
    };

    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || data?.ok === false) {
        setStatus('error');
        setErrorMsg(data?.error || 'Submission failed. Please try again.');
        return;
      }
      setStatus('success');
      e.currentTarget.reset();
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl bg-gradient-brand-soft border border-brand-100 p-8 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-gradient-brand text-white inline-flex items-center justify-center shadow-glow-sm mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="display-3">Got it.</h3>
        <p className="mt-3 text-ink-600">We&rsquo;ll be in touch within one business day.</p>
        <button onClick={() => setStatus('idle')} className="btn-outline mt-6">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="hidden" aria-hidden="true">
        <input name="website_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="field">
          <input id="first_name" name="first_name" required placeholder="First name" className="field-input" autoComplete="given-name" />
          <label htmlFor="first_name" className="field-label">First name *</label>
        </div>
        <div className="field">
          <input id="last_name" name="last_name" required placeholder="Last name" className="field-input" autoComplete="family-name" />
          <label htmlFor="last_name" className="field-label">Last name *</label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="field">
          <input id="email" name="email" type="email" required placeholder="you@company.com" className="field-input" autoComplete="email" />
          <label htmlFor="email" className="field-label">Email *</label>
        </div>
        <div className="field">
          <input id="phone" name="phone" type="tel" placeholder="(555) 555-5555" className="field-input" autoComplete="tel" />
          <label htmlFor="phone" className="field-label">Phone</label>
        </div>
      </div>

      <div className="field">
        <textarea id="message" name="message" rows={4} placeholder="What kind of role are you looking to fill?" className="field-input resize-none" />
        <label htmlFor="message" className="field-label">How can we help?</label>
      </div>

      <fieldset className="space-y-3 rounded-2xl bg-ink-50/70 border border-ink-100 p-4 text-xs text-ink-600 leading-relaxed">
        <legend className="sr-only">SMS consent</legend>
        <label className="flex items-start gap-3 cursor-pointer">
          <input name="sms_consent_reminders" type="checkbox" className="mt-0.5 w-4 h-4 accent-brand-500" />
          <span>
            I agree to receive automated reminders by SMS from PayLow Staffing. Message &amp; data rates may apply.
            Reply <strong>HELP</strong> for help, <strong>STOP</strong> to opt out.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input name="sms_consent_marketing" type="checkbox" className="mt-0.5 w-4 h-4 accent-brand-500" />
          <span>
            I agree to receive marketing &amp; promotional SMS. Reply <strong>STOP</strong> to opt out.
          </span>
        </label>
      </fieldset>

      {status === 'error' && (
        <div className="flex items-start gap-2 rounded-2xl bg-red-50 border border-red-100 p-3 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button type="submit" disabled={status === 'submitting'} className="btn-primary btn-lg">
          {status === 'submitting'
            ? (<><Loader2 className="w-4 h-4 animate-spin" /> Submitting&hellip;</>)
            : (<>Send it <Send className="w-4 h-4" /></>)}
        </button>
        <p className="text-xs text-ink-500">
          By submitting you agree to our{' '}
          <Link href="https://privacy-policy.paylowstaffing.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink-700">Privacy Policy</Link>
          {' '}&amp;{' '}
          <Link href="https://toc.paylowstaffing.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink-700">Terms</Link>.
        </p>
      </div>
    </form>
  );
}
