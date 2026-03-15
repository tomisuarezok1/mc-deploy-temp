"use client";

import { createContext, useContext } from "react";
import type { Context, Agent } from "./types";

export interface AppContextValue {
  context: Context;
  setContext: (ctx: Context) => void;
}

export const AppContext = createContext<AppContextValue>({
  context: "todo",
  setContext: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

export function filterAgents(agents: Agent[], context: Context): Agent[] {
  switch (context) {
    case "todo":
      return agents;
    case "personal":
      return agents.filter(a => a.workspace === "personal");
    case "trabajo":
      return agents.filter(a => a.workspace === "cnbx");
    case "arquitex":
      return agents.filter(a => a.workspace === "cnbx" && a.project === "arquitex");
    case "blackfin":
      return agents.filter(a => a.workspace === "cnbx" && a.project === "blackfin");
    default:
      return agents;
  }
}

export function filterByContext(items, context) {
  switch (context) {
    case "todo":
      return items;
    case "personal":
      return items.filter(i => i.workspace === "personal");
    case "trabajo":
      return items.filter(i => i.workspace === "cnbx");
    case "arquitex(º
      return items.filter(i => i.workspace === "cnbx" && i.project === "arquitex");
    case "blackfin":
      return items.filter(i => i.workspace === "cnbx" && i.project === "blackfin");
    default:
      return items;
  }
}
