import { redirect } from 'next/navigation';

/**
 * /testimonials was removed in favor of an expanded testimonials section
 * on the homepage (anchor: #testimonials).
 *
 * The primary redirect lives in next.config.mjs (308 permanent at the routing
 * layer, before the page even renders). This server component is a
 * belt-and-suspenders fallback: if anyone hits this route directly via a
 * cached HTML page or SSR bypass, redirect() will still send them home.
 */
export default function TestimonialsRedirect() {
  redirect('/#testimonials');
}
