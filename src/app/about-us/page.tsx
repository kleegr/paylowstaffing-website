import { redirect } from 'next/navigation';

/**
 * About Us page — retired.
 *
 * The hero copy on the homepage now carries the full value proposition,
 * so a dedicated About page added more navigation surface than value.
 * `next.config.mjs` 308's `/about-us` to `/` at the edge, but this file
 * stays as a belt-and-suspenders fallback in case the redirect rule is
 * ever bypassed (custom rewrites, middleware shenanigans, etc).
 *
 * `redirect()` from next/navigation throws a special error during render
 * that Next.js catches and converts into a 307. No UI is ever rendered.
 */
export default function AboutUsPage() {
  redirect('/');
}
