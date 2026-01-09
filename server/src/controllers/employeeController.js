import User from "../models/User.js";
import Employee from "../models/Employee.js";

export const onboardEmployee = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    employeeId,
    personalDetails,
    jobDetails,
    salaryStructure,
  } = req.body;

  // prevent duplicate user
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  // create login user
  const user = await User.create({
    name,
    email,
    password,
    role: role || "Employee",
  });

  // create employee profile
  const employee = await Employee.create({
    user: user._id,
    employeeId,
    personalDetails,
    jobDetails,
    salaryStructure,
  });

  res.status(201).json({
    message: "Employee onboarded successfully",
    employee,
  });
};
