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

export default function MyProfile() {
  const { user } = useAuth();
  const [patientData, setPatientData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contact: "",
    healthInfo: ""
  });

  useEffect(() => {
    if (user?.role === "Patient" && user?.patientId) {
      const allPatients = getItem("patients") || [];
      const currentPatient = allPatients.find(p => p.id === user.patientId);
      setPatientData(currentPatient);
      
      if (currentPatient) {
        setFormData({
          name: currentPatient.name,
          dob: currentPatient.dob,
          contact: currentPatient.contact,
          healthInfo: currentPatient.healthInfo || ""
        });
      }
    }
  }, [user]);

  const handleUpdateProfile = () => {
    if (user?.role === "Patient" && user?.patientId) {
      const allPatients = getItem("patients") || [];
      const updatedPatients = allPatients.map(p => 
        p.id === user.patientId ? { ...p, ...formData } : p
      );
      setItem("patients", updatedPatients);
      setPatientData({ ...patientData, ...formData });
      setShowEditModal(false);
    }
  };

  const getRoleDisplayName = (role) => {
    return role === "Admin" ? "Dentist/Administrator" : "Patient";
  };

  const getRoleDescription = (role) => {
    return role === "Admin" 
      ? "You have full access to manage patients, appointments, and dental center operations."
      : "You can view your appointments, treatment history, and personal information.";
  };

  const getRoleIcon = (role) => {
    return role === "Admin" ? "👨‍⚕️" : "👤";
  };

  const getPatientStats = () => {
    if (user?.role !== "Patient" || !user?.patientId) return null;
    
    const allIncidents = getItem("incidents") || [];
    const patientAppointments = allIncidents.filter(i => i.patientId === user.patientId);
    
    const total = patientAppointments.length;
    const completed = patientAppointments.filter(a => a.status === "Completed").length;
    const upcoming = patientAppointments.filter(a => a.status === "Scheduled").length;
    const totalCost = patientAppointments.reduce((sum, a) => sum + (a.cost || 0), 0);
    
    return { total, completed, upcoming, totalCost };
  };

  const stats = getPatientStats();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <EntntHeader />
      <div className="pt-28 px-2 md:px-0 w-full max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">{getRoleIcon(user.role)}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            My Profile
          </h1>
          <p className="text-gray-600 text-center">Manage your account and personal information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-violet-600">🔐</span>
                Account Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Role</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{getRoleDisplayName(user.role)}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role Description</label>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{getRoleDescription(user.role)}</p>
                </div>
              </div>
            </div>

            {/* Personal Information (Patient Only) */}
            {user.role === "Patient" && patientData && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-violet-600">👤</span>
                    Personal Information
                  </h2>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{patientData.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                      {new Date(patientData.dob).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{patientData.contact}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md font-mono">{patientData.id}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Health Information</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                    {patientData.healthInfo || "No health information recorded"}
                  </p>
                </div>
              </div>
            )}

            {/* Admin Information */}
            {user.role === "Admin" && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-violet-600">🏥</span>
                  Administrator Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">Full System Access</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <ul className="text-gray-900 space-y-1">
                        <li>• Manage all patients and appointments</li>
                        <li>• View and edit treatment records</li>
                        <li>• Access calendar and scheduling</li>
                        <li>• Generate reports and analytics</li>
                        <li>• Upload and manage files</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats (Patient Only) */}
            {user.role === "Patient" && stats && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-violet-600">📊</span>
                  Your Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Appointments</span>
                    <span className="font-semibold text-gray-800">{stats.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-semibold text-green-600">{stats.completed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Upcoming</span>
                    <span className="font-semibold text-blue-600">{stats.upcoming}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Spent</span>
                    <span className="font-semibold text-purple-600">${stats.totalCost}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Account Security */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-violet-600">🔒</span>
                Account Security
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Password</span>
                  <button className="text-violet-600 hover:text-violet-800 text-sm font-medium">
                    Change Password
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Two-Factor Auth</span>
                  <span className="text-gray-400 text-sm">Not enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Login</span>
                  <span className="text-gray-400 text-sm">Today</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-violet-600">⚡</span>
                Quick Actions
              </h3>
              <div className="space-y-2">
                {user.role === "Patient" ? (
                  <>
                    <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      📋 View My Appointments
                    </button>
                    <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      📄 Download Medical Records
                    </button>
                    <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      📞 Contact Support
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      👥 Manage Patients
                    </button>
                    <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      📅 View Calendar
                    </button>
                    <button className="w-full text-left p-2 rounded hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      📊 Generate Reports
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal (Patient Only) */}
      {showEditModal && user.role === "Patient" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Health Information</label>
                <textarea
                  value={formData.healthInfo}
                  onChange={(e) => setFormData({...formData, healthInfo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  rows="3"
                  placeholder="Allergies, medical conditions, etc."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                disabled={!formData.name || !formData.dob || !formData.contact}
                className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 