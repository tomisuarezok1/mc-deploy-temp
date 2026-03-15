"use client";

import type { ActivityEvent } from "@/lib/types";
import ActivityEventItem from "./ActivityEvent";
import { Activity } from "lucide-react";

interface ActivityFeedProps {
  events: ActivityEvent[];
  maxHeight?: string;
}

export default function ActivityFeed({ events, maxHeight = "100%" }: ActivityFeedProps) {
  return (
    <div className="rounded-card border border-border bg-surface-2 flex flex-col" style={{ maxHeight }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border shrink-0">
        <Activity size={14} className="text-zinc-500" />
        <h3 className="text-[13px] font-semibold text-zinc-300">Actividad</h3>
        <span className="text-[11px] text-zinc-600 ml-auto">En vivo</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-border/50">
        {events.length === 0 ? (
          <div className="p-6 text-center text-[13px] text-zinc-600">Sin actividad reciente</div>
        ) : (
          events.map((event) => <ActivityEventItem key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
}
