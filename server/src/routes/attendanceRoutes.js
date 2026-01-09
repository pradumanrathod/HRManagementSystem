import express from "express";
import {
  markAttendance,
  getMyAttendance,
  getAttendanceReport,
} from "../controllers/attendanceController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/mark", protect, authorizeRoles("Employee"), markAttendance);
router.get("/me", protect, authorizeRoles("Employee"), getMyAttendance);
router.get(
  "/report",
  protect,
  authorizeRoles("HR", "Admin"),
  getAttendanceReport
);

export default router;
