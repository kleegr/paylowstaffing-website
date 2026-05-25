'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { siteConfig } from '@/lib/content';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'contact', ...payload }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Submission failed');
      }
      setStatus('done');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <input type="text" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] w-px h-px opacity-0" />
      <Field label="First Name" name="first_name" required />
      <Field label="Last Name" name="last_name" required />
      <Field label="Phone" name="phone" type="tel" />
      <Field label="Email" name="email" type="email" required indicator="*" />

      <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 cursor-pointer">
        <input type="checkbox" name="sms_consent_automated" className="mt-1 w-5 h-5 rounded border-slate-300 accent-brand-600" />
        <span>
          I agree to receive <strong>Automated Reminders and Service-Based messages</strong> from{' '}
          <strong>{siteConfig.fullName}</strong> at the phone number provided above. This agreement isn&apos;t a condition of any purchase.{' '}
          <strong>Message and data rates may apply,</strong> and message frequencies vary. Text <strong>HELP</strong> to{' '}
          <strong>+1{siteConfig.contact.phoneTel}</strong> for assistance, or reply <strong>STOP</strong> or <strong>OUT</strong> to opt out or unsubscribe at any time.
        </span>
      </label>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 cursor-pointer">
        <input type="checkbox" name="sms_consent_marketing" className="mt-1 w-5 h-5 rounded border-slate-300 accent-brand-600" />
        <span>
          I agree to receive <strong>Marketing and Promotional</strong> messages from <strong>{siteConfig.fullName}</strong> at the phone number provided above. This agreement isn&apos;t a condition of any purchase.{' '}
          <strong>Message and data rates may apply,</strong> and message frequencies vary. Text <strong>HELP</strong> to{' '}
          <strong>+1{siteConfig.contact.phoneTel}</strong> for assistance, or reply <strong>STOP</strong> or <strong>OUT</strong> to opt out or unsubscribe at any time.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full mt-2 bg-cream-100 hover:bg-cream-200 text-ink-900 font-semibold py-3.5 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Submitting…' : 'Submit'}
      </button>

      <div className="text-center text-sm text-slate-500">
        <Link href={siteConfig.privacyUrl} className="text-brand-700 hover:underline">Privacy Policy</Link>
        {' | '}
        <Link href={siteConfig.termsUrl} className="text-brand-700 hover:underline">Terms of Service</Link>
      </div>

      {status === 'done' && (
        <div role="status" className="flex items-start gap-3 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 p-4">
          <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Thanks — your message has been sent.</p>
            <p className="text-sm">We&apos;ll be in touch shortly.</p>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div role="alert" className="flex items-start gap-3 rounded-md bg-red-50 text-red-800 border border-red-200 p-4">
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Submission failed.</p>
            <p className="text-sm">{errorMessage ?? 'Please try again in a moment.'}</p>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  label, name, type = 'text', required = false, indicator,
}: {
  label: string; name: string; type?: string; required?: boolean; indicator?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink-900 mb-2">
        {label}
        {indicator && <span className="text-brand-600 ml-1">{indicator}</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={label}
        className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 focus:outline-none transition"
      />
    </div>
  );
}
