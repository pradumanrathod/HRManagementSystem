import express from "express";
import { applyLeave, approveLeave } from "../controllers/leaveController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply", protect, authorizeRoles("Employee"), applyLeave);
router.post(
  "/approve",
  protect,
  authorizeRoles("HR", "Manager"),
  approveLeave
);

export default router;
