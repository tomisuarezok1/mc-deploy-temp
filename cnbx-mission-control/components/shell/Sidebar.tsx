"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: KanbanSquare },
  { href: "/team", label: "Team", icon: Users },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-surface-1 shrink-0 transition-all duration-200",
        collapsed ? "w-[52px]" : "w-[200px]"
      )}
    >
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium",
                active
                  ? "bg-surface-3 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-surface-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* Separator for future modules */}
        <div className="pt-3 pb-1 px-3">
          {!collapsed && (
            <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">
              M\u00f3dulos
            </span>
          )}
          {collapsed && <div className="h-px bg-border" />}
        </div>

        {/* Placeholder for dynamic modules */}
        <div className="px-3 py-2">
          {!collapsed && (
            <span className="text-[12px] text-zinc-600 italic">Pr\u00f3ximamente...</span>
          )}
        </div>
      </nav>

      <div className="border-t border-border p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-surface-2"
        >
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>
    </aside>
  );
}
