import React from "react";
import { mockCommitments } from "@/data";

export default function MonthlyPlanningPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Monthly Offer & Showcase Planning</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Audit 2 Silver Offers / Showcases quota per client.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 pb-2">
                <th className="py-2.5">Client</th>
                <th className="py-2.5">Requirement</th>
                <th className="py-2.5 text-center">Required</th>
                <th className="py-2.5 text-center">Planned</th>
                <th className="py-2.5">Execution Date</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {mockCommitments.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40">
                  <td className="py-3 font-bold text-slate-200">{c.clientName}</td>
                  <td className="py-3 text-indigo-300 font-medium">{c.requirement}</td>
                  <td className="py-3 text-center font-mono font-bold">{c.requiredCount}</td>
                  <td className="py-3 text-center font-mono">{c.plannedCount}</td>
                  <td className="py-3 font-mono text-slate-400">{c.executionDate}</td>
                  <td className="py-3 font-semibold text-amber-400">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
