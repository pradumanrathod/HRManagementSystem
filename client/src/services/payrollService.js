import api from "./api";

export const generatePayroll = (data) => api.post("/payroll/generate", data);
export const downloadPayslip = (payrollId) => api.get(`/payslip/${payrollId}`, {
  responseType: 'blob'
});
