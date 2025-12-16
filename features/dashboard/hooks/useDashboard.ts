"use client";

import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboard.service";
import { DashboardResponse } from "../types/dashboard";

export function useDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
