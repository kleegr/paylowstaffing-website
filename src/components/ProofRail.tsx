import {
  ShieldCheck, Sparkles, MessageCircle, Clock, Users,
  Zap, CheckCircle2, Award,
} from 'lucide-react';

const proofs = [
  { Icon: ShieldCheck,   text: 'Vetted before you see them' },
  { Icon: Award,          text: 'Top 1-in-50 talent' },
  { Icon: MessageCircle,  text: 'Fluent English' },
  { Icon: Clock,          text: 'Your timezone' },
  { Icon: Users,          text: 'Compare 4 or 5 picks' },
  { Icon: Zap,            text: 'Hire in days' },
  { Icon: CheckCircle2,   text: 'No setup fees' },
  { Icon: ShieldCheck,    text: 'No long contracts' },
  { Icon: Sparkles,       text: 'Cancel anytime' },
  { Icon: CheckCircle2,   text: 'All-in pricing' },
];

/**
 * ProofRail — horizontal marquee of value statements that slides
 * continuously left, just below the hero. Adds quiet ongoing motion
 * so the page doesn't feel frozen once the user pauses to read.
 *
 * Implementation:
 *  - The track holds the chips DUPLICATED (twice).
 *  - CSS animation translates the track 0 → -50% (= the width of one
 *    set) over 50s, then loops. Because the second set is identical
 *    and follows the first with the same gap, the loop is seamless.
 *  - Edge gradient fades hide the cut-off chips at the container
 *    edges so the motion feels infinite.
 *  - prefers-reduced-motion: animation disabled, the track shows
 *    static chips.
 *  - Keyframes are declared inline (in a <style> tag inside the
 *    section), so this component is fully self-contained — no
 *    edits to globals.css required.
 */
export default function ProofRail() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes paylow-marquee {
              from { transform: translate3d(0, 0, 0); }
              to { transform: translate3d(-50%, 0, 0); }
            }
            .paylow-marquee-track {
              animation: paylow-marquee 50s linear infinite;
              will-change: transform;
            }
            @media (prefers-reduced-motion: reduce) {
              .paylow-marquee-track { animation: none; }
            }
          `,
        }}
      />
      <section
        aria-label="Why teams choose PayLow"
        className="relative py-7 bg-white border-y border-ink-100 overflow-hidden"
      >
        {/* Edge fades — mask the cut-off chips for an infinite feel */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-20 sm:w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-20 sm:w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"
        />

        {/* Track — chips duplicated for seamless loop */}
        <div className="paylow-marquee-track flex items-center gap-3 w-max">
          {[...proofs, ...proofs].map((p, i) => (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink-50/80 border border-ink-100 px-4 py-2 text-sm font-medium text-ink-700"
            >
              <p.Icon className="w-3.5 h-3.5 text-brand-500" />
              {p.text}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
