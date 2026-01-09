import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

// Dashboard Pages
import HRDashboard from "./pages/dashboards/HRDashboard";
import EmployeeDashboard from "./pages/dashboards/EmployeeDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

// HR Pages
import OnboardEmployee from "./pages/hr/OnboardEmployee";
import AttendanceReport from "./pages/hr/AttendanceReport";
import PayrollGenerate from "./pages/hr/PayrollGenerate";

// Attendance Pages
import MarkAttendance from "./pages/attendance/MarkAttendance";
import AttendanceHistory from "./pages/attendance/AttendanceHistory";

// Payroll Pages
import PayrollList from "./pages/payroll/PayrollList";
import PayslipView from "./pages/payroll/PayslipView";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            element={
              <ProtectedRoute allowedRoles={["HR", "Admin", "Employee"]}>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* HR/Admin Routes */}
            <Route
              path="/hr/dashboard"
              element={
                <ProtectedRoute allowedRoles={["HR", "Admin"]}>
                  <HRDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/onboard"
              element={
                <ProtectedRoute allowedRoles={["HR", "Admin"]}>
                  <OnboardEmployee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/attendance"
              element={
                <ProtectedRoute allowedRoles={["HR", "Admin"]}>
                  <AttendanceReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/payroll"
              element={
                <ProtectedRoute allowedRoles={["HR", "Admin"]}>
                  <PayrollGenerate />
                </ProtectedRoute>
              }
            />

            {/* Employee Routes */}
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Employee"]}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance/mark"
              element={
                <ProtectedRoute allowedRoles={["Employee"]}>
                  <MarkAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance/history"
              element={
                <ProtectedRoute allowedRoles={["Employee"]}>
                  <AttendanceHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payroll/list"
              element={
                <ProtectedRoute allowedRoles={["Employee"]}>
                  <PayrollList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payroll/view/:id"
              element={
                <ProtectedRoute allowedRoles={["Employee"]}>
                  <PayslipView />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
