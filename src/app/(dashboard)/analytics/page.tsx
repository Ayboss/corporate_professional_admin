"use client";

import AnalyticsDashboard from "./AnalyticsDashboard";
import EngagementMetricsPage from "./EngagementMetrics";
import UserMetrics from "./UserMetrics";

export default function AnalyticsPage() {
  return (
    <>
      <AnalyticsDashboard />
      <UserMetrics />
      <EngagementMetricsPage />
    </>
  );
}
