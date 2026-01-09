import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card, { CardHeader, CardBody } from "../../components/ui/Card";
import { markAttendance } from "../../services/attendanceService";

export default function MarkAttendance() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    status: "Present",
    mode: "Manual",
    checkIn: new Date().toTimeString().slice(0, 5),
    checkOut: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await markAttendance(form);
      setSuccess("Attendance marked successfully!");
      setTimeout(() => {
        navigate("/attendance/history");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Mark Attendance
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Mark your attendance for today
        </p>
      </div>

      <Card>
        <CardHeader title="Attendance Form" />
        <CardBody>
          {error && (
            <div className="mb-4 text-sm text-error-600 bg-error-50 dark:bg-error-500/20 dark:text-error-400 p-3 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 text-sm text-success-600 bg-success-50 dark:bg-success-500/20 dark:text-success-400 p-3 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status <span className="text-error-500">*</span>
              </label>
              <select
                required
                className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-brand-800"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Leave">Leave</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mode
              </label>
              <select
                className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-brand-800"
                value={form.mode}
                onChange={(e) => setForm({ ...form, mode: e.target.value })}
              >
                <option value="Manual">Manual</option>
                <option value="Biometric">Biometric</option>
                <option value="Face">Face</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check In
                </label>
                <input
                  type="time"
                  className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-brand-800"
                  value={form.checkIn}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check Out
                </label>
                <input
                  type="time"
                  className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-brand-800"
                  value={form.checkOut}
                  onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="h-11 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-3 focus:ring-brand-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Submitting..." : "Mark Attendance"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/employee/dashboard")}
                className="h-11 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
