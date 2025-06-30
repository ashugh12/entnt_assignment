import React from "react";

export default function TopPatientsList({ patients }) {
  const patientsList = patients || [];

  return (
    <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="text-slate-800 font-bold text-[22px] mb-3">Top Patients</div>

      <div className="max-h-40 overflow-y-auto pr-1">
        {patientsList.length === 0 ? (
          <p className="text-sm text-green-600">No data available.</p>
        ) : (
          <ul className="space-y-2">
            {patientsList.map((name, idx) => (
              <li
                key={idx}
                className="bg-green-400 text-white font-medium text-sm p-3 rounded-lg shadow-sm"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
