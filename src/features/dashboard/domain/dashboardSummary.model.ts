export type DashboardSummaryMetric = {
  value: number;
  currentMonth: number;
};

export type DashboardSummary = {
  totalBusinesses: DashboardSummaryMetric;
  contactedBusinesses: DashboardSummaryMetric;
  pendingFollowUps: DashboardSummaryMetric;
  highPriorityBusinesses: DashboardSummaryMetric;
};
