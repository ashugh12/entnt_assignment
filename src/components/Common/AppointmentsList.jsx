import React from "react";

export default function AppointmentsList({
  appointments,
  title,
  color = "blue",
  showStatus = true,
  showCost = false,
  filterFunction = null,
  maxHeight = "max-h-60",
  emptyMessage = "No appointments available."
}) {
  const filteredAppointments = filterFunction ? appointments.filter(filterFunction) : appointments;

  const colorMap = {
    blue: { border: "border-blue-500", bgLight: "bg-blue-50", bgSolid: "bg-blue-500" },
    teal: { border: "border-teal-500", bgLight: "bg-teal-50", bgSolid: "bg-teal-500" },
    emerald: { border: "border-emerald-500", bgLight: "bg-emerald-50", bgSolid: "bg-emerald-500" },
    indigo: { border: "border-indigo-500", bgLight: "bg-indigo-50", bgSolid: "bg-indigo-500" },
    cyan: { border: "border-cyan-500", bgLight: "bg-cyan-50", bgSolid: "bg-cyan-500" },
    slate: { border: "border-slate-500", bgLight: "bg-slate-50", bgSolid: "bg-slate-500" },
    sky: { border: "border-sky-500", bgLight: "bg-sky-50", bgSolid: "bg-sky-500" },
    green: { border: "border-green-500", bgLight: "bg-green-50", bgSolid: "bg-green-500" },
    purple: { border: "border-purple-500", bgLight: "bg-purple-50", bgSolid: "bg-purple-500" },
    yellow: { border: "border-yellow-500", bgLight: "bg-yellow-50", bgSolid: "bg-yellow-500" },
    red: { border: "border-red-500", bgLight: "bg-red-50", bgSolid: "bg-red-500" },
  };

  const selected = colorMap[color] || colorMap.green;

  return (
    <div className={`rounded-xl border-2 ${selected.border} ${selected.bgLight} p-4 shadow-sm hover:shadow-md transition`}>
      <h2 className="text-lg font-semibold mb-4 text-slate-800">{title}</h2>
      <div className={`${maxHeight} overflow-y-auto pr-1`}>
        {filteredAppointments.length === 0 ? (
          <p className="text-sm text-slate-500">{emptyMessage}</p>
        ) : (
          <ul className="space-y-2">
            {filteredAppointments.map((a) => (
              <li
                key={a.id}
                className={`rounded-lg ${selected.bgSolid} text-white p-3 shadow-sm`}
              >
                <div className="font-semibold">{a.title}</div>
                <div className="text-sm">{a.appointmentDate.slice(0, 16).replace("T", " ")}</div>
                {showStatus && (
                  <div className="text-xs mt-1 opacity-90">Status: {a.status}</div>
                )}
                {showCost && a.cost && (
                  <div className="text-xs mt-1 opacity-90">Cost: ${a.cost}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
