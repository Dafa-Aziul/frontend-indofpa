export interface SummaryData {
  totalKuesioner: number;
  draft: number;
  publish: number;
  arsip: number;
  totalResponden: number;
}

export interface DistributionItem {
  kuesionerId: number;
  count: number;
}

export interface TrendItem {
  date: string;
  count: number;
}

export interface DashboardResponse {
  summary: SummaryData;
  distribution: DistributionItem[];
  last30Days: TrendItem[];
}
