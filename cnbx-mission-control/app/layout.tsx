"use client";

import { useState } from "react";
import "./globals.css";
import Header from "@/components/shell/Header";
import Sidebar from "@/components/shell/Sidebar";
import { AppContext } from "@/lib/context";
import type { Context } from "@/lib/types";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [context, setContext] = useState<Context>("todo");

  return (
    <html lang="es" className="dark">
      <head>
        <title>CNBX Mission Control</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-surface-0 text-zinc-100 antialiased">
        <AppContext.Provider value={{ context, setContext }}>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
          </div>
        </AppContext.Provider>
      </body>
    </html>
  );
}
