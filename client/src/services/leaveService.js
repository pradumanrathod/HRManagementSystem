import api from "./api";

export const applyLeave = (data) => api.post("/leaves/apply", data);
export const approveLeave = (data) => api.post("/leaves/approve", data);
