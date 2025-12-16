import { DashboardResponse } from "../types/dashboard";
import { apiClient } from "../../../lib/apiClient";
import { apiGetDashboard } from "../api/dashboard.api";

export const getDashboard = () =>
  apiClient<DashboardResponse>(() => apiGetDashboard());
