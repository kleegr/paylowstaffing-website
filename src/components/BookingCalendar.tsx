'use client';

import Script from 'next/script';
import { siteConfig } from '@/lib/content';

/**
 * BookingCalendar — the GoHighLevel calendar widget, wrapped cleanly.
 *
 * The provided embed snippet was:
 *   <iframe src="https://lc.paylowstaffing.com/widget/booking/..."
 *           style="width: 100%; border:none; overflow: hidden;"
 *           scrolling="no" id="..."></iframe>
 *   <script src="https://lc.paylowstaffing.com/js/form_embed.js" />
 *
 * The form_embed.js script listens for postMessage events from inside
 * the iframe (which announce the calendar's content height) and resizes
 * the parent iframe to match. Without that script, the iframe is fixed
 * height and the calendar gets cut off or scrolls awkwardly.
 *
 * Implementation choices:
 * - The iframe is rendered server-side (no JS required to display the
 *   widget itself). Even if the resize script fails, the calendar still
 *   loads inside an iframe with the min-h fallback heights below.
 * - <Script strategy="afterInteractive">: Next.js loads this AFTER React
 *   hydration completes, which is AFTER the iframe is in the DOM — so
 *   when form_embed.js runs and scans for iframes, it finds ours.
 * - min-h tiered for mobile / tablet / desktop. These are floors only;
 *   the resize script bumps the iframe to its real content height once
 *   the widget renders inside. No layout jump because the reserved space
 *   is generous enough for most calendar states.
 * - scrolling="no" + overflow:hidden suppress the inner scrollbar that
 *   the iframe content would otherwise show before the resize.
 * - title attribute for screen-reader accessibility.
 * - Stable id so the script can identify this exact iframe; using a
 *   suffix instead of a timestamp keeps the SSR output deterministic
 *   and prevents hydration mismatches.
 */
export default function BookingCalendar() {
  const CALENDAR_ID = 'EzZExLiu67To0wM8HyrA';

  return (
    <>
      <iframe
        src={siteConfig.bookingCalendarUrl}
        id={`${CALENDAR_ID}_embed`}
        title="Schedule a free 15-minute hiring call with PayLow Staffing"
        scrolling="no"
        loading="eager"
        style={{ width: '100%', border: 'none', overflow: 'hidden', display: 'block' }}
        className="min-h-[680px] sm:min-h-[760px] lg:min-h-[820px]"
      />
      <Script
        src={siteConfig.bookingEmbedScriptUrl}
        strategy="afterInteractive"
      />
    </>
  );
}
