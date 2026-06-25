export type DashboardTrendVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

export type DashboardSummaryMetric = {
  value: number;
  currentMonth: number;
  trendVariant: DashboardTrendVariant;
};

export type DashboardSummary = {
  totalBusinesses: DashboardSummaryMetric;
  contactedBusinesses: DashboardSummaryMetric;
  pendingFollowUps: DashboardSummaryMetric;
  highPriorityBusinesses: DashboardSummaryMetric;
};
