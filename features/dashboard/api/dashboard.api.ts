import api from "@/lib/axios";

export const apiGetDashboard = () => api.get("/api/dashboard");
