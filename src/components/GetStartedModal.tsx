'use client';

import { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2, Loader2, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useGetStartedModal } from './ModalProvider';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function GetStartedModal() {
  const { isOpen, close } = useGetStartedModal();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Reset state when reopening
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMsg(null);
      // small delay so the input is in DOM before focusing
      setTimeout(() => firstFieldRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Auto-close ~2s after success
  useEffect(() => {
    if (status !== 'success') return;
    const t = setTimeout(() => close(), 2200);
    return () => clearTimeout(t);
  }, [status, close]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      kind: 'get-started',
      first_name: String(fd.get('first_name') ?? ''),
      last_name: String(fd.get('last_name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      message: String(fd.get('message') ?? ''),
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
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="get-started-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-md"
        onClick={close}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        ref={dialogRef}
        className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-lift animate-slide-up sm:animate-scale-in"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white/90 backdrop-blur-md border-b border-ink-100">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-brand-700">
              Get started
            </p>
            <h2 id="get-started-title" className="font-display font-bold text-lg text-ink-900 mt-0.5">
              Build your remote team
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-ink-50 text-ink-700 hover:bg-ink-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pt-5 pb-7">
          {status === 'success' ? (
            <div className="py-8 text-center animate-fade-in">
              <div className="mx-auto w-14 h-14 rounded-full bg-gradient-brand text-white inline-flex items-center justify-center shadow-glow-sm mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink-900">You&rsquo;re in.</h3>
              <p className="mt-2 text-sm text-ink-600">
                A PayLow team member will reach out within one business day.
              </p>
            </div>
          ) : (
            <>
              {/* Mini value props */}
              <ul className="grid grid-cols-3 gap-2 mb-5 text-[11px]">
                <li className="flex flex-col items-center gap-1.5 rounded-xl bg-ink-50 px-2 py-2.5 text-center">
                  <Zap className="w-3.5 h-3.5 text-brand-500" />
                  <span className="text-ink-700 font-medium leading-tight">Hire in days</span>
                </li>
                <li className="flex flex-col items-center gap-1.5 rounded-xl bg-ink-50 px-2 py-2.5 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
                  <span className="text-ink-700 font-medium leading-tight">Pre-vetted</span>
                </li>
                <li className="flex flex-col items-center gap-1.5 rounded-xl bg-ink-50 px-2 py-2.5 text-center">
                  <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                  <span className="text-ink-700 font-medium leading-tight">From $7/hr</span>
                </li>
              </ul>

              <form onSubmit={onSubmit} className="space-y-3" noValidate>
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input name="website_url" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="field">
                    <input
                      ref={firstFieldRef}
                      id="gs_first"
                      name="first_name"
                      required
                      placeholder="First name"
                      className="field-input"
                      autoComplete="given-name"
                    />
                    <label htmlFor="gs_first" className="field-label">First name *</label>
                  </div>
                  <div className="field">
                    <input
                      id="gs_last"
                      name="last_name"
                      required
                      placeholder="Last name"
                      className="field-input"
                      autoComplete="family-name"
                    />
                    <label htmlFor="gs_last" className="field-label">Last name *</label>
                  </div>
                </div>

                <div className="field">
                  <input
                    id="gs_email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className="field-input"
                    autoComplete="email"
                  />
                  <label htmlFor="gs_email" className="field-label">Work email *</label>
                </div>

                <div className="field">
                  <input
                    id="gs_phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    className="field-input"
                    autoComplete="tel"
                  />
                  <label htmlFor="gs_phone" className="field-label">Phone</label>
                </div>

                <div className="field">
                  <textarea
                    id="gs_message"
                    name="message"
                    rows={3}
                    placeholder="What role(s) are you looking to fill?"
                    className="field-input resize-none"
                  />
                  <label htmlFor="gs_message" className="field-label">What roles? (optional)</label>
                </div>

                {status === 'error' && (
                  <p className="text-xs text-red-600 px-1">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary btn-lg w-full justify-center"
                >
                  {status === 'submitting' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                  ) : (
                    <>Get started</>
                  )}
                </button>

                <p className="text-[11px] text-ink-400 text-center leading-relaxed px-2 pt-1">
                  We&rsquo;ll reply within one business day. By submitting you agree to our Privacy Policy.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
