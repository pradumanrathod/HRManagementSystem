import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Leave"],
      default: "Present",
    },

    mode: {
      type: String,
      enum: ["Manual", "Biometric", "Face"],
      default: "Manual",
    },

    checkIn: String,
    checkOut: String,
  },
  { timestamps: true }
);



attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
