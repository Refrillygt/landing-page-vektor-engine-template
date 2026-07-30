import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07080B] border-t border-[#141622] pt-16 pb-12 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#161824] border border-[#2D3142] flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-[#5C6BC0]"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <span className="font-semibold text-lg text-[#F0F4F8] tracking-wider">
                VEKTOR<span className="text-[#5C6BC0] font-normal">.IO</span>
              </span>
            </div>

            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              High-throughput event streaming engine engineered for low-latency systems. 
              Zero GC pauses, deterministic state replay, and sub-millisecond p99 execution.
            </p>

            {/* Social Icons (Inline SVG) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#10121A] border border-[#1E202C] hover:border-[#5C6BC0] hover:text-white flex items-center justify-center transition-colors text-zinc-400"
                aria-label="GitHub Repository"
                id="footer-github"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#10121A] border border-[#1E202C] hover:border-[#5C6BC0] hover:text-white flex items-center justify-center transition-colors text-zinc-400"
                aria-label="X Twitter"
                id="footer-x"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#10121A] border border-[#1E202C] hover:border-[#5C6BC0] hover:text-white flex items-center justify-center transition-colors text-zinc-400"
                aria-label="Discord Community"
                id="footer-discord"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#F0F4F8] uppercase tracking-wider">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">Core Engine</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Tiers</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Kafka Adapter</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Benchmarks</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Release Notes</a></li>
            </ul>
          </div>

          {/* Links Column 2: Resources & Company */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#F0F4F8] uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#faq" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Cluster Status</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Security Overview</a></li>
            </ul>
          </div>

          {/* Links Column 3: Legal & Security */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#F0F4F8] uppercase tracking-wider">Legal & Compliance</h4>
            <ul className="space-y-2">
              <li><a href="#faq" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Security Whitepaper</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">SOC2 Compliance</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Cookie Preferences</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-[#141622] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} Vektor Engine Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Clusters Operational</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
