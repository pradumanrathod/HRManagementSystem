import { useState, useEffect } from "react";
import Card, { CardHeader, CardBody } from "../../components/ui/Card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/Table";
import { getAttendanceReport } from "../../services/attendanceService";

export default function HRDashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    pendingLeaves: 0,
    totalPayroll: 0,
  });
  const [recentAttendance, setRecentAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const attendanceRes = await getAttendanceReport();
      const attendance = attendanceRes.data || [];
      
      const today = new Date().toISOString().split('T')[0];
      const todayAttendance = attendance.filter(
        (a) => new Date(a.date).toISOString().split('T')[0] === today
      );
      
      setStats({
        totalEmployees: attendance.length > 0 ? new Set(attendance.map(a => a.employee?._id || a.employee)).size : 0,
        presentToday: todayAttendance.filter(a => a.status === 'Present').length,
        pendingLeaves: 0,
        totalPayroll: 0,
      });
      
      setRecentAttendance(attendance.slice(0, 10));
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      title: "Present Today",
      value: stats.presentToday,
      icon: "✓",
      color: "bg-green-500",
    },
    {
      title: "Pending Leaves",
      value: stats.pendingLeaves,
      icon: "📋",
      color: "bg-orange-500",
    },
    {
      title: "Total Payroll",
      value: `$${stats.totalPayroll.toLocaleString()}`,
      icon: "💰",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          HR Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Overview of your HR management system
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color} text-white text-2xl`}
                >
                  {stat.icon}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="Recent Attendance" />
        <CardBody>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : recentAttendance.length === 0 ? (
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
                  {recentAttendance.map((record, index) => (
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
