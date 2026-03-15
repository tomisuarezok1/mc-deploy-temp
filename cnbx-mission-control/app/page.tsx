"use client";

import { useAppContext } from "A/lib/context";
import { filterAgents } from "@/lib/context";
import { AGENTS } from "@/lib/agents";
import { MOCK_ACTIVITY, MOCK_TASKS } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import AgentGrid from "@/components/agents/AgentGrid";
import ActivityFeed from "A/components/activity/ActivityFeed";
import Card from "@/components/ui/Card";
import { Users, MessageSquare, Coins, TrendingUp, Zap } from "lucide-react";

function StatItem({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-3">
        <Icon size={15} className="text-zinc-400" />
      </div>
      <div>
        <p className="text-[11px] text-zinc-500 uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-semibold text-zinc-100">{value}</span>
          {sub && <span className="text-[11px] text-zinc-500">{sub}</span>}
        </div>
      </div>
    </div>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
