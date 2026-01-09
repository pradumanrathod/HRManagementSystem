import { useState, useEffect } from "react";
import Card, { CardHeader, CardBody } from "../../components/ui/Card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table";
import { getAttendanceReport } from "../../services/attendanceService";

export default function AttendanceReport() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    date: "",
    status: "",
  });

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const res = await getAttendanceReport();
      setAttendance(res.data || []);
    } catch (error) {
      console.error("Error loading attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAttendance = attendance.filter((record) => {
    if (filters.date) {
      const recordDate = new Date(record.date).toISOString().split('T')[0];
      if (recordDate !== filters.date) return false;
    }
    if (filters.status && record.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Attendance Reports
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          View and manage employee attendance records
        </p>
      </div>

      <Card>
        <CardHeader title="Filters" />
        <CardBody>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-brand-800"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                className="w-full h-11 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-brand-800"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">All</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Leave">Leave</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Attendance Records" />
        <CardBody>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : filteredAttendance.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No attendance records found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Employee ID
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Date
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Check In
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Check Out
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredAttendance.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-5 py-3 text-theme-sm text-gray-800 dark:text-white">
                        {record.employee?.employeeId || "N/A"}
                      </TableCell>
                      <TableCell className="px-5 py-3 text-theme-sm text-gray-800 dark:text-white">
                        {new Date(record.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-5 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            record.status === "Present"
                              ? "bg-success-100 text-success-700 dark:bg-success-500/20 dark:text-success-400"
                              : record.status === "Absent"
                              ? "bg-error-100 text-error-700 dark:bg-error-500/20 dark:text-error-400"
                              : "bg-warning-100 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400"
                          }`}
                        >
                          {record.status}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-3 text-theme-sm text-gray-800 dark:text-white">
                        {record.checkIn || "N/A"}
                      </TableCell>
                      <TableCell className="px-5 py-3 text-theme-sm text-gray-800 dark:text-white">
                        {record.checkOut || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
