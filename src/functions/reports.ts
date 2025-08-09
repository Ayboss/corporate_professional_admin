import { TReport, TReportDashboard, TReportType } from "@/types/reports";
import httprequest from "@/utils/httpRequest";
import { errorMessage, successMessage } from "@/utils/toastalert";

export async function getAllReports({
  skip,
  limit,
}: {
  skip: number;
  limit: number;
}) {
  try {
    const response = await httprequest.get(
      `/reports?skip=${skip}&limit=${limit}`
    );
    return response.data as TReport[];
  } catch (err) {
    return [];
  }
}

export async function getReportDashboard(url: string) {
  try {
    const response = await httprequest.get("/reports/dashboard");
    return response.data as TReportDashboard;
  } catch (err) {
    errorMessage(err);
  }
}

export async function getReportMetric(
  url: string,
  { arg }: { arg: { post_id: string } }
) {
  try {
    const response = await httprequest.get(`/reports/metrics`);
    return response.data;
  } catch (err) {
    errorMessage(err);
  }
}

export async function getReport(url: string) {
  try {
    const response = await httprequest.get(url);
    return response.data as TReportType;
  } catch (err) {
    errorMessage(err);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateReport(url: string, { arg }: { arg: any }) {
  try {
    const response = await httprequest.put(url, arg);
    return response.data as TReportType;
  } catch (err) {
    errorMessage(err);
  }
}

export async function resolveReport(id: number, notes: string) {
  try {
    const response = await httprequest.post(`/api/reports/${id}/resolve`, {
      notes,
    });
    return response.data as TReportType;
  } catch (err) {
    errorMessage(err);
  }
}
