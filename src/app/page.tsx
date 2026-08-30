import React from "react";
import Link from "next/link";
import { mockTasks, mockClients, mockCommitments, mockTeamMembers, mockAlerts } from "@/data";
import { CheckCircle2, Flame, AlertOctagon, Layers, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  const p0Tasks = mockTasks.filter((t) => t.priority === "P0");
  const blockedTasks = mockTasks.filter((t) => t.status === "Blocked");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Manager Cockpit (Pawan)</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Real-time operations tracking across all 7 clients.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Tasks</p>
          <p className="text-2xl font-bold text-slate-100 mt-1">{mockTasks.length}</p>
        </div>
        <div className="bg-slate-900 border border-red-500/30 bg-red-950/10 p-4 rounded-xl">
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">P0 Critical</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{p0Tasks.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Blocked Issues</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{blockedTasks.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Clients Monitored</p>
          <p className="text-2xl font-bold text-indigo-400 mt-1">{mockClients.length}</p>
        </div>
      </div>

      {/* Attention Required */}
      <div className="bg-slate-900 border border-red-900/40 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-sm font-bold text-slate-200">Attention Required Immediately</h2>
          <span className="text-[10px] text-red-400 font-semibold">Intervention Queue</span>
        </div>
        <div className="space-y-2">
          {mockAlerts.map((alert) => (
            <div key={alert.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-indigo-300">[{alert.clientName}]</span>{" "}
                <span className="font-semibold text-slate-200">{alert.title}</span>
                <p className="text-slate-400 text-[11px] mt-0.5">{alert.description}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-indigo-400 font-medium">Owner: {alert.owner}</span>
                <p className="text-[10px] text-slate-500">{alert.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Webinars & Workload */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-bold text-slate-200 mb-3">Today&apos;s Webinar Broadcasts (Live & Simulive)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 pb-2">
                  <th className="py-2">Client</th>
                  <th className="py-2">Time</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Owner</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="py-2.5 font-bold text-indigo-300">Ritu</td>
                  <td className="py-2.5 font-mono">3:00 PM</td>
                  <td className="py-2.5">Simulive Replay</td>
                  <td className="py-2.5">Aditya</td>
                  <td className="py-2.5 text-emerald-400">Done</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-indigo-300">Ritu</td>
                  <td className="py-2.5 font-mono text-amber-400">7:00 PM</td>
                  <td className="py-2.5">Live Webinar</td>
                  <td className="py-2.5">Aditya</td>
                  <td className="py-2.5 text-amber-400">QA In Progress</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-indigo-300">Shruti</td>
                  <td className="py-2.5 font-mono">11:00 AM</td>
                  <td className="py-2.5">Live Webinar</td>
                  <td className="py-2.5">Khushwant</td>
                  <td className="py-2.5 text-emerald-400">Done</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-indigo-300">Suraj</td>
                  <td className="py-2.5 font-mono">7:00 PM</td>
                  <td className="py-2.5">Simulive QA</td>
                  <td className="py-2.5">Jatin</td>
                  <td className="py-2.5 text-slate-400">Pending</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-indigo-300">Vivek</td>
                  <td className="py-2.5 font-mono">7:00 PM</td>
                  <td className="py-2.5">Live Webinar</td>
                  <td className="py-2.5">Khushwant</td>
                  <td className="py-2.5 text-red-400">Link Blocked</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-bold text-slate-200 mb-3">Team Active Workload</h2>
          <div className="space-y-3">
            {mockTeamMembers
              .filter((m) => m.role !== "Sunday Operator")
              .map((member) => (
                <div key={member.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-slate-200">{member.name}</span>
                    <p className="text-[10px] text-slate-400">{member.role}</p>
                  </div>
                  <div className="flex gap-1 text-[10px] font-bold">
                    <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">P0: {member.mockStats.p0}</span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Tasks: {member.mockStats.todayTasks}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 7 Clients Status */}
      <div>
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
          Clients Directory (7 Priorities)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {mockClients.map((client) => (
            <div key={client.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  #{client.priorityOrder}
                </span>
                <span className={`text-[10px] font-bold ${
                  client.status === "Onboarding" ? "text-amber-400" :
                  client.status === "Blocked" ? "text-red-400" : "text-emerald-400"
                }`}>
                  {client.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-100 text-sm">{client.name}</h3>
              <div className="mt-2 pt-2 border-t border-slate-800 text-slate-400 space-y-1">
                <div>Primary: <span className="text-slate-200 font-medium">{client.primaryOwner}</span></div>
                <div>Backup: <span className="text-slate-300">{client.backupOwner}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
