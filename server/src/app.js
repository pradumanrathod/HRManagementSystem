import express from "express";
import cors from "cors"
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import payrollRoutes from "./routes/payrollRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import payslipRoutes from "./routes/payslipRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import rateLimit from "express-rate-limit";


const app= express()
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/payslip", payslipRoutes);
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);
//app.use(helmet())

app.use(errorHandler);




app.get("/",(req,res)=>{
    res.send("hrms backend running");
})

export default app;