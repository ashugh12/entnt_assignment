import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getItem } from "../utils/localStorage.js";
import LogOut from "./LogOut.jsx";

function EntntHeader() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 bg-white shadow-sm fixed top-0 left-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-violet-500 tracking-wide">ENTNT</span>
      </div>
      <LogOut />
    </header>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleString();
}

// Dashboard page placeholder
export default function Dashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [topPatients, setTopPatients] = useState([]);
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    const allIncidents = getItem("incidents") || [];
    const allPatients = getItem("patients") || [];
    setPatients(allPatients);
    
    if (user?.role === "Admin") {
      // Next 10 appointments
      const nextAppointments = allIncidents
        .filter(i => new Date(i.appointmentDate) >= new Date())
        .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
        .slice(0, 10);
      setAppointments(nextAppointments);
      // Revenue
      setRevenue(allIncidents.reduce((sum, i) => sum + (i.cost || 0), 0));
      // Top patients by number of incidents
      const patientCounts = allIncidents.reduce((acc, i) => {
        acc[i.patientId] = (acc[i.patientId] || 0) + 1;
        return acc;
      }, {});
      const top = Object.entries(patientCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([pid]) => allPatients.find(p => p.id === pid)?.name || pid);
      setTopPatients(top);
    } else if (user?.role === "Patient") {
      // Get patient name
      const currentPatient = allPatients.find(p => p.id === user.patientId);
      setPatientName(currentPatient?.name || "Patient");
      
      // Only their own appointments
      const myAppointments = allIncidents
        .filter(i => i.patientId === user.patientId)
        .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
      setAppointments(myAppointments);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <EntntHeader />
      <div className="pt-28 px-2 md:px-0 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-[60px] font-bold text-gray-800 mb-2 text-center">
            {user.role === "Patient" ? patientName : "Welcome, Admin!"}
          </h1>
          {user.role === "Patient" && (
            <p className="text-xl text-gray-600 text-center">Welcome to your dashboard</p>
          )}
        </div>
        {user.role === "Admin" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-sky-400 to-sky-600 text-white p-4 rounded-lg shadow">
                <div className="font-bold text-lg mb-2">Next 10 Appointments</div>
                <div className="max-h-40 overflow-y-auto">
                  {appointments.length === 0 ? (
                    <p className="text-sky-100 text-sm">No upcoming appointments.</p>
                  ) : (
                    <ul className="space-y-1">
                      {appointments.map(a => (
                        <li key={a.id} className="bg-sky-400 bg-opacity-30 p-2 rounded text-sm">
                          <div className="font-semibold">{a.title}</div>
                          <div className="text-sky-100">
                            {a.appointmentDate.slice(0, 16).replace('T', ' ')}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-4 rounded-lg shadow">
                <div className="font-bold text-lg mb-2">Top Patients</div>
                <div className="max-h-40 overflow-y-auto">
                  {topPatients.length === 0 ? (
                    <p className="text-green-100 text-sm">No data available.</p>
                  ) : (
                    <ul className="space-y-1">
                      {topPatients.map((name, idx) => (
                        <li key={idx} className="text-center mt-2 font-bold text-lg bg-opacity-30 p-2 rounded">
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-4 rounded-lg shadow">
                <div className="font-bold text-lg mb-2">Total Revenue</div>
                <div className="text-3xl font-bold">${revenue}</div>
                <div className="text-yellow-100 text-sm">From all treatments</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="font-bold text-lg mb-3 text-gray-800">Patient Treatment Summary</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {patients.map(p => {
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
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-sky-500 to-sky-700 text-white p-4 rounded-lg shadow">
                <div className="font-bold text-lg mb-3">Your Upcoming Appointments</div>
                <div className="max-h-48 overflow-y-auto">
                  {appointments.filter(a => a.status !== "Completed").length === 0 ? (
                    <p className="text-sky-100 text-sm">No appointments scheduled.</p>
                  ) : (
                    <ul className="space-y-2">
                      {appointments.filter(a => a.status !== "Completed").map(a => (
                        <li key={a.id} className="bg-sky-400 bg-opacity-30 p-2 rounded">
                          <div className="font-semibold text-sm">{a.title}</div>
                          <div className="text-sky-100 text-xs">
                            {a.appointmentDate.slice(0, 16).replace('T', ' ')}
                          </div>
                          <div className="text-sky-200 text-xs mt-1">Status: {a.status}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-4 rounded-lg shadow">
                <div className="font-bold text-lg mb-3">Appointment History</div>
                <div className="max-h-48 overflow-y-auto">
                  {appointments.length === 0 ? (
                    <p className="text-green-100 text-sm">No appointment history.</p>
                  ) : (
                    <ul className="space-y-2">
                      {appointments.map(a => (
                        <li key={a.id} className="bg-green-400 bg-opacity-30 p-2 rounded">
                          <div className="font-semibold text-sm">{a.title}</div>
                          <div className="text-green-100 text-xs">
                            {a.appointmentDate.slice(0, 16).replace('T', ' ')}
                          </div>
                          <div className="text-green-200 text-xs mt-1">
                            Status: {a.status} • Cost: ${a.cost || 0}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 