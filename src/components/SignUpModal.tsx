'use client';

import { useEffect, useState } from 'react';
import { X, ExternalLink, Loader2 } from 'lucide-react';
import { useGetStartedModal } from './ModalProvider';
import { siteConfig } from '@/lib/content';

/**
 * SignUpModal
 *
 * Opens the live PayLow sign-up flow inside an in-page modal so the user feels
 * they're still on PayLow Staffing. The page is loaded in an iframe.
 *
 * Resiliency:
 *  - If signup.paylowstaffing.com sends X-Frame-Options: DENY or a strict CSP
 *    frame-ancestors, the iframe will render empty. A visible "Open in a new
 *    tab" link is always present in the footer so users have a one-tap escape
 *    hatch in that case.
 *  - GHL/LeadConnector signup pages typically allow embedding (they're designed
 *    to be embedded), so iframe loading is expected to succeed.
 */
export default function SignUpModal() {
  const { isOpen, close } = useGetStartedModal();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Reset the loading spinner each time the modal opens
  useEffect(() => {
    if (isOpen) setIframeLoaded(false);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-900/70 backdrop-blur-md"
        onClick={close}
        aria-hidden="true"
      />

      {/* Decorative orbs behind the modal — gives it a premium PayLow-on-stage feel */}
      <div
        aria-hidden="true"
        className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gradient-brand opacity-25 blur-3xl pointer-events-none animate-float-slow"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brand-300 opacity-20 blur-3xl pointer-events-none animate-float-slow"
        style={{ animationDelay: '2s' }}
      />

      {/* Modal */}
      <div
        className="relative w-full sm:max-w-2xl h-[92vh] sm:h-[85vh] sm:max-h-[820px] bg-white rounded-t-3xl sm:rounded-3xl shadow-lift overflow-hidden flex flex-col animate-slide-up sm:animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 border-b border-ink-100 flex items-center justify-between bg-white">
          <div>
            <p className="label-meta">PayLow · Sign up</p>
            <p
              id="signup-modal-title"
              className="font-display font-bold text-ink-900 text-base mt-0.5"
            >
              Start hiring in minutes
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close sign-up"
            className="w-10 h-10 rounded-full bg-ink-50 hover:bg-ink-100 inline-flex items-center justify-center transition"
          >
            <X className="w-5 h-5 text-ink-700" />
          </button>
        </div>

        {/* Iframe body */}
        <div className="flex-1 relative bg-gradient-warm">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 pointer-events-none">
              <Loader2 className="w-7 h-7 text-brand-500 animate-spin" />
              <p className="text-sm text-ink-500">Loading sign-up…</p>
            </div>
          )}
          <iframe
            key={isOpen ? 'open' : 'closed'}
            src={siteConfig.signUpUrl}
            title="PayLow Staffing — Sign up"
            className="absolute inset-0 w-full h-full border-0"
            referrerPolicy="origin-when-cross-origin"
            onLoad={() => setIframeLoaded(true)}
            allow="clipboard-read; clipboard-write"
          />
        </div>

        {/* Footer — fallback link is always visible */}
        <div className="px-5 py-3 sm:px-6 border-t border-ink-100 bg-white flex items-center justify-between gap-3 flex-wrap">
          <p className="text-xs text-ink-500">
            Not loading? Open the form directly.
          </p>
          <a
            href={siteConfig.signUpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-600 transition"
          >
            Open in a new tab <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
