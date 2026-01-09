import express from "express";
import { onboardEmployee } from "../controllers/employeeController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/onboard",
  protect,
  authorizeRoles("HR", "Admin"),
  onboardEmployee
);

export default router;
