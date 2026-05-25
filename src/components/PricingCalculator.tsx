'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingDown, Users, Minus, Plus, Sparkles } from 'lucide-react';

type Cadence = 'hour' | 'week' | 'month' | 'year';

const CADENCES: { id: Cadence; label: string; short: string; multiplier: number }[] = [
  { id: 'hour',  label: 'Hourly',    short: '/hr',    multiplier: 1 },
  { id: 'week',  label: 'Per Week',  short: '/wk',    multiplier: 40 },
  { id: 'month', label: 'Per Month', short: '/mo',    multiplier: 173 },
  { id: 'year',  label: 'Per Year',  short: '/yr',    multiplier: 2080 },
];

const ONSHORE_RATE = 30;     // USD per hour, US baseline
const OFFSHORE_RATE = 7;     // PayLow rate

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function PricingCalculator() {
  const [cadence, setCadence] = useState<Cadence>('month');
  const [team, setTeam] = useState<number>(3);

  // Animated counter values
  const cad = CADENCES.find((c) => c.id === cadence)!;
  const onshore = ONSHORE_RATE * cad.multiplier * team;
  const offshore = OFFSHORE_RATE * cad.multiplier * team;
  const savings = onshore - offshore;
  const savingsPct = Math.round((savings / onshore) * 100);

  const [animOnshore, setAnimOnshore] = useState(onshore);
  const [animOffshore, setAnimOffshore] = useState(offshore);
  const [animSavings, setAnimSavings] = useState(savings);

  useEffect(() => {
    const from = { o: animOnshore, p: animOffshore, s: animSavings };
    const to = { o: onshore, p: offshore, s: savings };
    const start = performance.now();
    const dur = 700;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const ease = 1 - Math.pow(1 - t, 3);
      setAnimOnshore(from.o + (to.o - from.o) * ease);
      setAnimOffshore(from.p + (to.p - from.p) * ease);
      setAnimSavings(from.s + (to.s - from.s) * ease);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onshore, offshore, savings]);

  // Bar widths — PayLow bar relative to onshore (always shorter)
  const offshoreBarPct = Math.max(8, (offshore / Math.max(onshore, 1)) * 100);
  const sliderPct = useMemo(() => ((team - 1) / (50 - 1)) * 100, [team]);

  return (
    <div className="relative">
      {/* Decorative gradient backdrop */}
      <div aria-hidden className="absolute -inset-x-4 -inset-y-8 -z-10 bg-mesh-2 opacity-50 rounded-[3rem] blur-2xl" />

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        {/* ===== LEFT: Inputs ===== */}
        <div className="lg:col-span-5 card p-6 sm:p-8" data-reveal>
          {/* Cadence segmented control */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-ink-500">Billing</label>
              <span className="text-xs text-ink-400">{cad.label}</span>
            </div>
            <div role="tablist" aria-label="Billing cadence" className="grid grid-cols-4 gap-1 rounded-full bg-ink-100/70 p-1">
              {CADENCES.map((c) => {
                const active = c.id === cadence;
                return (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCadence(c.id)}
                    className={`relative rounded-full px-2 py-2 text-xs sm:text-sm font-medium transition-all duration-300 ease-out-expo ${
                      active ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-500 hover:text-ink-800'
                    }`}
                  >
                    <span className="hidden sm:inline">{c.label}</span>
                    <span className="sm:hidden">{c.label.replace('Per ', '')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Team-size slider */}
          <div className="mt-7">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="team-size" className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                Team size
              </label>
              <div className="inline-flex items-center gap-1.5 text-ink-700">
                <Users className="w-4 h-4 text-brand-500" />
                <span className="font-display font-bold text-lg text-ink-900 tabular-nums">{team}</span>
                <span className="text-sm">{team === 1 ? 'person' : 'people'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Decrease team size"
                onClick={() => setTeam((t) => Math.max(1, t - 1))}
                className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-ink-50 text-ink-700 hover:bg-ink-100 transition disabled:opacity-50"
                disabled={team <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                id="team-size"
                type="range"
                min={1}
                max={50}
                step={1}
                value={team}
                onChange={(e) => setTeam(Number(e.target.value))}
                className="range-brand flex-1"
                style={{ ['--val' as never]: `${sliderPct}%` } as React.CSSProperties}
                aria-valuenow={team}
                aria-valuemin={1}
                aria-valuemax={50}
              />
              <button
                type="button"
                aria-label="Increase team size"
                onClick={() => setTeam((t) => Math.min(50, t + 1))}
                className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-ink-50 text-ink-700 hover:bg-ink-100 transition disabled:opacity-50"
                disabled={team >= 50}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between text-xs text-ink-400 mt-2 px-1">
              <span>1</span><span>10</span><span>25</span><span>50</span>
            </div>
          </div>

          {/* Rate breakdown */}
          <div className="mt-7 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-ink-100 p-4">
              <div className="text-xs uppercase tracking-wider text-ink-400 font-semibold">Onshore</div>
              <div className="mt-1 font-display font-bold text-xl text-ink-900">${ONSHORE_RATE}<span className="text-ink-400 text-sm font-medium">/hr</span></div>
              <div className="text-xs text-ink-500 mt-0.5">US baseline</div>
            </div>
            <div className="rounded-2xl bg-gradient-warm border border-brand-200 p-4">
              <div className="text-xs uppercase tracking-wider text-brand-700 font-semibold">PayLow</div>
              <div className="mt-1 font-display font-bold text-xl text-ink-900">${OFFSHORE_RATE}<span className="text-ink-400 text-sm font-medium">/hr</span></div>
              <div className="text-xs text-brand-700 mt-0.5">Offshore talent</div>
            </div>
          </div>

          <p className="mt-5 text-xs text-ink-400 leading-relaxed">
            Estimates assume 40 hrs/week. Specialized roles may price differently. No payroll taxes, recruitment fees, or lock-in contracts.
          </p>
        </div>

        {/* ===== RIGHT: Results ===== */}
        <div className="lg:col-span-7 space-y-4">
          {/* Comparison bars */}
          <div className="card-dark relative overflow-hidden p-6 sm:p-8" data-reveal data-reveal-delay="80">
            <div aria-hidden className="absolute inset-0 bg-mesh-2 opacity-30 mix-blend-screen" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Cost comparison</p>
                  <h3 className="font-display font-bold text-white text-xl sm:text-2xl mt-1">
                    {team} {team === 1 ? 'person' : 'people'} · {cad.label}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
                  <Sparkles className="w-3 h-3 text-brand-300" /> Live
                </span>
              </div>

              {/* Bars */}
              <div className="mt-7 space-y-5">
                {/* Onshore */}
                <div>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-white/70">Onshore equivalent</span>
                    <span className="font-display font-semibold text-white tabular-nums">
                      {fmt(animOnshore)}<span className="text-white/40 text-xs ml-1">{cad.short}</span>
                    </span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-white/40 transition-all duration-700 ease-out-expo" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* PayLow */}
                <div>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-white/70">PayLow</span>
                    <span className="font-display font-semibold text-white tabular-nums">
                      {fmt(animOffshore)}<span className="text-white/40 text-xs ml-1">{cad.short}</span>
                    </span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-brand transition-all duration-700 ease-out-expo"
                      style={{ width: `${offshoreBarPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Big savings number */}
              <div className="mt-8 flex flex-wrap items-end justify-between gap-4 pt-6 border-t border-white/10">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-300 mb-2">
                    <TrendingDown className="w-3 h-3" /> You save
                  </div>
                  <div className="font-display font-bold text-white leading-none tabular-nums" style={{ fontSize: 'clamp(2.25rem, 6vw, 3.75rem)' }}>
                    {fmt(animSavings)}
                  </div>
                  <p className="text-white/60 text-sm mt-2">{cad.label.toLowerCase()} · {savingsPct}% lower than onshore</p>
                </div>
                <Link href="/contact-us" className="btn-primary btn-lg">
                  Lock in this rate <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Annual projection card (always shown for context) */}
          <div className="card p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4" data-reveal data-reveal-delay="160">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Annual savings</p>
              <p className="mt-1 font-display font-bold text-2xl text-ink-900 tabular-nums">
                {fmt((ONSHORE_RATE - OFFSHORE_RATE) * 2080 * team)}
              </p>
              <p className="text-sm text-ink-500 mt-0.5">vs. hiring locally · same {team} {team === 1 ? 'role' : 'roles'}</p>
            </div>
            <div className="flex gap-2">
              {[5, 10, 25].map((n) => (
                <button
                  key={n}
                  onClick={() => setTeam(n)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    team === n ? 'bg-ink-900 text-white' : 'bg-ink-50 text-ink-700 hover:bg-ink-100'
                  }`}
                >
                  {n} people
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
