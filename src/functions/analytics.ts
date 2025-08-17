/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TactionMetric,
  TanalyticDashboard,
  TanalyticPost,
  TcontentAnalytics,
  TcustomReport,
  TengagementMetric,
  TjobMetric,
  TuserMetric,
} from "@/types/analytics";

import httprequest from "@/utils/httpRequest";
import { errorMessage } from "@/utils/toastalert";

export async function getJobPostingMetrics(
  url: string,
  { arg }: { arg: { query: string } }
) {
  try {
    const response = await httprequest.get(
      `/analytics/job-posting-metrics?${arg.query}`
    );
    return response.data as TjobMetric;
  } catch (err) {
    errorMessage(err);
  }
}

export async function getAnalyticsDashboard(
  url: string,
  { arg }: { arg: { query: string } }
) {
  try {
    const response = await httprequest.get(`/analytics/dashboard?${arg.query}`);
    return response.data as TanalyticDashboard;
  } catch (err) {
    errorMessage(err);
  }
}

export async function getUserMetric(
  url: string,
  { arg }: { arg: { query: string } }
) {
  try {
    const response = await httprequest.get(
      `/analytics/user-metrics?${arg.query}`
    );
    return response.data as TuserMetric;
  } catch (err) {
    errorMessage(err);
  }
}

export async function getEngagementMetric(
  url: string,
  { arg }: { arg: { query: string } }
) {
  try {
    const response = await httprequest.get(
      `/analytics/engagement-metrics?${arg.query}`
    );
    return response.data as TengagementMetric;
  } catch (err) {
    errorMessage(err);
  }
}

export async function getContentAnalytics(
  url: string,
  { arg }: { arg: { query: string } }
) {
  try {
    const response = await httprequest.get(
      `/analytics/content-analytics?${arg.query}`
    );
    return response.data as TcontentAnalytics;
  } catch (err) {
    errorMessage(err);
  }
}

export async function getViralPosts(
  url: string,
  { arg }: { arg: { query: string } }
) {
  try {
    const response = await httprequest.get(
      `/analytics/viral-posts?${arg.query}`
    );
    return response.data as TanalyticPost;
  } catch (err) {
    errorMessage(err);
  }
}

export async function getAactivationMetric(
  url: string,
  { arg }: { arg: { query: string } }
) {
  try {
    const response = await httprequest.get(
      `/analytics/activation-metrics?${arg.query}`
    );
    return response.data as TactionMetric;
  } catch (err) {
    errorMessage(err);
  }
}

export async function getCohortAnalysis(
  url: string,
  { arg }: { arg: { query: string } }
) {
  try {
    const response = await httprequest.get(
      `/analytics/cohort-analysis?${arg.query}`
    );
    return response.data as TcontentAnalytics;
  } catch (err) {
    errorMessage(err);
  }
}

export async function generateCustomReport(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { arg }: { arg: any }
) {
  try {
    const response = await httprequest.post(
      `/api/analytics/custom-report`,
      arg
    );
    return response.data as TcustomReport;
  } catch (err) {
    errorMessage(err);
  }
}

export async function downloadReport(
  url: string,
  { arg }: { arg: { report_id: string } }
) {
  try {
    const response = await httprequest.get(
      `/analytics/reports/${arg.report_id}/download`
    );
    return response.data as string;
  } catch (err) {
    errorMessage(err);
  }
}

export async function trackEvent(
  url: string,
  { arg }: { arg: { report_id: string } }
) {
  try {
    const response = await httprequest.post(`/analytics/track-event`);
    return response.data as string;
  } catch (err) {
    errorMessage(err);
  }
}

export async function trackDailyAnalytic(
  url: string,
  { arg }: { arg: { report_id: string } }
) {
  try {
    const response = await httprequest.post(
      `/analytics/trigger-daily-analytics`
    );
    return response.data as string;
  } catch (err) {
    errorMessage(err);
  }
}

export async function trackWeeklyAnalytic(
  url: string,
  { arg }: { arg: { report_id: string } }
) {
  try {
    const response = await httprequest.post(
      `/analytics/trigger-weekly-analytics`
    );
    return response.data as string;
  } catch (err) {
    errorMessage(err);
  }
}
