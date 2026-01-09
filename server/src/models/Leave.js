import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    type: {
      type: String,
      enum: ["Casual", "Sick", "Paid", "Unpaid"],
      required: true,
    },

    fromDate: Date,
    toDate: Date,

    reason: String,

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


leaveSchema.index({ employee: 1, status: 1 });

export default mongoose.model("Leave", leaveSchema);
