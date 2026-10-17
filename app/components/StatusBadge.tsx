'use client';

import { useEffect, useState } from 'react';

type HealthStatus = 'loading' | 'ok' | 'down';

export default function StatusBadge() {
  const [status, setStatus] = useState<HealthStatus>('loading');
  const [latency, setLatency] = useState<number>(0);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        if (data.ok && data.supabase === 'reachable') {
          setStatus('ok');
          setLatency(data.latencyMs);
        } else {
          setStatus('down');
        }
      } catch {
        setStatus('down');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    loading: { text: 'Kontrollerar...', color: 'bg-[#5c5852]' },
    ok: { text: 'Allt funkar', color: 'bg-[#256f82]' },
    down: { text: 'Ej tillgänglig', color: 'bg-[#8b4513]' },
  };

  const config = statusConfig[status];

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d3cec6] rounded" data-ui>
      <span className={`w-2 h-2 rounded-full ${config.color}`} />
      <span className="text-[13px] text-[#0a0a0a]">
        {config.text}
        {status === 'ok' && ` (${latency}ms)`}
      </span>
    </div>
  );
}
