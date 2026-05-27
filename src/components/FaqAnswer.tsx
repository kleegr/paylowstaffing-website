'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * FaqAnswer — word-by-word typewriter that lives inside a native
 * <details> element. v5.
 *
 * DESIGN GOALS:
 * 1. Don't regress the v4 native-<details> FAQ that finally works
 *    reliably in the user's browser.
 * 2. Add a typing effect on open, without re-introducing the opacity
 *    transitions that broke v1–v3 (which raced against the global
 *    [data-reveal] rule).
 * 3. No layout jump: reserve the answer's natural height with an
 *    invisible ghost <p> before the visible text starts typing.
 * 4. Reduced-motion users see the full answer instantly.
 * 5. Accessibility: the full answer is in the DOM at all times via
 *    the ghost <p> (visibility:hidden keeps it readable to screen
 *    readers and search engines).
 *
 * HOW IT WORKS:
 * - The parent component renders <FaqAnswer text="..." /> inside a
 *   .paylow-faq-answer wrapper inside <details>.
 * - This component looks for the closest <details> ancestor and
 *   listens to its 'toggle' event (a native DOM event the browser
 *   fires whenever the [open] attribute changes).
 * - When open=true: split text into words, type them in one by one
 *   on a requestAnimationFrame timer. ~55ms per word.
 * - When open=false: clear the typed text and stop the timer.
 * - No opacity, no transform animation on the answer text itself.
 *   The typing IS the animation.
 *
 * WHY NO OPACITY TRANSITION:
 * The v1–v3 FAQs failed ("answer disappears") most likely because
 * the global [data-reveal] CSS rule applies opacity:0 + transition
 * to the parent <details>, and the inner accordion ALSO had its own
 * opacity transition. Two opacity transitions stacked on the same
 * subtree, firing in close timing, produced the disappearing flash.
 * This component uses NO opacity transitions on the text. Words
 * either exist in the DOM (typed) or don't (not yet typed). That
 * cannot conflict with anything.
 *
 * WORDS NOT CHARACTERS:
 * - More stable: words don't break across lines awkwardly mid-letter.
 * - Reads better: human eyes parse word boundaries naturally.
 * - Less DOM churn: ~30 words vs ~150 characters per answer.
 */

export default function FaqAnswer({ text }: { text: string }) {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const words = text.split(/(\s+)/); // keep whitespace tokens as their own array slots

  // Detect prefers-reduced-motion once on mount. Listen for changes too
  // so a user toggling their system setting mid-session gets the right UX.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Hook into the native <details> 'toggle' event.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const details = wrapper.closest('details');
    if (!details) return;

    const stopRaf = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };

    const startTyping = () => {
      stopRaf();

      // Reduced motion: jump to the end immediately, no animation.
      if (reducedMotion) {
        setVisibleWordCount(words.length);
        return;
      }

      // Start from zero and tick forward by one slot every ~55ms.
      // Using requestAnimationFrame keeps timing in sync with the
      // browser's paint cycle (smoother than setInterval, which can
      // jitter under load).
      setVisibleWordCount(0);
      let lastTick = performance.now();
      const TICK_MS = 55;

      const loop = (now: number) => {
        if (now - lastTick >= TICK_MS) {
          lastTick = now;
          setVisibleWordCount((cur) => {
            const next = cur + 1;
            if (next >= words.length) {
              // Done. Stop the loop. Don't schedule another frame.
              return words.length;
            }
            return next;
          });
        }
        // Only schedule the next frame if we haven't reached the end.
        // This is checked here (not just inside setVisibleWordCount)
        // because state updates are async and we don't want to keep
        // looping forever after the last word.
        if (visibleWordCountRef.current < words.length) {
          rafIdRef.current = requestAnimationFrame(loop);
        } else {
          rafIdRef.current = null;
        }
      };

      rafIdRef.current = requestAnimationFrame(loop);
    };

    const handleToggle = () => {
      if (details.open) {
        startTyping();
      } else {
        // <details> closed (either by user click or by the native
        // name="paylow-faq" exclusive group when another item opened).
        stopRaf();
        setVisibleWordCount(0);
      }
    };

    // If <details> is already open at mount time (e.g. browser restored
    // an open state across navigation), kick off typing immediately.
    if (details.open) startTyping();

    details.addEventListener('toggle', handleToggle);
    return () => {
      details.removeEventListener('toggle', handleToggle);
      stopRaf();
    };
    // We intentionally exclude `words` from deps: the text prop is
    // static once mounted, and including it would re-bind the listener
    // on every render. reducedMotion needs to be a dep so the typing
    // behavior switches immediately when the user toggles their system
    // preference.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  // Mirror visibleWordCount into a ref so the rAF loop can read it
  // without becoming a closure dependency. (Without this, the loop
  // would close over the initial value of visibleWordCount = 0 and
  // never know when to stop.)
  const visibleWordCountRef = useRef(0);
  useEffect(() => {
    visibleWordCountRef.current = visibleWordCount;
  }, [visibleWordCount]);

  // Compose the visible string. Slice the word array up to the current
  // count and concatenate. Whitespace tokens are preserved because we
  // split with a capturing group above.
  const visibleText = words.slice(0, visibleWordCount).join('');
  const isTyping = visibleWordCount > 0 && visibleWordCount < words.length;

  return (
    <span ref={wrapperRef} className="paylow-faq-typer relative block text-ink-600 leading-relaxed text-[15px]">
      {/* Ghost — reserves the full answer's natural height. visibility
          hidden means it's not painted but layout (and accessibility)
          still see it. This is what prevents the layout from jumping
          as words type in. */}
      <span aria-hidden="true" className="invisible select-none whitespace-pre-wrap">
        {text}
      </span>

      {/* Visible typed text — absolute positioned over the ghost.
          inset-0 + identical font metrics means it lines up exactly. */}
      <span className="absolute inset-0 whitespace-pre-wrap">
        {visibleText}
        {isTyping && (
          <span
            aria-hidden="true"
            className="paylow-faq-caret inline-block w-[2px] h-[0.95em] bg-brand-500 ml-0.5 align-text-bottom"
          />
        )}
      </span>
    </span>
  );
}
