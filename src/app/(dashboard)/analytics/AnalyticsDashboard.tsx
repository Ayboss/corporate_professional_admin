"use client";
import { getAnalyticsDashboard } from "@/functions/analytics";
import { ArrowDownRight, ArrowUpRight, CalendarRange } from "lucide-react";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { buildQuery, formatNumber, lastPct } from "./utils";

export default function AnalyticsDashboard() {
  // minimal filters for V1
  const [filters, setFilters] = useState({ from: "", to: "" });
  const query = useMemo(() => buildQuery(filters), [filters]);

  const { data, isLoading, error } = useSWR(
    `/analytics/dashboard?${query}`,
    () => getAnalyticsDashboard("", { arg: { query } })
  );

  const u = data?.user_metrics;
  const loginFreq = data?.user_metrics?.login_frequency as
    | Record<string, number>
    | undefined;

  const signupChange = lastPct(u?.signup_trend);
  const dauChange = lastPct(u?.dau_trend);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="p-4 rounded-lg bg-white  border border-gray-200 ">
        <div className="flex items-center gap-2 text-gray-700  mb-3">
          <CalendarRange size={18} />
          <h2 className="font-semibold">Time Range</h2>
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
      <div className="grid grid-cols-5 gap-4">
        <StatCard label="Total Users" value={u?.total_users} />
        <StatCard
          label="New Signups"
          value={u?.new_signups}
          change={signupChange}
        />
        <StatCard
          label="DAU"
          value={u?.daily_active_users}
          change={dauChange}
        />
        <StatCard label="WAU" value={u?.weekly_active_users} />
        <StatCard label="MAU" value={u?.monthly_active_users} />
      </div>

      {/* Top users & login frequency */}
      <div className="grid grid-cols-3 gap-6">
        <TopList
          title="Most Connected Users"
          rows={(u?.most_connected_users || []).map((x) => ({
            id: x.user_id,
            primary: x.full_name,
            secondary: `${formatNumber(x.connection_count)} connections`,
          }))}
        />
        <TopList
          title="Most Active Posters"
          rows={(u?.most_active_posters || []).map((x) => ({
            id: x.user_id,
            primary: x.full_name,
            secondary: `${formatNumber(x.post_count)} posts`,
          }))}
        />
        <TopList
          title="Most Engaged Users"
          rows={(u?.most_engaged_users || []).map((x) => ({
            id: x.user_id,
            primary: x.full_name,
            secondary: `Highly engaged`,
          }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card title="Login Frequency">
          <div className="space-y-3">
            {Object.entries(loginFreq || {}).map(([k, v]) => (
              <div key={k} className="flex items-center gap-3">
                <div className="w-24 text-sm text-gray-600  capitalize">
                  {k}
                </div>
                <div className="flex-1 h-2 bg-gray-200  rounded">
                  <div
                    className="h-2 bg-primary rounded"
                    style={{ width: `${Math.min(100, v)}%` }}
                    aria-label={`${k}: ${v}`}
                  />
                </div>
                <div className="w-12 text-right text-sm">{formatNumber(v)}</div>
              </div>
            ))}
            {!loginFreq && <div className="text-sm text-gray-500">No data</div>}
          </div>
        </Card>

        <Card title="Signup Sources">
          <div className="space-y-2">
            {Object.entries(data?.user_metrics?.signup_sources || {}).map(
              ([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="capitalize text-gray-600 ">{k}</span>
                  <span>{formatNumber(v as number)}</span>
                </div>
              )
            )}
            {Object.keys(data?.user_metrics?.signup_sources || {}).length ===
              0 && <div className="text-sm text-gray-500">No data</div>}
          </div>
        </Card>
      </div>

      {error && (
        <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
          Failed to load analytics.
        </div>
      )}

      {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
    </div>
  );
}

function StatCard({
  label,
  value,
  change,
}: {
  label: string;
  value?: number;
  change?: number;
}) {
  const positive = typeof change === "number" && change >= 0;
  return (
    <div className="p-4 rounded-lg bg-white  border border-gray-200 ">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{formatNumber(value)}</div>
      {typeof change === "number" && (
        <div
          className={`mt-1 inline-flex items-center text-xs rounded px-1.5 py-0.5 ${
            positive
              ? "text-emerald-700 bg-emerald-50"
              : "text-rose-700 bg-rose-50"
          }`}
        >
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span className="ml-1">{change}%</span>
        </div>
      )}
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
