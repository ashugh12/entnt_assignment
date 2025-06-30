import React, { useState, useEffect } from "react";
import { getItem, setItem } from "../utils/localStorage.js";

export default function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(getItem("patients") || []);
  }, []);

  // Add, Edit, Delete logic would go here

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Patients</h2>
      <ul>
        {patients.map(p => (
          <li key={p.id} className="mb-2">
            <strong>{p.name}</strong> ({p.dob}) - {p.contact}
          </li>
        ))}
      </ul>
      {/* Add/Edit/Delete UI here */}
    </div>
  );
} 