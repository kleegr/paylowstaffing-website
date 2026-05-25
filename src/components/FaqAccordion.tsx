'use client';

import { useId, useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

export type FaqItem = { q: string; a: string };

export default function FaqAccordion({
  items,
  defaultOpen,
  searchable = false,
}: {
  items: FaqItem[];
  defaultOpen?: number;
  searchable?: boolean;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items;
    return items.filter(
      (i) => i.q.toLowerCase().includes(query) || i.a.toLowerCase().includes(query)
    );
  }, [items, q]);

  return (
    <div>
      {searchable && (
        <div className="relative mb-8 max-w-xl" data-reveal>
          <span className="pointer-events-none absolute inset-y-0 left-4 inline-flex items-center text-ink-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search FAQs…"
            className="w-full rounded-full bg-white border border-ink-200 pl-11 pr-4 py-3 text-sm text-ink-900 placeholder-ink-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 outline-none transition"
          />
        </div>
      )}

      <ul className="divide-y divide-ink-100 rounded-3xl bg-white border border-ink-100 shadow-card overflow-hidden">
        {filtered.map((item, i) => {
          const isOpen = open === i;
          const pid = `${baseId}-panel-${i}`;
          const bid = `${baseId}-btn-${i}`;
          return (
            <li key={item.q}>
              <h3>
                <button
                  id={bid}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={pid}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left flex items-start gap-4 px-6 py-5 transition-colors hover:bg-ink-50/60 group"
                >
                  <span className={`mt-0.5 shrink-0 inline-flex w-9 h-9 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-gradient-brand text-white shadow-glow-sm' : 'bg-ink-50 text-ink-700 group-hover:bg-ink-100'}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-500 ease-out-expo ${isOpen ? 'rotate-180' : ''}`} />
                  </span>
                  <span className={`flex-1 font-display font-semibold text-base md:text-lg leading-snug transition-colors ${isOpen ? 'text-ink-900' : 'text-ink-800'}`}>
                    {item.q}
                  </span>
                </button>
              </h3>
              <div
                id={pid}
                role="region"
                aria-labelledby={bid}
                className={`grid transition-all duration-500 ease-out-expo ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pl-[4.25rem] pb-6 text-ink-600 leading-relaxed text-sm md:text-[0.95rem]">{item.a}</p>
                </div>
              </div>
            </li>
          );
        })}

        {searchable && filtered.length === 0 && (
          <li className="px-6 py-10 text-center text-ink-500 text-sm">No matches. Try a different search.</li>
        )}
      </ul>
    </div>
  );
}
