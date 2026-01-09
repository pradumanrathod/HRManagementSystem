import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    employeeId: {
      type: String,
      unique: true,
      required: true,
    },

    personalDetails: {
      dob: Date,
      address: String,
      emergencyContact: String,
    },

    jobDetails: {
      department: String,
      designation: String,
      reportingManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
      employmentType: {
        type: String,
        enum: ["Full-Time", "Part-Time", "Contract", "Intern"],
      },
      joiningDate: Date,
    },

    salaryStructure: {
      basic: Number,
      hra: Number,
      allowances: Number,
      deductions: Number,
    },

    documents: {
      idProof: String,
      certificates: String,
      experienceLetter: String,
    },
  },
  { timestamps: true }
);

employeeSchema.index({ employeeId: 1 });
employeeSchema.index({ user: 1 });
export default mongoose.model("Employee", employeeSchema);
