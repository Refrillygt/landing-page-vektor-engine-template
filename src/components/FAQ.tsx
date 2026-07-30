import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaqItem } from '../types';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqItems: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'How does Vektor achieve sub-millisecond p99 latencies?',
      answer:
        'Vektor is engineered in C++20 with custom ring buffers and Linux kernel io_uring asynchronous sockets. By bypassing garbage collector pauses and unnecessary memory copies between kernel and user space, Vektor delivers predictable latency under 400 microseconds.',
    },
    {
      id: 'faq-2',
      question: 'Can Vektor integrate with existing Kafka or RabbitMQ pipelines?',
      answer:
        'Yes. Vektor provides drop-in source and sink connectors compatible with Apache Kafka wire protocol v2.8+, RabbitMQ AMQP 0-9-1, AWS Kinesis, and gRPC endpoints.',
    },
    {
      id: 'faq-3',
      question: 'How does annual vs monthly billing work with Stripe?',
      answer:
        'All subscription payments are processed securely via Stripe Checkout. Annual plans receive an immediate 20% discount applied to the billing cycle. You can switch plans or cancel at any time directly through your account dashboard.',
    },
    {
      id: 'faq-[#4]',
      question: 'What happens if a node in our cluster goes down?',
      answer:
        'Vektor features automated Raft-consensus leader election. If a node fails, standby worker instances claim partition assignments within 15 milliseconds without losing uncommitted log buffers.',
    },
    {
      id: 'faq-5',
      question: 'Is Vektor compliant with SOC2 and HIPAA requirements?',
      answer:
        'Yes. Vektor Pro and Enterprise deployments offer full SOC2 Type II compliance, HIPAA BAA agreements, end-to-end payload encryption at rest (AES-256), and dedicated single-tenant VPC peering.',
    },
    {
      id: 'faq-6',
      question: 'What happens if we exceed our monthly event allocation?',
      answer:
        'We never hard-throttle your streaming pipelines. If your volume exceeds your plan threshold, overage is calculated at $0.00008 per 1,000 events, or you will be prompted to upgrade to a higher tier.',
    },
    {
      id: 'faq-7',
      question: 'Can we run Vektor inside our own AWS/GCP cloud tenant?',
      answer:
        'Yes. Our Enterprise tier includes Kubernetes Helm charts and TerraForm modules to deploy Vektor clusters directly inside your private VPCs or hybrid cloud hardware.',
    },
  ];

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-[#0A0A0C] border-t border-[#141622]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-mono text-[#5C6BC0] tracking-wider uppercase mb-3">
            TECHNICAL FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F4F8] tracking-tight mb-4">
            Everything you need to know before migrating your data pipeline.
          </h2>
          <p className="text-zinc-400 text-base">
            Have questions about architecture, compliance, or custom deployments? We are here to help.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-[#10121A] border border-[#1E202C] hover:border-[#2D3142] rounded-xl overflow-hidden transition-colors"
                id={`faq-item-${item.id}`}
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-[#F0F4F8]">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-7 h-7 rounded-lg bg-[#181A26] border border-[#272A3C] flex items-center justify-center shrink-0 text-zinc-400"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-zinc-400 leading-relaxed border-t border-[#161824]/60">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
