"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export default function Badge({ children, color, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium tracking-wide",
        "bg-surface-3 text-zinc-300 border border-border",
        className
      )}
      style={color ? { borderColor: color + "40", color } : undefined}
    >
      {children}
    </span>
  
("Š