'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import clsx from 'clsx';

export type FaqItem = { q: string; a: string };

export default function FaqAccordion({
  items,
  defaultOpen = 0,
  searchable = false,
}: {
  items: FaqItem[];
  defaultOpen?: number | null;
  searchable?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div>
      {searchable && (
        <div className="mb-7">
          <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs"
              className="w-full rounded-md border border-slate-200 bg-white pl-12 pr-4 py-3.5 text-sm text-ink-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
            />
          </div>
        </div>
      )}
      <div className="space-y-2.5">
        {filtered.length === 0 && <p className="text-center text-slate-500 py-8">No questions match that search.</p>}
        {filtered.map((item, i) => {
          const isOpen = open === i;
          const id = `faq-${i}`;
          return (
            <div
              key={i}
              className={clsx(
                'rounded transition-colors overflow-hidden',
                isOpen ? 'bg-brand-600 text-white' : 'bg-cream-100 hover:bg-cream-200/70'
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                id={`${id}-trigger`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5"
              >
                <span className={clsx('font-semibold text-base sm:text-lg', isOpen ? 'text-white' : 'text-ink-900')}>
                  {item.q}
                </span>
                <ChevronDown aria-hidden="true" className={clsx('w-5 h-5 shrink-0 transition-transform', isOpen ? 'text-white rotate-180' : 'text-ink-900')} />
              </button>
              <div
                id={`${id}-panel`}
                role="region"
                aria-labelledby={`${id}-trigger`}
                hidden={!isOpen}
                className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-white/95 leading-relaxed text-sm sm:text-base bg-brand-600"
              >
                {item.a}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
