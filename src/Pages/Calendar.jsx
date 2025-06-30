import React, { useState, useEffect } from "react";
import { getItem } from "../utils/localStorage";
import { useAuth } from "../context/AuthContext";

// Calendar page placeholder
export default function Calendar() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month"); // "month" or "week"
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  useEffect(() => {
    const allIncidents = getItem("incidents") || [];
    const allPatients = getItem("patients") || [];
    
    // Map appointments with patient names
    const appointmentsWithPatients = allIncidents.map(incident => ({
      ...incident,
      patientName: allPatients.find(p => p.id === incident.patientId)?.name || "Unknown Patient"
    }));
    
    setAppointments(appointmentsWithPatients);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointmentDate);
      const appointmentDateStr = appointmentDate.toISOString().split('T')[0];
      return appointmentDateStr === dateStr;
    });
  };

  const handleDateClick = (date) => {
    if (!date) return;
    
    setSelectedDate(date);
    const dayAppointments = getAppointmentsForDate(date);
    setSelectedAppointments(dayAppointments);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const navigateWeek = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + (direction * 7));
      return newDate;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date && date.toDateString() === selectedDate.toDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (user?.role !== "Admin") {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Access Denied</h2>
        <p>This page is only accessible to administrators.</p>
      </div>
    );
  }

  const days = viewMode === "month" ? getDaysInMonth(currentDate) : getWeekDays(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Calendar</h2>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("month")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "month" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "week" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Week
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => viewMode === "month" ? navigateMonth(-1) : navigateWeek(-1)}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-lg font-semibold text-gray-800 min-w-[200px] text-center">
                {viewMode === "month" 
                  ? currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                  : `${formatDate(days[0])} - ${formatDate(days[6])}`
                }
              </span>
              <button
                onClick={() => viewMode === "month" ? navigateMonth(1) : navigateWeek(1)}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {weekDays.map(day => (
            <div key={day} className="p-3 text-center font-semibold text-gray-600 bg-gray-50 rounded-md">
              {day}
            </div>
          ))}
          
          {days.map((date, index) => {
            const dayAppointments = getAppointmentsForDate(date);
            const appointmentCount = dayAppointments.length;
            
            return (
              <div
                key={index}
                onClick={() => handleDateClick(date)}
                className={`min-h-[120px] p-2 border border-gray-200 rounded-md cursor-pointer transition-colors hover:bg-gray-50 ${
                  isToday(date) ? 'bg-blue-50 border-blue-300' : ''
                } ${isSelected(date) ? 'bg-blue-100 border-blue-400' : ''}`}
              >
                {date && (
                  <>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {date.getDate()}
                    </div>
                    {appointmentCount > 0 && (
                      <div className="space-y-1">
                        {dayAppointments.slice(0, 2).map((appointment, idx) => (
                          <div
                            key={idx}
                            className={`text-xs p-1 rounded truncate ${getStatusColor(appointment.status)}`}
                            title={`${appointment.patientName} - ${appointment.title} (${formatTime(appointment.appointmentDate)})`}
                          >
                            {appointment.patientName} - {formatTime(appointment.appointmentDate)}
                          </div>
                        ))}
                        {appointmentCount > 2 && (
                          <div className="text-xs text-gray-500 text-center">
                            +{appointmentCount - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Appointments for {formatDate(selectedDate)}
            </h3>
            {selectedAppointments.length === 0 ? (
              <p className="text-gray-500">No appointments scheduled for this date.</p>
            ) : (
              <div className="space-y-3">
                {selectedAppointments.map((appointment, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{appointment.title}</h4>
                        <p className="text-sm text-gray-600">{appointment.patientName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                        <span className="text-sm text-gray-600">
                          {formatTime(appointment.appointmentDate)}
                        </span>
                      </div>
                    </div>
                    {appointment.description && (
                      <p className="text-sm text-gray-700 mb-2">{appointment.description}</p>
                    )}
                    {appointment.comments && (
                      <p className="text-sm text-gray-600 italic">"{appointment.comments}"</p>
                    )}
                    {appointment.cost && (
                      <p className="text-sm font-medium text-green-600 mt-2">
                        Cost: ${appointment.cost}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 