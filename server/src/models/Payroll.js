import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    month: Number, // 1–12
    year: Number,

    workingDays: Number,
    presentDays: Number,
    leaveDays: Number,

    earnings: {
      basic: Number,
      hra: Number,
      allowances: Number,
      overtime: { type: Number, default: 0 },
    },

    deductions: {
      unpaidLeave: Number,
      pf: Number,
      esi: Number,
      tds: Number,
    },

    netSalary: Number,
  },
  { timestamps: true }
);


payrollSchema.index({ employee: 1, month: 1, year: 1 });

export default mongoose.model("Payroll", payrollSchema);
