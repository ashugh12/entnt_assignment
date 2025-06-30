import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getItem } from "../utils/localStorage";
import LogOut from "./LogOut";

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

export default function PatientView() {
  const { user } = useAuth();
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (user?.role === "Patient" && user?.patientId) {
      const allPatients = getItem("patients") || [];
      const allIncidents = getItem("incidents") || [];
      
      // Get patient data
      const currentPatient = allPatients.find(p => p.id === user.patientId);
      setPatientData(currentPatient);
      
      // Get patient's appointments
      const patientAppointments = allIncidents
        .filter(i => i.patientId === user.patientId)
        .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
      setAppointments(patientAppointments);
    }
  }, [user]);

  const openDetailsModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      "Scheduled": "bg-blue-100 text-blue-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      "Completed": "bg-green-100 text-green-800",
      "Cancelled": "bg-red-100 text-red-800"
    };
    return colors[status] || colors["Scheduled"];
  };

  const getPatientStats = () => {
    const total = appointments.length;
    const completed = appointments.filter(a => a.status === "Completed").length;
    const upcoming = appointments.filter(a => a.status === "Scheduled").length;
    const inProgress = appointments.filter(a => a.status === "In Progress").length;
    const totalCost = appointments.reduce((sum, a) => sum + (a.cost || 0), 0);
    
    return { total, completed, upcoming, inProgress, totalCost };
  };

  const stats = getPatientStats();

  if (!user || user.role !== "Patient") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600">This page is only accessible to patients.</p>
        </div>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h1>
          <p className="text-gray-600">Please wait while we load your data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EntntHeader />
      <div className="pt-28 px-2 md:px-0 w-full max-w-7xl mx-auto">
        {/* Patient Header */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-[60px] font-bold text-gray-800 mb-2 text-center">
            Welcome, {patientData.name}!
          </h1>
          <p className="text-xl text-gray-600 text-center">Your dental care dashboard</p>
        </div>

        {/* Patient Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
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
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
            <div className="text-gray-600">In Progress</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">${stats.totalCost}</div>
            <div className="text-gray-600">Total Spent</div>
          </div>
        </div>

        {/* Patient Information Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <p className="text-gray-900">{patientData.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <p className="text-gray-900">{new Date(patientData.dob).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <p className="text-gray-900">{patientData.contact}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Health Information</label>
              <p className="text-gray-900">{patientData.healthInfo || "No health information recorded"}</p>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Your Appointments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Appointment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{appointment.title}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {appointment.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(appointment.appointmentDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(appointment.appointmentDate).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${appointment.cost || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openDetailsModal(appointment)}
                          className="text-violet-600 hover:text-violet-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Appointment Details Modal */}
      {showDetailsModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Appointment Details</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <p className="text-gray-900">{selectedAppointment.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                    {selectedAppointment.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-900">{selectedAppointment.description || "No description provided"}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                <p className="text-gray-900">{selectedAppointment.comments || "No comments"}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date & Time</label>
                  <p className="text-gray-900">
                    {new Date(selectedAppointment.appointmentDate).toLocaleDateString()} at {new Date(selectedAppointment.appointmentDate).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                  <p className="text-gray-900">${selectedAppointment.cost || 0}</p>
                </div>
              </div>

              {selectedAppointment.nextDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Next Appointment</label>
                  <p className="text-gray-900">
                    {new Date(selectedAppointment.nextDate).toLocaleDateString()} at {new Date(selectedAppointment.nextDate).toLocaleTimeString()}
                  </p>
                </div>
              )}

              {selectedAppointment.treatment && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Notes</label>
                  <p className="text-gray-900">{selectedAppointment.treatment}</p>
                </div>
              )}

              {selectedAppointment.files && selectedAppointment.files.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attached Files</label>
                  <div className="space-y-2">
                    {selectedAppointment.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-500">
                            ({file.name.split('.').pop().toUpperCase()})
                          </span>
                        </div>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-600 hover:text-violet-800 text-sm font-medium"
                        >
                          View File
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedAppointment(null);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 