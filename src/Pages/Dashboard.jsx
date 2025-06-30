import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getItem } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import StatsCard from "../components/Common/StatsCard";
import AppointmentsList from "../components/Common/AppointmentsList";
import PatientsSummary from "../components/Common/PatientsSummary";
import TopPatientsList from "../components/Common/TopPatientsList";
import { Calendar, Users, DollarSign } from "lucide-react";

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleString();
}

// Dashboard page placeholder
export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
    <div className="w-full max-w-7xl mx-auto px-4 py-8 ">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-2 text-center">
          {user.role === "Patient" ? patientName : "Welcome, Admin!"}
        </h1>
        {user.role === "Patient" && (
          <p className="text-lg md:text-xl text-slate-500 text-center">
            Welcome to your dashboard
          </p>
        )}
      </div>


      {user.role === "Admin" ? (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <StatsCard
              title="Next 10 Appointments"
              value={appointments.length}
              subtitle="Upcoming"
              color="sky"
              icon={Calendar}
            />
            <StatsCard
              title="Top Patients"
              value={topPatients.length}
              subtitle="Most Active"
              color="green"
              icon={Users}
            />
            <StatsCard
              title="Total Revenue"
              value={`$${revenue}`}
              subtitle="From all treatments"
              color="yellow"
              icon={DollarSign}
            />
          </div>


          {/* Appointments List */}
          <AppointmentsList
            appointments={appointments}
            title="Upcoming Appointments"
            emptyMessage="No upcoming appointments."
            color="sky"
          />

          {/* Top Patients List */}
          <TopPatientsList patients={topPatients} />

          {/* Patients Summary */}
          <PatientsSummary patients={patients} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AppointmentsList
              appointments={(appointments || []).filter(a => a.status !== "Completed")}
              title="Your Upcoming Appointments"
              emptyMessage="No appointments scheduled."
              color="sky"
            />
            <AppointmentsList
              appointments={appointments || []}
              title="Appointment History"
              emptyMessage="No appointment history."
              color="green"
              showCost={true}
            />
          </div>
        </div>
      )}
    </div>
  );
} 