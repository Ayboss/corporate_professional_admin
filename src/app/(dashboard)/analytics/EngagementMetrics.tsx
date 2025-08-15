"use client";

import React, { useMemo, useState } from "react";
import useSWR from "swr";

import { CalendarRange } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { buildQuery, entriesFromRecord, formatNumber, toSeries } from "./utils";
import { Skeleton } from "@radix-ui/themes";
import { getEngagementMetric } from "@/functions/analytics";

export default function EngagementMetricsPage() {
  // minimal date range filters
  const [filters, setFilters] = useState({ from: "", to: "" });
  const query = useMemo(() => buildQuery(filters), [filters]);

  const { data, isLoading, error } = useSWR(
    `/analytics/engagement-metrics?${query}`,
    () => getEngagementMetric("", { arg: { query } })
  );

  const postsTrend = toSeries(data?.posts_trend);
  const commentsTrend = toSeries(data?.comments_trend);
  const likesTrend = toSeries(data?.likes_trend);
  const repeatVisitRows = entriesFromRecord(data?.repeat_visit_rates);
  const sessionDistRows = entriesFromRecord(
    data?.session_duration_distribution
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="p-4 rounded-lg bg-white  border border-gray-200 ">
        <div className="flex items-center gap-2 text-gray-700  mb-3">
          <CalendarRange size={18} />
          <h2 className="font-semibold">Engagement Metrics — Filters</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 max-w-xl">
          <label className="block">
            <span className="text-xs text-gray-500">From</span>
            <input
              type="date"
              value={filters.from}
              onChange={(e) =>
                setFilters((p) => ({ ...p, from: e.target.value }))
              }
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="block">
            <span className="text-xs text-gray-500">To</span>
            <input
              type="date"
              value={filters.to}
              onChange={(e) =>
                setFilters((p) => ({ ...p, to: e.target.value }))
              }
              className="mt-1 w-full rounded border p-2"
            />
          </label>
        </div>
      </div>

      {/* KPI row */}
      <Skeleton loading={isLoading}>
        <div className="grid grid-cols-5 gap-4">
          <KpiCard label="Total Posts" value={data?.total_posts} />
          <KpiCard label="Total Comments" value={data?.total_comments} />
          <KpiCard label="Total Likes" value={data?.total_likes} />
          <KpiCard label="Messages Sent" value={data?.total_messages} />
          <KpiCard label="Connections" value={data?.total_connections} />
        </div>
      </Skeleton>

      {/* Trends */}
      <div className="grid grid-cols-3 gap-6">
        <ChartCard
          title="Posts Trend"
          data={postsTrend}
          dataKey="value"
          type="bar"
        />
        <ChartCard
          title="Comments Trend"
          data={commentsTrend}
          dataKey="value"
          type="line"
        />
        <ChartCard
          title="Likes Trend"
          data={likesTrend}
          dataKey="value"
          type="area"
        />
      </div>

      {/* Session & Repeat Visits */}
      <div className="grid grid-cols-3 gap-6">
        <Card title="Session Averages">
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              Average session duration:{" "}
              <b>{formatNumber(data?.average_session_duration)}</b> min
            </li>
            <li>
              Average time per session:{" "}
              <b>{formatNumber(data?.avg_time_per_session as number)}</b> min
            </li>
          </ul>
        </Card>

        <Card title="Repeat Visit Rates">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={repeatVisitRows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#7074ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Session Duration Distribution">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionDistRows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#7074ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {error && (
        <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
          Failed to load engagement metrics.
        </div>
      )}
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value?: number }) {
  return (
    <div className="p-4 rounded-lg bg-white  border border-gray-200 ">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold">{formatNumber(value)}</div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-lg bg-white  border border-gray-200 ">
      <h3 className="font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

function ChartCard({
  title,
  data,
  dataKey,
  type = "line",
}: {
  title: string;
  data: any[];
  dataKey: string;
  type?: "line" | "bar" | "area";
}) {
  return (
    <div className="p-4 rounded-lg bg-white  border border-gray-200 ">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="#7074ff"
                dot={false}
              />
            </LineChart>
          ) : type === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={dataKey} fill="#7074ff" />
            </BarChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="colorPrimaryArea"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#7074ff" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#7074ff" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#7074ff"
                fill="url(#colorPrimaryArea)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
