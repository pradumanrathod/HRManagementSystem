import api from "./api";

export const onboardEmployee = (data) => api.post("/employees/onboard", data);
