import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card, { CardHeader, CardBody } from "../../components/ui/Card";
import { generatePayroll } from "../../services/payrollService";

export default function PayrollGenerate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    employeeId: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    deductions: {
      unpaidLeave: 0,
      pf: 0,
      esi: 0,
      tds: 0,
    },
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
      await generatePayroll(form);
      setSuccess("Payroll generated successfully!");
      setTimeout(() => {
        navigate("/hr/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate payroll");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Generate Payroll
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Generate payroll for an employee
        </p>
      </div>

      <Card>
        <CardHeader title="Payroll Information" />
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
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Employee ID <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  value={form.employeeId}
                  onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Month <span className="text-error-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="12"
                  className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  value={form.month}
                  onChange={(e) => setForm({ ...form, month: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year <span className="text-error-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                Deductions
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Unpaid Leave
                  </label>
                  <input
                    type="number"
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    value={form.deductions.unpaidLeave}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        deductions: {
                          ...form.deductions,
                          unpaidLeave: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    PF
                  </label>
                  <input
                    type="number"
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    value={form.deductions.pf}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        deductions: {
                          ...form.deductions,
                          pf: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ESI
                  </label>
                  <input
                    type="number"
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    value={form.deductions.esi}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        deductions: {
                          ...form.deductions,
                          esi: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    TDS
                  </label>
                  <input
                    type="number"
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    value={form.deductions.tds}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        deductions: {
                          ...form.deductions,
                          tds: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="h-11 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-3 focus:ring-brand-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Generating..." : "Generate Payroll"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/hr/dashboard")}
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
