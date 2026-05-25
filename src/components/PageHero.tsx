import Image from 'next/image';

type PageHeroProps = {
  title: string;
  bg: string;
  eyebrow?: string;
  align?: 'left' | 'center';
};

export default function PageHero({ title, bg, eyebrow, align = 'left' }: PageHeroProps) {
  return (
    <section
      className="relative isolate text-white clip-wave-bottom"
      aria-labelledby="page-hero-title"
    >
      <div className="relative h-[320px] md:h-[420px] lg:h-[460px]">
        <Image
          src={bg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
          unoptimized
        />
        <span aria-hidden="true" className="absolute inset-0 bg-black/40 -z-10" />
        <div
          className={`container-wide h-full flex flex-col justify-center ${
            align === 'center' ? 'items-center text-center' : 'items-start'
          }`}
        >
          {eyebrow && (
            <h2 className="font-display font-semibold text-lg md:text-xl text-white mb-3 max-w-3xl">
              {eyebrow}
            </h2>
          )}
          <h1
            id="page-hero-title"
            className="font-display font-bold tracking-tight text-4xl md:text-5xl lg:text-[3.5rem] text-balance"
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
