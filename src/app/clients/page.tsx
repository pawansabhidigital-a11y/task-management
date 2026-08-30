import React from "react";
import { mockClients } from "@/data";

export default function ClientsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Clients & SOPs (7 Clients)</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Priority order and ownership rules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockClients.map((client) => (
          <div key={client.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl text-xs space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="font-bold text-indigo-400">Priority #{client.priorityOrder}</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">{client.status}</span>
            </div>
            <h2 className="text-base font-bold text-slate-100">{client.name}</h2>
            <div className="grid grid-cols-2 gap-2 text-slate-400">
              <div>Primary: <strong className="text-slate-200">{client.primaryOwner}</strong></div>
              <div>Backup: <strong className="text-slate-200">{client.backupOwner}</strong></div>
            </div>
            <div className="pt-2 border-t border-slate-800 space-y-1">
              <p className="font-semibold text-slate-400 uppercase text-[10px]">Rules:</p>
              {client.operationalRules.map((rule, idx) => (
                <p key={idx} className="text-slate-300 text-[11px]">• {rule}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
