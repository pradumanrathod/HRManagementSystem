import Payroll from "../models/Payroll.js";
import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import { calculateNetSalary } from "../services/payrollService.js";

export const generatePayroll = async (req, res) => {
  const { employeeId, month, year, deductions } = req.body;

  const employee = await Employee.findOne({ employeeId });
  if (!employee) return res.status(404).json({ message: "Employee not found" });

  const attendance = await Attendance.find({
    employee: employee._id,
    date: {
      $gte: new Date(year, month - 1, 1),
      $lte: new Date(year, month, 0),
    },
  });

  const presentDays = attendance.filter(a => a.status === "Present").length;
  const leaveDays = attendance.filter(a => a.status === "Leave").length;
  const workingDays = attendance.length;

  const earnings = employee.salaryStructure;

  const netSalary = calculateNetSalary({
    earnings,
    deductions,
  });

  const payroll = await Payroll.create({
    employee: employee._id,
    month,
    year,
    workingDays,
    presentDays,
    leaveDays,
    earnings,
    deductions,
    netSalary,
  });

  res.json({ message: "Payroll generated", payroll });
};
