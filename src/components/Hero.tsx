import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import * as animeModule from 'animejs';

const getAnime = (): any => {
  const mod = animeModule as any;
  if (typeof mod === 'function') return mod;
  if (typeof mod.default === 'function') return mod.default;
  if (mod.default && typeof mod.default.default === 'function') return mod.default.default;
  return mod;
};

interface HeroProps {
  onStartTrial: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartTrial }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pulseBtnRef = useRef<HTMLButtonElement | null>(null);

  // Staggered words animation for headline
  const headlineWords = "Orchestrate real-time event streams at sub-millisecond precision.".split(" ");

  useEffect(() => {
    const anime = getAnime();
    if (!anime || typeof anime !== 'function') return;

    // Anime.js SVG Line Drawing on mount
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll('path, polyline, line, circle');
      const setDashoffset = anime.setDashoffset || (animeModule as any).setDashoffset;
      anime({
        targets: paths,
        strokeDashoffset: setDashoffset ? [setDashoffset, 0] : undefined,
        easing: 'easeInOutCubic',
        duration: 2200,
        delay: (_el: any, i: number) => i * 180,
      });
    }

    // Anime.js idle pulse on CTA button
    let pulseAnim: any = null;
    if (pulseBtnRef.current) {
      pulseAnim = anime({
        targets: pulseBtnRef.current,
        boxShadow: [
          '0 0 0 0 rgba(92, 107, 192, 0.4)',
          '0 0 0 12px rgba(92, 107, 192, 0)',
        ],
        easing: 'easeInOutQuad',
        duration: 2400,
        loop: true,
      });
    }

    return () => {
      if (pulseAnim && typeof pulseAnim.pause === 'function') {
        pulseAnim.pause();
      }
    };
  }, []);

  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center bg-[#0A0A0C] overflow-hidden"
    >
      {/* Background Subtle Grid & Accent Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1C2A_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#5C6BC0]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start bg-[#12141E] border border-[#222638] rounded-full px-3.5 py-1 mb-6 text-xs font-mono text-zinc-300"
            >
              <span className="w-2 h-2 rounded-full bg-[#5C6BC0]" />
              <span>Vektor v2.4 Engine Released</span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-400">99.999% SLA</span>
            </motion.div>

            {/* Staggered Word Reveal Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F0F4F8] tracking-tight leading-[1.1] mb-6">
              {headlineWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.1 + index * 0.05,
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                  className="inline-block mr-[0.28em]"
                >
                  {word === 'sub-millisecond' || word === 'real-time' ? (
                    <span className="text-[#5C6BC0]">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-lg sm:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed mb-8"
            >
              Distribute high-throughput event logs across distributed nodes with zero data loss. 
              Built for infrastructure engineers who demand deterministic latency and enterprise-grade reliability.
            </motion.p>

            {/* CTA Buttons Pair */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <motion.button
                ref={pulseBtnRef}
                whileTap={{ scale: 0.98 }}
                onClick={onStartTrial}
                className="bg-[#5C6BC0] hover:bg-[#4C5BA0] text-white font-medium px-6 py-3.5 rounded-lg text-base transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#5C6BC0]/20"
                id="hero-primary-cta"
              >
                <span>Start Free Trial</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>

              <a
                href="#features"
                onClick={scrollToFeatures}
                className="bg-[#12141E] hover:bg-[#181B2A] border border-[#222638] text-zinc-200 font-medium px-6 py-3.5 rounded-lg text-base transition-colors flex items-center justify-center gap-2 text-center"
                id="hero-secondary-cta"
              >
                <span>See How It Works</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-12 pt-8 border-t border-[#181A26] grid grid-cols-3 gap-6 max-w-lg"
            >
              <div>
                <div className="font-mono text-xl font-bold text-[#F0F4F8]">&lt; 0.4ms</div>
                <div className="text-xs text-zinc-500 font-medium">p99 Ingestion Latency</div>
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-[#F0F4F8]">10M+</div>
                <div className="text-xs text-zinc-500 font-medium">Events / Sec / Node</div>
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-[#F0F4F8]">99.999%</div>
                <div className="text-xs text-zinc-500 font-medium">Guaranteed Uptime</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Abstract Product UI Mockup with Anime.js Path Animation */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="bg-[#0D0E14] border border-[#1E2130] rounded-xl p-5 shadow-2xl relative overflow-hidden"
            >
              {/* Mock Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1A1D2B] mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#282B3C]" />
                  <span className="w-3 h-3 rounded-full bg-[#282B3C]" />
                  <span className="w-3 h-3 rounded-full bg-[#282B3C]" />
                </div>
                <span className="font-mono text-xs text-zinc-400">vektor-cluster-us-east.yaml</span>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>

              {/* Animated SVG Topology Diagram */}
              <div className="relative py-2 flex justify-center">
                <svg
                  ref={svgRef}
                  width="100%"
                  height="260"
                  viewBox="0 0 420 260"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="overflow-visible"
                >
                  {/* Grid background lines */}
                  <line x1="20" y1="40" x2="400" y2="40" stroke="#1A1C28" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="20" y1="130" x2="400" y2="130" stroke="#1A1C28" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="20" y1="220" x2="400" y2="220" stroke="#1A1C28" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Nodes */}
                  {/* Node 1: Ingest */}
                  <rect x="30" y="105" width="80" height="50" rx="6" fill="#131520" stroke="#2B2F44" strokeWidth="1.5" />
                  <text x="70" y="130" fill="#94A3B8" fontSize="11" fontFamily="monospace" textAnchor="middle">IN-GATE</text>
                  <text x="70" y="144" fill="#5C6BC0" fontSize="9" fontFamily="monospace" textAnchor="middle">1.2 GB/s</text>

                  {/* Node 2 & 3: Parallel Workers */}
                  <rect x="170" y="45" width="80" height="50" rx="6" fill="#131520" stroke="#2B2F44" strokeWidth="1.5" />
                  <text x="210" y="70" fill="#94A3B8" fontSize="11" fontFamily="monospace" textAnchor="middle">PIPE_ALPHA</text>
                  <text x="210" y="84" fill="#34D399" fontSize="9" fontFamily="monospace" textAnchor="middle">0.2ms</text>

                  <rect x="170" y="165" width="80" height="50" rx="6" fill="#131520" stroke="#2B2F44" strokeWidth="1.5" />
                  <text x="210" y="190" fill="#94A3B8" fontSize="11" fontFamily="monospace" textAnchor="middle">PIPE_BETA</text>
                  <text x="210" y="204" fill="#34D399" fontSize="9" fontFamily="monospace" textAnchor="middle">0.3ms</text>

                  {/* Node 4: Sink */}
                  <rect x="310" y="105" width="80" height="50" rx="6" fill="#131520" stroke="#5C6BC0" strokeWidth="1.5" />
                  <text x="350" y="130" fill="#F0F4F8" fontSize="11" fontFamily="monospace" textAnchor="middle font-bold">SINK_DB</text>
                  <text x="350" y="144" fill="#94A3B8" fontSize="9" fontFamily="monospace" textAnchor="middle">PERSISTED</text>

                  {/* Connecting Curved Paths (Animated by Anime.js) */}
                  <path d="M 110 130 C 140 130, 140 70, 170 70" stroke="#5C6BC0" strokeWidth="2" fill="none" />
                  <path d="M 110 130 C 140 130, 140 190, 170 190" stroke="#5C6BC0" strokeWidth="2" fill="none" />
                  <path d="M 250 70 C 280 70, 280 130, 310 130" stroke="#5C6BC0" strokeWidth="2" fill="none" />
                  <path d="M 250 190 C 280 190, 280 130, 310 130" stroke="#5C6BC0" strokeWidth="2" fill="none" />

                  {/* Pulsing Signal Dots */}
                  <circle cx="140" cy="100" r="3" fill="#5C6BC0" />
                  <circle cx="280" cy="100" r="3" fill="#34D399" />
                </svg>
              </div>

              {/* Console Output Bar */}
              <div className="bg-[#08090E] rounded-lg p-3 border border-[#161824] font-mono text-xs text-zinc-400 space-y-1">
                <div className="flex justify-between text-zinc-500 text-[11px]">
                  <span>STREAM_LOG</span>
                  <span>SYNCED</span>
                </div>
                <div className="text-emerald-400">✓ Partition #004 assigned [worker-az-1a]</div>
                <div className="text-zinc-300">↳ Processing batch #894210 (12,400 events)</div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
