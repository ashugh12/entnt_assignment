import React from "react";
import { getItem } from "../../utils/localStorage";

export default function PatientsSummary({ patients }) {
  // Safety check for undefined or null patients array
  const patientsList = patients || [];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="font-bold text-lg mb-3 text-gray-800">Patient Treatment Summary</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {patientsList.map(p => {
          const patientIncidents = (getItem("incidents") || []).filter(i => i.patientId === p.id);
          const completed = patientIncidents.filter(i => i.status === "Completed").length;
          const pending = patientIncidents.filter(i => i.status !== "Completed").length;
          return (
            <div key={p.id} className="border border-gray-200 p-3 rounded-lg hover:shadow-md transition-shadow">
              <div className="font-semibold text-gray-800 mb-1">{p.name}</div>
              <div className="text-sm text-gray-600">
                <span className="text-green-600 font-medium">{completed} completed</span>
                <span className="mx-2">•</span>
                <span className="text-yellow-600 font-medium">{pending} pending</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 