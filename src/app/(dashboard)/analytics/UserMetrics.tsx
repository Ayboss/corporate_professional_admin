/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
} from "recharts";

import { getUserMetric } from "@/functions/analytics";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { buildQuery, entriesFromRecord, formatNumber, toSeries } from "./utils";
import { Skeleton } from "@radix-ui/themes";

export default function UserMetrics() {
  const [filters, setFilters] = useState({ from: "", to: "" });
  const query = useMemo(() => buildQuery(filters), [filters]);

  const { data, isLoading, error } = useSWR(
    `/analytics/user-metrics?${query}`,
    () => getUserMetric("", { arg: { query } })
  );

  const signupTrend = toSeries(data?.signup_trend);
  const dauTrend = toSeries(data?.dau_trend);
  const loginFreqRows = entriesFromRecord(data?.login_frequency);
  const signupSourceRows = entriesFromRecord(data?.signup_sources);

  return (
    <div className="space-y-6 mt-5">
      <h2>User Metrics</h2>
      {/* Filters */}
      <div className="p-4 rounded-lg bg-white  border border-gray-200 ">
        <div className="flex items-center gap-2 text-gray-700  mb-3">
          <CalendarRange size={18} />
          <h2 className="font-semibold">User Metrics — Filters</h2>
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
          <KpiCard label="Total Users" value={data?.total_users} />
          <KpiCard label="New Signups" value={data?.new_signups} />
          <KpiCard label="DAU" value={data?.daily_active_users} />
          <KpiCard label="WAU" value={data?.weekly_active_users} />
          <KpiCard label="MAU" value={data?.monthly_active_users} />
        </div>
      </Skeleton>

      {/* Trends */}
      <div className="grid grid-cols-2 gap-6">
        <ChartCard title="Signup Trend" data={signupTrend} dataKey="value" />
        <ChartCard title="DAU Trend" data={dauTrend} dataKey="value" />
      </div>

      {/* Distributions */}
      <div className="grid grid-cols-2 gap-6">
        <Card title="Login Frequency">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loginFreqRows}>
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
        <Card title="Signup Sources">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-1">Source</th>
                <th className="py-1">Count</th>
              </tr>
            </thead>
            <tbody>
              {signupSourceRows.map((r) => (
                <tr key={r.name} className="border-t border-gray-100 ">
                  <td className="py-1 capitalize">{r.name}</td>
                  <td className="py-1">{formatNumber(r.value)}</td>
                </tr>
              ))}
              {signupSourceRows.length === 0 && (
                <tr>
                  <td colSpan={2} className="py-2 text-gray-500">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Top users */}
      <div className="grid grid-cols-3 gap-6">
        <TopList
          title="Most Connected Users"
          rows={(data?.most_connected_users || []).map((x: any) => ({
            id: x.user_id,
            primary: x.full_name,
            secondary: `${formatNumber(x.connection_count)} connections`,
          }))}
        />
        <TopList
          title="Most Active Posters"
          rows={(data?.most_active_posters || []).map((x: any) => ({
            id: x.user_id,
            primary: x.full_name,
            secondary: `${formatNumber(x.post_count)} posts`,
          }))}
        />
        <TopList
          title="Most Engaged Users"
          rows={(data?.most_engaged_users || []).map((x: any) => ({
            id: x.user_id,
            primary: x.full_name,
            secondary: `Highly engaged`,
          }))}
        />
      </div>

      {error && (
        <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
          Failed to load user metrics.
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

function TopList({
  title,
  rows,
}: {
  title: string;
  rows: { id: string; primary: string; secondary?: string }[];
}) {
  return (
    <div className="p-4 rounded-lg bg-white  border border-gray-200 ">
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul className="divide-y divide-gray-100 ">
        {rows.slice(0, 8).map((r) => (
          <li key={r.id} className="py-2">
            <div className="text-sm font-medium">{r.primary}</div>
            {r.secondary && (
              <div className="text-xs text-gray-500">{r.secondary}</div>
            )}
          </li>
        ))}
        {rows.length === 0 && (
          <li className="py-2 text-sm text-gray-500">No data</li>
        )}
      </ul>
    </div>
  );
}

function ChartCard({
  title,
  data,
  dataKey,
}: {
  title: string;
  data: any[];
  dataKey: string;
}) {
  return (
    <div className="p-4 rounded-lg bg-white border border-gray-200 ">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
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
        </ResponsiveContainer>
      </div>
    </div>
  );
}
