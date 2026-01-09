import express from "express";
import { downloadPayslip } from "../controllers/payslipController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/:payrollId",
  protect,
  authorizeRoles("HR", "Admin", "Employee"),
  downloadPayslip
);

export default router;
