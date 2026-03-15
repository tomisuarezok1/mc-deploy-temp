"use client";

import { useAppContext } from "A/lib/context";
import { cn } from "@/lib/utils";
import type { Context } from "@/lib/types";

const CONTEXTS: { id: Context; label: string; color?: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "personal", label: "Personal", color: "#0F6E56" },
  { id: "trabajo", label: "Trabajo", color: "#534AB7" },
  { id: "arquitex", label: "Arquitex", color: "#D4537E" },
  { id: "blackfin", label: "BlackFin", color: "#1D9E75" },
];

export default function ContextSwitcher() {
  const { context, setContext } = useAppContext();

  return (
    <div className="flex items-center gap-1 bg-surface-1 rounded-lg p-1">
      {CONTEXTS.map((ctx) => {
        const active = context === ctx.id;
        return (
          <button
            key={ctx.id}
            onClick={() => setContext(ctx.id)}
            className={cn(
              "px-3 py-1.5 rounded-md text-[13px] font-medium transition-all",
              active
                ? "bg-surface-3 text-zinc-100 shadow-sm"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-surface-2"
            )}
            style={
              active && ctx.color
                ? { borderBottom: `2px solid ${ctx.color}` }
                : undefined
            }
          >
            {ctx.label}
          </button>
        );
      })}
    </div>
  );
}
