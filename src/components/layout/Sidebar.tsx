"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Layers,
  Calendar,
  AlertTriangle,
  Radio,
  SunMedium,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Tasks Queue", href: "/tasks", icon: CheckSquare },
    { name: "Clients (7)", href: "/clients", icon: Users },
    { name: "Monthly Offers", href: "/monthly-planning", icon: Layers },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Alerts Desk", href: "/alerts", icon: AlertTriangle, badge: "3" },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 min-h-screen">
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
          <Radio className="w-4 h-4" />
        </div>
        <div>
          <h1 className="font-bold text-sm text-slate-100">Ops Command</h1>
          <p className="text-[11px] text-slate-400">Webinar Funnel HQ</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Operations
        </div>
        {links.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-500"}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-4 px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Special Roster
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <SunMedium className="w-4 h-4" />
            <span>Sunday Ops Team</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Yuvaj & Lalita</p>
          <p className="text-[10px] text-amber-400/80 mt-0.5 font-mono">Allocation: TBD</p>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-indigo-950 border border-indigo-800 flex items-center justify-center text-xs font-bold text-indigo-300">
            P
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-200">Pawan (Manager)</p>
            <p className="text-[10px] text-slate-400">9:30 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
