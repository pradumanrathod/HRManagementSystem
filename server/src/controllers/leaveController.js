import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";

export const applyLeave = async (req, res) => {
  const { type, fromDate, toDate, reason } = req.body;

  const employee = await Employee.findOne({ user: req.user._id });

  const leave = await Leave.create({
    employee: employee._id,
    type,
    fromDate,
    toDate,
    reason,
  });

  res.json({ message: "Leave applied", leave });
};

export const approveLeave = async (req, res) => {
  const { leaveId, status } = req.body;

  const leave = await Leave.findById(leaveId);
  if (!leave) return res.status(404).json({ message: "Leave not found" });

  leave.status = status;
  leave.approvedBy = req.user._id;
  await leave.save();

  res.json({ message: "Leave updated", leave });
};
