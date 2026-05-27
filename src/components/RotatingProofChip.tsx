'use client';

import { useEffect, useState } from 'react';
import {
  Award, MessageCircle, CheckCircle2, ShieldCheck,
  Sparkles, Users, Briefcase,
} from 'lucide-react';

/**
 * RotatingProofChip — a single calm chip that cycles through value
 * phrases with a subtle fade-up animation. Lives inside the hero,
 * directly under the H1, as quiet ongoing motion at the point of
 * highest visual attention.
 *
 * Design notes:
 *  - One chip, one phrase at a time (not a marquee). Premium, calm.
 *  - 2.8s per phrase. ~22s full cycle through 8 phrases.
 *  - 400ms fade-up animation between phrases (no harsh swap).
 *  - prefers-reduced-motion: stays on first phrase, no cycling.
 *  - Self-contained — keyframes inlined in this file, no globals.css
 *    changes required.
 *  - Static phrases complement (don't duplicate) the hero pill list.
 */

const phrases = [
  { Icon: Award,         text: 'Senior, qualified hires' },
  { Icon: MessageCircle, text: 'Fluent English' },
  { Icon: CheckCircle2,  text: 'No setup fees' },
  { Icon: CheckCircle2,  text: 'No recruitment fees' },
  { Icon: ShieldCheck,   text: 'No long contracts' },
  { Icon: Sparkles,      text: 'Cancel anytime' },
  { Icon: Users,         text: 'Compare 4 or 5 picks' },
  { Icon: Briefcase,     text: '30-day replacement' },
];

const INTERVAL_MS = 2800;

export default function RotatingProofChip() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const id = setInterval(() => {
      setIdx((cur) => (cur + 1) % phrases.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const current = phrases[idx];
  const Icon = current.Icon;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes paylow-chip-in {
              from { opacity: 0; transform: translateY(4px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .paylow-chip-in { animation: paylow-chip-in 400ms ease-out both; }
            @media (prefers-reduced-motion: reduce) {
              .paylow-chip-in { animation: none; }
            }
          `,
        }}
      />
      <div className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur border border-ink-100 px-3.5 py-2 shadow-soft">
        {/* key={idx} forces React to remount this span on every change,
            which re-triggers the CSS keyframe animation for the fade. */}
        <span key={idx} className="paylow-chip-in inline-flex items-center gap-2">
          <Icon className="w-4 h-4 text-brand-500 shrink-0" />
          <span className="text-sm font-semibold text-ink-800 whitespace-nowrap">
            {current.text}
          </span>
        </span>
      </div>
    </>
  );
}
