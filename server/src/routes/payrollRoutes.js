import express from "express";
import { generatePayroll } from "../controllers/payrollController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  authorizeRoles("HR", "Admin"),
  generatePayroll
);

export default router;
