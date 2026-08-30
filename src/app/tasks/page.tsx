import React from "react";
import { mockTasks } from "@/data";

export default function TasksPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Tasks & Operations Queue</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Filtered daily webinar, replay, and automation tasks.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 pb-2">
                <th className="py-2.5">Task Title</th>
                <th className="py-2.5">Client</th>
                <th className="py-2.5">Category</th>
                <th className="py-2.5">Priority</th>
                <th className="py-2.5">Owner</th>
                <th className="py-2.5">Due</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {mockTasks.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/40">
                  <td className="py-3 font-semibold text-slate-200">{t.title}</td>
                  <td className="py-3 font-bold text-indigo-300">{t.clientName}</td>
                  <td className="py-3 text-slate-400">{t.category}</td>
                  <td className="py-3 font-bold">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      t.priority === "P0" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                      t.priority === "P1" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                      "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3 text-slate-300">{t.owner}</td>
                  <td className="py-3 font-mono text-slate-400">{t.dueTime}</td>
                  <td className="py-3 font-semibold text-slate-200">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
