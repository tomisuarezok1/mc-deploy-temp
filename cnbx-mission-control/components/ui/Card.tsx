"use client";

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  onClick?: () => void;
}

export default function Card({ children, className, borderColor, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-card bg-surface-2 border border-border p-4",
        "hover:border-border-hover hover:bg-surface-3",
        onClick && "cursor-pointer",
        className
      )}
      style={borderColor ? { borderColor: borderColor + "50" } : undefined}
    >
      {children}
    </div>
  );
}
