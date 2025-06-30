import React, { useState, useEffect } from "react";
import { getItem } from "../utils/localStorage.js";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    setIncidents(getItem("incidents") || []);
  }, []);

  // Add, Edit, Delete logic would go here

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Incidents/Appointments</h2>
      <ul>
        {incidents.map(i => (
          <li key={i.id} className="mb-2">
            <strong>{i.title}</strong> ({i.appointmentDate}) - {i.status}
          </li>
        ))}
      </ul>
      {/* Add/Edit/Delete UI here */}
    </div>
  );
} 