import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Incidents from "./pages/Incidents";
import Calendar from "./pages/Calendar";
import MyProfile from "./pages/MyProfile";
import PatientView from "./pages/PatientView";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Common/Layout";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <PrivateRoute roles={["Admin"]}>
              <Layout>
                <Patients />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/incidents"
          element={
            <PrivateRoute roles={["Admin"]}>
              <Layout>
                <Incidents />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute roles={["Admin"]}>
              <Layout>
                <Calendar />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <MyProfile />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/patient-view"
          element={
            <PrivateRoute roles={["Patient"]}>
              <Layout>
                <PatientView />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}
