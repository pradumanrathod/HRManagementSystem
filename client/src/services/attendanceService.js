import api from "./api";

export const markAttendance = (data) => api.post("/attendance/mark", data);
export const getMyAttendance = () => api.get("/attendance/me");
export const getAttendanceReport = () => api.get("/attendance/report");
