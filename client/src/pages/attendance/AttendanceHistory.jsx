import { useState, useEffect } from "react";
import Card, { CardHeader, CardBody } from "../../components/ui/Card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table";
import { getMyAttendance } from "../../services/attendanceService";

export default function AttendanceHistory() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const res = await getMyAttendance();
      setAttendance(res.data || []);
    } catch (error) {
      console.error("Error loading attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Attendance History
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          View your attendance records
        </p>
      </div>

      <Card>
        <CardHeader title="Attendance Records" />
        <CardBody>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : attendance.length === 0 ? (
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
                      Mode
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
                  {attendance.map((record, index) => (
                    <TableRow key={index}>
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
                        {record.mode || "N/A"}
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
