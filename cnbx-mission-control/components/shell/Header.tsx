"use client";

import { Wifi, WifiOff } from "lucide-react";
import ContextSwitcher from "./ContextSwitcher";

export default function Header() {
  const connected = true; // Mock — will be real with WebSocket

  return (
    <header className="h-14 border-b border-border bg-surface-1 flex items-center justify-between px-5 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold tracking-tight text-zinc-100">CNBX</span>
          <span className="text-[13px] text-zinc-500 font-medium">Mission Control</span>
        </div>
        <ContextSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-zinc-500 text-[13px] hover:border-border-hover hover:text-zinc-300">
          <span className="text-[11px] text-zinc-600 font-mono">⌘K</span>
          <span>Buscar</span>
        </button>

        <div className="flex items-center gap-2">
          {connected ? (
            <Wifi size={14} className="text-emerald-400" />
          ) : (
            <WifiOff size={14} className="text-red-400" />
          )}
          <span className={`text-[11px] font-medium ${connected ? "text-emerald-400" : "text-red-400"}`}>
            {connected ? "Gateway" : "Offline"}
          </span>
        </div>
      </div>
    </header>
  );
}
