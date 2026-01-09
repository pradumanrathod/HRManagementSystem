import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card, { CardHeader, CardBody } from "../../components/ui/Card";
import { onboardEmployee } from "../../services/employeeService";

export default function OnboardEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
    employeeId: "",
    personalDetails: {
      dob: "",
      address: "",
      emergencyContact: "",
    },
    jobDetails: {
      department: "",
      designation: "",
      employmentType: "Full-Time",
      joiningDate: "",
    },
    salaryStructure: {
      basic: "",
      hra: "",
      allowances: "",
      deductions: "",
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
      await onboardEmployee(form);
      setSuccess("Employee onboarded successfully!");
      setTimeout(() => {
        navigate("/hr/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to onboard employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Onboard Employee
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Create a new employee account and profile
        </p>
      </div>

      <Card>
        <CardHeader title="Employee Information" />
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                Login Credentials
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
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
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                Job Details
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    value={form.jobDetails.department}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        jobDetails: { ...form.jobDetails, department: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Designation <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    value={form.jobDetails.designation}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        jobDetails: { ...form.jobDetails, designation: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Employment Type
                  </label>
                  <select
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-brand-800"
                    value={form.jobDetails.employmentType}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        jobDetails: { ...form.jobDetails, employmentType: e.target.value },
                      })
                    }
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-brand-800"
                    value={form.jobDetails.joiningDate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        jobDetails: { ...form.jobDetails, joiningDate: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                Salary Structure
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Basic Salary
                  </label>
                  <input
                    type="number"
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    value={form.salaryStructure.basic}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        salaryStructure: { ...form.salaryStructure, basic: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    HRA
                  </label>
                  <input
                    type="number"
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    value={form.salaryStructure.hra}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        salaryStructure: { ...form.salaryStructure, hra: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Allowances
                  </label>
                  <input
                    type="number"
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    value={form.salaryStructure.allowances}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        salaryStructure: { ...form.salaryStructure, allowances: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deductions
                  </label>
                  <input
                    type="number"
                    className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    value={form.salaryStructure.deductions}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        salaryStructure: { ...form.salaryStructure, deductions: e.target.value },
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
                {loading ? "Onboarding..." : "Onboard Employee"}
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
