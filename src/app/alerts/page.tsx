import React from "react";
import { mockAlerts } from "@/data";

export default function AlertsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Operational Alerts Desk</h1>
        <p className="text-xs text-slate-400 mt-0.5">Live emergency alerts and unplanned quotas.</p>
      </div>

      <div className="space-y-3">
        {mockAlerts.map((a) => (
          <div key={a.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-indigo-300">[{a.clientName}] {a.title}</span>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">{a.type}</span>
            </div>
            <p className="text-slate-300">{a.description}</p>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-amber-300">
              Action: {a.actionRequired}
            </div>
            <div className="text-right text-[10px] text-slate-500">
              Owner: {a.owner} | {a.createdAt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
