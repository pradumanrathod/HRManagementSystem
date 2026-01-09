import Payroll from "../models/Payroll.js";
import Employee from "../models/Employee.js";
import generatePayslip from "../utils/generatePayslip.js";

export const downloadPayslip = async (req, res) => {
  const { payrollId } = req.params;

  const payroll = await Payroll.findById(payrollId);
  if (!payroll) return res.status(404).json({ message: "Payroll not found" });

  const employee = await Employee.findById(payroll.employee);

  generatePayslip(res, payroll, employee);
};
