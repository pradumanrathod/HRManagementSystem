import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

export const markAttendance = async (req, res) => {
  const { status, mode, checkIn, checkOut } = req.body;

  const employee = await Employee.findOne({ user: req.user._id });
  if (!employee)
    return res.status(404).json({ message: "Employee profile not found" });

  const today = new Date().setHours(0, 0, 0, 0);

  const alreadyMarked = await Attendance.findOne({
    employee: employee._id,
    date: today,
  });

  if (alreadyMarked)
    return res.status(400).json({ message: "Attendance already marked" });

  const attendance = await Attendance.create({
    employee: employee._id,
    date: today,
    status,
    mode,
    checkIn,
    checkOut,
  });

  res.json({ message: "Attendance marked", attendance });
};

// own attendance
export const getMyAttendance = async (req, res) => {
  const employee = await Employee.findOne({ user: req.user._id });

  const records = await Attendance.find({ employee: employee._id })
    .sort({ date: -1 });

  res.json(records);
};

// attendance report
export const getAttendanceReport = async (req, res) => {
  const records = await Attendance.find()
    .populate("employee", "employeeId jobDetails");

  res.json(records);
};

