'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, TrendingDown, Users, Minus, Plus } from 'lucide-react';
import GetStartedButton from './GetStartedButton';

type Cadence = 'hour' | 'week' | 'month' | 'year';

const CADENCES: { id: Cadence; label: string; short: string; mobile: string; multiplier: number }[] = [
  { id: 'hour',  label: 'Hourly',    short: '/hr', mobile: 'Hour',  multiplier: 1 },
  { id: 'week',  label: 'Per Week',  short: '/wk', mobile: 'Week',  multiplier: 40 },
  { id: 'month', label: 'Per Month', short: '/mo', mobile: 'Month', multiplier: 173 },
  { id: 'year',  label: 'Per Year',  short: '/yr', mobile: 'Year',  multiplier: 2080 },
];

const ONSHORE_RATE = 30;
const OFFSHORE_RATE = 7;

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function PricingCalculator() {
  const [cadence, setCadence] = useState<Cadence>('month');
  const [team, setTeam] = useState<number>(3);

  const cad = CADENCES.find((c) => c.id === cadence)!;
  const onshore = ONSHORE_RATE * cad.multiplier * team;
  const offshore = OFFSHORE_RATE * cad.multiplier * team;
  const savings = onshore - offshore;
  const savingsPct = Math.round((savings / onshore) * 100);

  const [animOnshore, setAnimOnshore] = useState(onshore);
  const [animOffshore, setAnimOffshore] = useState(offshore);
  const [animSavings, setAnimSavings] = useState(savings);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = { o: animOnshore, p: animOffshore, s: animSavings };
    const to = { o: onshore, p: offshore, s: savings };
    const start = performance.now();
    const dur = 600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const ease = 1 - Math.pow(1 - t, 3);
      setAnimOnshore(from.o + (to.o - from.o) * ease);
      setAnimOffshore(from.p + (to.p - from.p) * ease);
      setAnimSavings(from.s + (to.s - from.s) * ease);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onshore, offshore, savings]);

  const offshoreBarPct = Math.max(8, (offshore / Math.max(onshore, 1)) * 100);
  const sliderPct = useMemo(() => ((team - 1) / 49) * 100, [team]);

  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-x-4 -inset-y-6 -z-10 bg-mesh-2 opacity-40 rounded-[3rem] blur-2xl" />

      <div className="grid lg:grid-cols-12 gap-5 lg:gap-6">
        {/* ===== LEFT: Inputs ===== */}
        <div className="lg:col-span-5 card p-6 sm:p-7 self-start">
          <div>
            <label className="label-meta">Show me</label>
            <div
              role="tablist"
              aria-label="Billing period"
              className="mt-3 grid grid-cols-4 gap-1 rounded-full bg-ink-100/70 p-1"
            >
              {CADENCES.map((c) => {
                const active = c.id === cadence;
                return (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCadence(c.id)}
                    className={`relative rounded-full py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      active ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-500 hover:text-ink-800'
                    }`}
                  >
                    <span className="hidden sm:inline">{c.label}</span>
                    <span className="sm:hidden">{c.mobile}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between">
              <label htmlFor="team-size" className="label-meta">Team size</label>
              <div className="inline-flex items-baseline gap-1.5">
                <Users className="w-4 h-4 text-brand-500 self-center" />
                <span className="stat-number text-ink-900 text-lg">{team}</span>
                <span className="text-sm text-ink-500">{team === 1 ? 'person' : 'people'}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                aria-label="Decrease team size"
                onClick={() => setTeam((t) => Math.max(1, t - 1))}
                disabled={team <= 1}
                className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-ink-50 text-ink-700 hover:bg-ink-100 transition disabled:opacity-40"
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
                disabled={team >= 50}
                className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-ink-50 text-ink-700 hover:bg-ink-100 transition disabled:opacity-40"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-2 flex justify-between text-[10px] text-ink-400 px-0.5 tabular-nums">
              <span>1</span><span>10</span><span>25</span><span>50</span>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-ink-100 bg-white p-4">
              <div className="label-meta">Local rate</div>
              <div className="mt-1 stat-number text-ink-900 text-xl">
                ${ONSHORE_RATE}<span className="text-ink-400 text-sm font-medium ml-0.5">/hr</span>
              </div>
              <div className="text-[11px] text-ink-500 mt-1">US baseline</div>
            </div>
            <div className="rounded-2xl bg-gradient-brand-soft border border-brand-200 p-4 relative overflow-hidden">
              <div className="label-meta text-brand-700">PayLow</div>
              <div className="mt-1 stat-number text-ink-900 text-xl">
                ${OFFSHORE_RATE}<span className="text-ink-400 text-sm font-medium ml-0.5">/hr</span>
              </div>
              <div className="text-[11px] text-brand-700 mt-1 font-medium">All-in. No extras.</div>
            </div>
          </div>

          <p className="mt-5 text-[11px] text-ink-400 leading-relaxed">
            40 hrs/week assumed. Specialized roles can run higher. No payroll tax, recruitment fees, or lock-in contracts.
          </p>
        </div>

        {/* ===== RIGHT: Results ===== */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 text-white shadow-lift p-6 sm:p-8" data-reveal data-reveal-delay="80">
            <div aria-hidden className="absolute inset-0 bg-mesh-2 opacity-30 mix-blend-screen" />
            <div aria-hidden className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-brand-500/30 blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="label-meta text-white/55">Side by side</p>
                  <h3 className="font-display font-bold text-white text-xl sm:text-2xl mt-1 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                    {team} {team === 1 ? 'person' : 'people'} · {cad.label.replace('Per ', '')}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/85">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" /> Live
                </span>
              </div>

              <div className="mt-7 space-y-5">
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-white/65">Hiring locally</span>
                    <span className="stat-number text-white text-base sm:text-lg">
                      {fmt(animOnshore)}<span className="text-white/35 text-xs font-medium ml-1">{cad.short}</span>
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-white/35 transition-[width] duration-700 ease-out" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-white/65">With PayLow</span>
                    <span className="stat-number text-white text-base sm:text-lg">
                      {fmt(animOffshore)}<span className="text-white/35 text-xs font-medium ml-1">{cad.short}</span>
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-brand transition-[width] duration-700 ease-out"
                      style={{ width: `${offshoreBarPct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-7 border-t border-white/10">
                <div className="flex flex-wrap items-end justify-between gap-5">
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/15 border border-brand-500/20 px-2.5 py-1 text-[11px] font-bold text-brand-300 mb-3 tabular-nums">
                      <TrendingDown className="w-3 h-3" /> {savingsPct}% less
                    </div>
                    <div className="label-meta text-white/55 mb-2">You keep</div>
                    {/* numeric-xl: dedicated helper for huge numbers — prevents gradient-text
                        clipping/overlap that happens with extreme negative tracking. */}
                    <div className="numeric-xl text-gradient">
                      {fmt(animSavings)}
                    </div>
                    <p className="text-white/55 text-xs mt-3">{cad.label.toLowerCase()} · across {team} {team === 1 ? 'role' : 'roles'}</p>
                  </div>
                  <GetStartedButton size="lg" className="shrink-0">
                    Find my match <ArrowRight className="w-4 h-4" />
                  </GetStartedButton>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4" data-reveal data-reveal-delay="140">
            <div>
              <p className="label-meta">Annual savings</p>
              <p className="mt-1 stat-number text-ink-900 text-2xl">
                {fmt((ONSHORE_RATE - OFFSHORE_RATE) * 2080 * team)}
              </p>
              <p className="text-xs text-ink-500 mt-1">vs. hiring locally · same {team} {team === 1 ? 'role' : 'roles'}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[5, 10, 25].map((n) => (
                <button
                  key={n}
                  onClick={() => setTeam(n)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition tabular-nums ${
                    team === n ? 'bg-ink-900 text-white shadow-soft' : 'bg-ink-50 text-ink-700 hover:bg-ink-100'
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
