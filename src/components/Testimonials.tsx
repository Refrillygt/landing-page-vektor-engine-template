import React, { useEffect, useRef } from 'react';
import * as animeModule from 'animejs';
import { TestimonialItem } from '../types';

const getAnime = (): any => {
  const mod = animeModule as any;
  if (typeof mod === 'function') return mod;
  if (typeof mod.default === 'function') return mod.default;
  if (mod.default && typeof mod.default.default === 'function') return mod.default.default;
  return mod;
};

export const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animeAnimRef = useRef<any>(null);

  const testimonials: TestimonialItem[] = [
    {
      id: 't1',
      quote:
        "Vektor handled our Black Friday ingress surge of 14 million events per minute without spiking memory allocation once. It replaced 18 Kafka worker nodes with 3 Vektor instances.",
      name: 'Dr. Marcus Vance',
      role: 'VP of Infrastructure',
      company: 'FinTech Global',
      initials: 'MV',
      metric: '82% Infrastructure Cost Savings',
    },
    {
      id: 't2',
      quote:
        "The deterministic state replay feature saved our compliance audit. We reconstructed 6 months of financial event streams bit-for-bit in less than 40 minutes.",
      name: 'Elena Rostova',
      role: 'Principal Systems Architect',
      company: 'ScalePay Inc.',
      initials: 'ER',
      metric: 'Deterministic Replay at 22GB/min',
    },
    {
      id: 't3',
      quote:
        "Migrating from RabbitMQ took 3 days. Our p99 streaming tail latencies dropped from 42ms down to 0.38ms across all microservices.",
      name: 'James Chen',
      role: 'Head of Core Platform',
      company: 'DataStream Engine',
      initials: 'JC',
      metric: '0.38ms p99 Tail Latency',
    },
    {
      id: 't4',
      quote:
        "Vektor’s adaptive backpressure control stopped a massive cascading failure during a cloud region outage. Best stream buffer engine on the market.",
      name: 'Sarah Lindqvist',
      role: 'Director of DevOps',
      company: 'Nexus Logistics',
      initials: 'SL',
      metric: 'Zero Packet Loss in Outage',
    },
    {
      id: 't5',
      quote:
        "We process real-time telemetry from over 40,000 IoT edge devices. Vektor’s zero-copy C++ architecture delivers uncompromised reliability.",
      name: 'Tariq Al-Mansoor',
      role: 'Chief Technology Officer',
      company: 'HyperGrid Systems',
      initials: 'TM',
      metric: '40k Connected Edge Nodes',
    },
  ];

  // Double array for continuous infinite marquee loop
  const marqueeItems = [...testimonials, ...testimonials];

  useEffect(() => {
    const anime = getAnime();
    if (!anime || typeof anime !== 'function') return;

    if (containerRef.current) {
      const track = containerRef.current;
      const totalWidth = track.scrollWidth / 2;

      animeAnimRef.current = anime({
        targets: track,
        translateX: [-totalWidth, 0],
        duration: 28000,
        easing: 'linear',
        loop: true,
      });
    }

    return () => {
      if (animeAnimRef.current && typeof animeAnimRef.current.pause === 'function') {
        animeAnimRef.current.pause();
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (animeAnimRef.current) {
      animeAnimRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (animeAnimRef.current) {
      animeAnimRef.current.play();
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0A0A0C] border-t border-[#141622] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-xs font-mono text-[#5C6BC0] tracking-wider uppercase mb-3">
          BATTLE-TESTED AT SCALE
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F4F8] tracking-tight mb-4">
          Trusted by infrastructure engineers who build low-latency systems.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl">
          Here is how lead platform teams use Vektor to run high-throughput event processing pipelines.
        </p>
      </div>

      {/* Marquee Carousel Wrapper */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left & Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0C] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0C] to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          className="flex gap-6 w-max py-2 px-4 cursor-grab active:cursor-grabbing"
        >
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[380px] sm:w-[420px] bg-[#10121A] border border-[#1E202C] rounded-xl p-6 flex flex-col justify-between shrink-0 hover:border-[#33374D] transition-colors"
              id={`testimonial-card-${item.id}-${index}`}
            >
              <div>
                <div className="inline-block font-mono text-xs font-semibold text-[#5C6BC0] bg-[#161826] border border-[#26293C] px-2.5 py-1 rounded mb-4">
                  {item.metric}
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#181A26]">
                <div className="w-10 h-10 rounded-full bg-[#1A1D2B] border border-[#2E3347] flex items-center justify-center font-mono text-xs font-bold text-zinc-200">
                  {item.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#F0F4F8]">{item.name}</div>
                  <div className="text-xs text-zinc-400 font-mono">
                    {item.role} • <span className="text-zinc-300">{item.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
