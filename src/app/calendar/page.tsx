import React from "react";

export default function CalendarPage() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Weekly Operations Schedule</h1>
        <p className="text-xs text-slate-400 mt-0.5">Recurring sessions and broadcast roster.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {days.map((day) => (
          <div key={day} className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs space-y-2">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-1">{day}</h3>
            {day === "Sunday" && <p className="text-amber-400 font-medium">Sunday Ops Team (TBD)</p>}
            {day === "Monday" && <p className="text-indigo-300 font-medium">Sanghamitra - Orientation</p>}
            {day === "Tuesday" && <p className="text-indigo-300 font-medium">Shruti - 7 PM Session</p>}
            {day === "Friday" && <p className="text-indigo-300 font-medium">Vivek - Inner Circle Msg</p>}
            <p className="text-slate-400 text-[11px]">Daily: Ritu (3P/7P), Shruti (11A/4P), Vivek (7P)</p>
          </div>
        ))}
      </div>
    </div>
  );
}
