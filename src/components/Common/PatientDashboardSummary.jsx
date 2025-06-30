import React, { useState, useEffect } from "react";
import { getItem } from "../../utils/localStorage";

export default function PatientDashboardSummary({ patientId }) {
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const allPatients = getItem("patients") || [];
    const allIncidents = getItem("incidents") || [];
    
    const currentPatient = allPatients.find(p => p.id === patientId);
    setPatientData(currentPatient);
    
    const patientAppointments = allIncidents
      .filter(i => i.patientId === patientId)
      .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
    setAppointments(patientAppointments);
  }, [patientId]);

  if (!patientData) return null;

  const getPatientStats = () => {
    const total = appointments.length;
    const completed = appointments.filter(a => a.status === "Completed").length;
    const upcoming = appointments.filter(a => a.status === "Scheduled").length;
    const totalCost = appointments.reduce((sum, a) => sum + (a.cost || 0), 0);
    
    return { total, completed, upcoming, totalCost };
  };

  const stats = getPatientStats();

  return (
    <div className="space-y-6">
      {/* Patient Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
          <div className="text-gray-600">Total Appointments</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
          <div className="text-gray-600">Upcoming</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-purple-600">${stats.totalCost}</div>
          <div className="text-gray-600">Total Spent</div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Appointments</h3>
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No appointments found</p>
        ) : (
          <div className="space-y-3">
            {appointments.slice(0, 5).map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(appointment.appointmentDate).toLocaleDateString()} at {new Date(appointment.appointmentDate).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      appointment.status === "Completed" ? "bg-green-100 text-green-800" :
                      appointment.status === "Scheduled" ? "bg-blue-100 text-blue-800" :
                      appointment.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {appointment.status}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">${appointment.cost || 0}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 