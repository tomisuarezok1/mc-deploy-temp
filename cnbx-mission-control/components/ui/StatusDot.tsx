"use client";

import { getStatusColor } from "@/lib/utils";

export default function StatusDot({ status, size = "sm" }: { status: string; size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5";
  return <span className={`inline-block rounded-full ${sizeClass} ${getStatusColor(status)}`} />;
}
