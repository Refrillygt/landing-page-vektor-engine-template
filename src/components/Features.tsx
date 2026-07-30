import React from 'react';
import { motion } from 'motion/react';
import { FeatureItem } from '../types';

export const Features: React.FC = () => {
  const featuresList: FeatureItem[] = [
    {
      id: 'f1',
      title: 'Sub-Millisecond Pipeline Ingestion',
      description: 'Zero-copy memory mapped queues deliver consistent p99 latencies under 400 microseconds even during peak network bursts.',
      iconName: 'zap',
      tag: 'LATENCY',
    },
    {
      id: 'f2',
      title: 'Deterministic State Replay',
      description: 'Audit and rebuild historical data streams with bit-identical precision using log-structured append-only storage.',
      iconName: 'database',
      tag: 'STORAGE',
    },
    {
      id: 'f3',
      title: 'Dynamic Cluster Rebalancing',
      description: 'Automatic shard reassignment without dropping sockets or forcing client re-connections when adding capacity.',
      iconName: 'layers',
      tag: 'ORCHESTRATION',
    },
    {
      id: 'f4',
      title: 'End-to-End TLS & Payload Encryption',
      description: 'AES-256 GCM encryption at rest and in transit with hardware Security Enclave key management.',
      iconName: 'shield',
      tag: 'SECURITY',
    },
    {
      id: 'f5',
      title: 'Adaptive Backpressure Control',
      description: 'Intelligent multi-tier pushback prevents cascading worker node crashes during sudden downstream database stalls.',
      iconName: 'cpu',
      tag: 'RESILIENCE',
    },
    {
      id: 'f6',
      title: 'Real-Time Telemetry & Tracing',
      description: 'Native OpenTelemetry exports to Grafana, Datadog, and Prometheus with microsecond span resolution.',
      iconName: 'activity',
      tag: 'OBSERVABILITY',
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'zap':
        return (
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        );
      case 'database':
        return (
          <>
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </>
        );
      case 'layers':
        return (
          <>
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </>
        );
      case 'shield':
        return (
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        );
      case 'cpu':
        return (
          <>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" />
            <line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" />
            <line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" />
            <line x1="20" y1="15" x2="23" y2="15" />
            <line x1="1" y1="9" x2="4" y2="9" />
            <line x1="1" y1="15" x2="4" y2="15" />
          </>
        );
      case 'activity':
      default:
        return (
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="features" className="py-24 bg-[#0A0A0C] relative border-t border-[#141622]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-[#5C6BC0] tracking-wider uppercase mb-3">
            ARCHITECTURAL ADVANTAGES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F4F8] tracking-tight mb-4">
            Built for mission-critical infrastructure where milliseconds equal revenue.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Vektor eliminates queue lockouts and memory garbage collection stalls by leveraging custom C++20 bindings over Linux epoll primitives.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuresList.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="bg-[#10121A] border border-[#1E202C] hover:border-[#383C52] rounded-xl p-6 transition-all duration-300 flex flex-col justify-between group"
              id={`feature-card-${feature.id}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#181A26] border border-[#272A3C] flex items-center justify-center text-[#5C6BC0] group-hover:text-white group-hover:bg-[#5C6BC0] transition-colors">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {getIcon(feature.iconName)}
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 bg-[#141622] px-2 py-0.5 rounded border border-[#1E202C]">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#F0F4F8] mb-2 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#181A26] flex items-center text-xs font-mono text-zinc-500 group-hover:text-[#5C6BC0] transition-colors gap-1">
                <span>EXPLORE DOCS</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
