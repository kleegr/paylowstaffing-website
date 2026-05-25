import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import CtaBanner from '@/components/CtaBanner';
import { assets } from '@/lib/content';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about hiring virtual assistants with PayLow Staffing — pricing, billing, hiring process, contracts, support and more.',
};

const faqs: FaqItem[] = [
  {
    q: 'What is the starting pay for virtual assistants?',
    a: 'Our virtual assistants start at $7 an hour, offering affordable, high-quality support for various tasks, from administrative duties to specialized services.',
  },
  {
    q: 'How does the billing cycle work?',
    a: 'We operate on a weekly billing cycle, ensuring flexible payment terms. You’ll receive a weekly invoice for services rendered, allowing you to manage costs efficiently.',
  },
  {
    q: 'Are there any additional fees?',
    a: 'No, there are no additional or hidden fees. Our pricing is transparent, with no setup fees or extra charges.',
  },
  {
    q: 'What is the process for hiring a virtual assistant?',
    a: 'Hiring is easy. First, you’ll have an introductory consultation to discuss your needs. Then, we select candidates who meet your criteria. You’ll review profiles, conduct interviews, and choose the assistant who best fits your requirements.',
  },
  {
    q: 'What is the process for terminating a contract with a virtual assistant?',
    a: 'You can terminate a contract at any time without any required notice. If needed, we can help you find a replacement assistant quickly.',
  },
  {
    q: 'Are there any penalties for terminating a contract early?',
    a: 'No, there are no penalties for early termination. We provide flexible services that suit your needs, aiming to keep you satisfied without restrictive terms.',
  },
  {
    q: 'Can I change my virtual assistant if I’m not satisfied?',
    a: 'Yes, you can change your virtual assistant anytime. Our services offer flexibility without any time restrictions, allowing you to find the right fit.',
  },
  {
    q: 'How do I communicate with my virtual assistant?',
    a: 'You can communicate with your virtual assistant through methods that best suit you, such as email, messaging apps, or video calls. We ensure all assistants have access to reliable communication tools for seamless interaction.',
  },
  {
    q: 'What benefits do your virtual assistants receive?',
    a: 'Our virtual assistants receive fair wages, training, and access to a supportive work environment. We prioritize their well-being and growth, which reflects in the quality of service they provide to our clients.',
  },
  {
    q: 'Do you offer 24/7 support?',
    a: 'Yes, we offer round-the-clock support options. Whether you need assistance during regular business hours or require off-hours coverage, we can accommodate various time zones and schedules.',
  },
  {
    q: 'Can I customize the tasks assigned to my virtual assistant?',
    a: 'Absolutely! Our virtual assistants can be tailored to meet your unique needs, from administrative support to specialized tasks like bookkeeping, web development, or property management. Simply outline your requirements, and we’ll ensure they are handled effectively.',
  },
  {
    q: 'What happens if my virtual assistant is unavailable due to an emergency or leave?',
    a: 'In case of unexpected absences, we’ll provide coverage or a temporary assistant to ensure continuity in your tasks. We strive to keep your operations running smoothly without disruptions.',
  },
  {
    q: 'How do you ensure the confidentiality of my business information?',
    a: 'We prioritize data security and confidentiality. All our virtual assistants sign non-disclosure agreements (NDAs) to protect your business information, and we follow strict protocols for secure data handling.',
  },
  {
    q: 'Can I hire multiple virtual assistants?',
    a: 'Yes, you can hire multiple virtual assistants if your needs require it. We’ll work with you to find the best team to support your business functions, regardless of the size of your operation.',
  },
  {
    q: 'Do you provide any training or onboarding for virtual assistants?',
    a: 'Yes, we ensure that every virtual assistant receives essential training to align with your expectations and work processes. Additionally, we can coordinate specialized training to meet specific job requirements.',
  },
  {
    q: 'How long does it take to hire a virtual assistant?',
    a: 'The hiring process typically takes up to one week. We prioritize quick placements while ensuring you receive qualified candidates who match your needs.',
  },
];

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <PageHero
        title="Your Questions, Answered: PayLow Support Hub"
        bg={assets.faqHeroBg}
        align="center"
      />

      <section className="section bg-white">
        <div className="container-wide max-w-4xl">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-ink-900 mb-7">
            Frequently Asked Question!
          </h2>
          <FaqAccordion items={faqs} defaultOpen={0} searchable />
        </div>
      </section>

      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
