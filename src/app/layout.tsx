import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { AlertCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Webinar Operations Command Center",
  description: "Internal team operations command dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b border-slate-800 bg-slate-900/60 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Ops HQ
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> DEMO PROTOTYPE
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Live & Simulive Equal Workload Policy</span>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
