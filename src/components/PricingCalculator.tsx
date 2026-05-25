'use client';

import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

type RateKey = 'hourly' | 'week' | 'month' | 'year';

const RATES: { key: RateKey; label: string; multiplier: number; unitLabel: string }[] = [
  { key: 'hourly', label: 'Hourly', multiplier: 1, unitLabel: 'Hourly' },
  { key: 'week', label: 'Per Week', multiplier: 40, unitLabel: 'Per Week' },
  { key: 'month', label: 'Per Month', multiplier: 173, unitLabel: 'Per Month' },
  { key: 'year', label: 'Per Year', multiplier: 2080, unitLabel: 'Per Year' },
];

const ONSHORE_RATE = 30;
const OFFSHORE_RATE = 7;

const money = (n: number) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function PricingCalculator() {
  const [rate, setRate] = useState<RateKey>('hourly');
  const [employees, setEmployees] = useState(1);
  const [openSummary, setOpenSummary] = useState(true);

  const active = RATES.find((r) => r.key === rate)!;

  const summary = useMemo(() => {
    const onshore = ONSHORE_RATE * employees * active.multiplier;
    const offshore = OFFSHORE_RATE * employees * active.multiplier;
    const savings = onshore - offshore;
    return { onshore, offshore, savings };
  }, [active.multiplier, employees]);

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
      <div className="card p-6 sm:p-8">
        <fieldset>
          <legend className="block text-base font-semibold text-ink-900 mb-4">Rates</legend>
          <div className="space-y-3">
            {RATES.map((r) => (
              <label
                key={r.key}
                className={clsx(
                  'flex items-center gap-3 cursor-pointer rounded-md p-2 -mx-2 hover:bg-cream-50',
                  rate === r.key && 'bg-cream-100'
                )}
              >
                <input
                  type="radio"
                  name="rate"
                  value={r.key}
                  checked={rate === r.key}
                  onChange={() => setRate(r.key)}
                  className="appearance-none w-5 h-5 rounded-full border-2 border-slate-300 checked:border-brand-600 relative before:absolute before:inset-1 before:rounded-full before:bg-brand-600 before:scale-0 checked:before:scale-100 before:transition-transform cursor-pointer"
                />
                <span className="text-base font-medium text-ink-900">{r.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <label htmlFor="employees" className="text-base font-semibold text-ink-900">Employees</label>
            <output htmlFor="employees" className="text-lg font-display font-bold text-brand-700">{employees}</output>
          </div>
          <input
            id="employees"
            type="range"
            min={1}
            max={50}
            step={1}
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            className="range-orange"
            aria-valuemin={1}
            aria-valuemax={50}
            aria-valuenow={employees}
          />
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>1</span><span>50</span>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <button
          type="button"
          onClick={() => setOpenSummary((p) => !p)}
          className="w-full flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-slate-100"
          aria-expanded={openSummary}
          aria-controls="pricing-summary-body"
        >
          <span className="text-lg font-display font-bold text-ink-900">Total Summary</span>
          <ChevronDown aria-hidden="true" className={clsx('w-5 h-5 text-slate-500 transition-transform', openSummary && 'rotate-180')} />
        </button>

        <div id="pricing-summary-body" hidden={!openSummary} className="px-6 sm:px-8 py-6" role="region" aria-live="polite">
          <div className="grid grid-cols-2 text-sm font-semibold text-slate-500 pb-3 border-b border-slate-100">
            <span>Name</span>
            <span className="text-right">Total</span>
          </div>
          <div className="grid grid-cols-2 items-center py-3 text-sm border-b border-slate-100">
            <span className="text-slate-700">Rates</span>
            <span className="text-right text-ink-900 font-medium">{active.unitLabel}</span>
          </div>
          <div className="grid grid-cols-2 items-center py-3 text-sm border-b border-slate-100">
            <span className="text-slate-700">Employees</span>
            <span className="text-right text-ink-900 font-medium">{employees}</span>
          </div>
          <div className="grid grid-cols-2 items-center py-3 text-sm border-b border-slate-100">
            <span className="text-slate-500">{employees} × {active.multiplier}</span>
            <span className="text-right text-slate-500 font-mono">{(employees * active.multiplier).toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 items-center py-3 text-base border-b border-slate-100">
            <span className="text-ink-900 font-semibold">Onshore Employee Cost</span>
            <span className="text-right text-ink-900 font-display font-bold">{money(summary.onshore)}</span>
          </div>
          <div className="grid grid-cols-2 items-center py-3 text-base border-b border-slate-100">
            <span className="text-ink-900 font-semibold">Offshore Employee Cost</span>
            <span className="text-right text-ink-900 font-display font-bold">{money(summary.offshore)}</span>
          </div>
          <div className="grid grid-cols-2 items-center py-4 mt-1 rounded-md bg-brand-50 px-3">
            <span className="text-brand-800 font-semibold">Total Savings</span>
            <span className="text-right text-brand-700 font-display font-bold text-lg">{money(summary.savings)}</span>
          </div>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            Onshore rate: ${ONSHORE_RATE.toFixed(2)}/hr (US average). Offshore rate: ${OFFSHORE_RATE.toFixed(2)}/hr (PayLow flat rate). Multipliers — Per Week: 40 hrs, Per Month: 173 hrs, Per Year: 2,080 hrs. High-skilled roles may be slightly higher.
          </p>
        </div>
      </div>
    </div>
  );
}
