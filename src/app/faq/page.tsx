import { redirect } from 'next/navigation';

/**
 * FAQ page — retired.
 *
 * A compact 5-item accordion now lives on the homepage at #faq.
 * `next.config.mjs` 308's `/faq` to `/#faq` at the edge — hash fragments
 * pass through to the browser, which scrolls to the section on landing
 * (the section has scroll-mt-24 so the sticky header doesn't cover it).
 * This file is a fallback for the rare case the redirect rule is bypassed.
 */
export default function FaqPage() {
  redirect('/#faq');
}
