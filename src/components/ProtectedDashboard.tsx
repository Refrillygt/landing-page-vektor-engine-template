import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User } from '../types';

interface ProtectedDashboardProps {
  user: User;
  onLogout: () => void;
  onReturnToLanding: () => void;
}

export const ProtectedDashboard: React.FC<ProtectedDashboardProps> = ({
  user,
  onLogout,
  onReturnToLanding,
}) => {
  const [eventCount, setEventCount] = useState(14820940);
  const [rate, setRate] = useState(24500);
  const [copiedKey, setCopiedKey] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 800) + 2200;
      setEventCount((prev) => prev + delta);
      setRate(Math.floor(23500 + Math.random() * 2000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const apiKey = 'vk_live_89420bf9a012948210491823ab9f201e';

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-zinc-200 font-sans pt-20 pb-16">
      {/* Dashboard Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-[#181A26]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                PROTECTED CONSOLE SESSION
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F0F4F8]">
              Welcome back, {user.name}
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Account ID: {user.id} • Registered Email: {user.email}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToLanding}
              className="bg-[#10121A] hover:bg-[#161824] border border-[#222536] text-zinc-300 text-xs font-mono px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
              id="dashboard-landing-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Return to Public Landing</span>
            </button>
            <button
              onClick={onLogout}
              className="bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800 text-rose-200 text-xs font-mono px-4 py-2.5 rounded-lg transition-colors"
              id="dashboard-logout-btn"
            >
              Sign Out Session
            </button>
          </div>
        </div>

        {/* Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          
          {/* Main Cluster Telemetry Panel */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Real-time Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0F111A] border border-[#1E202C] rounded-xl p-5">
                <div className="text-xs font-mono text-zinc-400 mb-2">LIVE EVENT THROUGHPUT</div>
                <div className="text-2xl font-mono font-bold text-emerald-400">
                  {rate.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">ev/s</span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-1">p99 Latency: 0.34ms</div>
              </div>

              <div className="bg-[#0F111A] border border-[#1E202C] rounded-xl p-5">
                <div className="text-xs font-mono text-zinc-400 mb-2">TOTAL LOGGED EVENTS</div>
                <div className="text-2xl font-mono font-bold text-[#F0F4F8]">
                  {eventCount.toLocaleString()}
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-1">Buffer: 99.98% Free</div>
              </div>

              <div className="bg-[#0F111A] border border-[#1E202C] rounded-xl p-5">
                <div className="text-xs font-mono text-zinc-400 mb-2">ACTIVE SUBSCRIPTION</div>
                <div className="text-lg font-bold text-[#5C6BC0] truncate">
                  {user.plan || 'Pro Cluster'}
                </div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">Stripe Status: Active</div>
              </div>
            </div>

            {/* Cluster Nodes Visual Matrix */}
            <div className="bg-[#0F111A] border border-[#1E202C] rounded-xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#181A26] mb-4">
                <h3 className="text-base font-semibold text-[#F0F4F8] flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#5C6BC0]">
                    <rect x="2" y="2" width="20" height="8" rx="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                  <span>Primary Node Partition Matrix</span>
                </h3>
                <span className="text-xs font-mono bg-[#161824] border border-[#262A3C] text-zinc-300 px-2.5 py-1 rounded">
                  Region: us-east-1a
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'node-01', name: 'vektor-master-01', load: '18%', status: 'HEALTHY' },
                  { id: 'node-02', name: 'vektor-worker-02', load: '42%', status: 'HEALTHY' },
                  { id: 'node-03', name: 'vektor-worker-03', load: '39%', status: 'HEALTHY' },
                  { id: 'node-04', name: 'vektor-worker-04', load: '27%', status: 'HEALTHY' },
                ].map((node) => (
                  <div key={node.id} className="bg-[#0A0A0C] border border-[#181A26] p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs text-[#F0F4F8] font-semibold">{node.name}</div>
                      <div className="text-[11px] text-zinc-400 font-mono">CPU Load: {node.load}</div>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                      {node.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* API Key Manager */}
            <div className="bg-[#0F111A] border border-[#1E202C] rounded-xl p-6">
              <h3 className="text-base font-semibold text-[#F0F4F8] mb-2">Live Production API Secret Key</h3>
              <p className="text-xs text-zinc-400 mb-4">
                Use this token to authenticate SDK initialization calls on your backend server. Keep secret.
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={apiKey}
                  className="w-full bg-[#0A0A0C] border border-[#222536] rounded-lg px-3.5 py-2 font-mono text-xs text-zinc-300 focus:outline-none"
                />
                <button
                  onClick={copyApiKey}
                  className="bg-[#5C6BC0] hover:bg-[#4C5BA0] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors shrink-0"
                  id="dashboard-copy-key-btn"
                >
                  {copiedKey ? 'COPIED!' : 'COPY KEY'}
                </button>
              </div>
            </div>

          </div>

          {/* Sidebar Info Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Account Info */}
            <div className="bg-[#0F111A] border border-[#1E202C] rounded-xl p-6">
              <h3 className="text-base font-semibold text-[#F0F4F8] mb-4">Account Profile</h3>
              
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between py-2 border-b border-[#161824]">
                  <span className="text-zinc-400">AUTHENTICATION</span>
                  <span className="text-emerald-400">JWT HTTP-ONLY</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#161824]">
                  <span className="text-zinc-400">USER ROLE</span>
                  <span className="text-zinc-200">CLUSTER ADMIN</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#161824]">
                  <span className="text-zinc-400">ENCRYPTION</span>
                  <span className="text-zinc-200">AES-256 GCM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-zinc-400">SESSION EXPIRES</span>
                  <span className="text-zinc-200">IN 7 DAYS</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#0F111A] border border-[#1E202C] rounded-xl p-6">
              <h3 className="text-base font-semibold text-[#F0F4F8] mb-4">Quick Integration</h3>
              
              <div className="space-y-2">
                <div className="bg-[#0A0A0C] border border-[#181A26] rounded-lg p-3 text-xs font-mono">
                  <div className="text-zinc-400 mb-1"># Install Vektor Node SDK</div>
                  <div className="text-[#5C6BC0]">npm install @vektor/client-node</div>
                </div>
                
                <div className="bg-[#0A0A0C] border border-[#181A26] rounded-lg p-3 text-xs font-mono">
                  <div className="text-zinc-400 mb-1"># Go SDK</div>
                  <div className="text-[#5C6BC0]">go get github.com/vektor/client-go</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
