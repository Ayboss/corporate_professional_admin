"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import useSWR from "swr";
import { dashboardMetrics, getAllUser } from "@/functions/users";
import { Skeleton } from "@radix-ui/themes";
import { TUser } from "@/types/users";
import Link from "next/link";

const LIMIT = 50;
export default function UserManagementPage() {
  const [filter, setFilter] = useState("");
  const [skip, setSkip] = useState(0);
  const { data = [], isLoading } = useSWR(
    `/admin/users?skip=${skip}&limit=${LIMIT}`,
    getAllUser
  );
  const { data: metrics, isLoading: isMetricsLoading } = useSWR(
    "/admin/metrics",
    dashboardMetrics
  );

  const handleNext = () => {
    if (data?.length == LIMIT) {
      setSkip((s) => s + LIMIT);
    }
  };
  const handlePrev = () => {
    if (skip >= LIMIT) {
      setSkip((prev) => prev - LIMIT);
    }
  };
  return (
    <div>
      {/* Header & Bulk Actions */}
      <div className="flex gap-6 flex-wrap mb-6">
        <MetricsBoard
          loading={isMetricsLoading}
          title="Total users"
          value={metrics?.total_users}
        />
        <MetricsBoard
          loading={isMetricsLoading}
          title="Active users"
          value={metrics?.active_users}
        />
        <MetricsBoard
          loading={isMetricsLoading}
          title="Total Posts"
          value={metrics?.total_posts}
        />
        <MetricsBoard
          loading={isMetricsLoading}
          title="Active Posts"
          value={metrics?.active_posts}
        />
        <MetricsBoard
          loading={isMetricsLoading}
          title="New Users in 24hrs"
          value={metrics?.new_users_24h}
        />
        <MetricsBoard
          loading={isMetricsLoading}
          title="Profile completion rate"
          value={metrics?.profile_completion_rate}
        />
        <MetricsBoard
          loading={isMetricsLoading}
          title="Total recruiters"
          value={metrics?.recruiters}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users…"
            className="pl-10 pr-4 py-2 border rounded w-64 focus:border-primary outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-primary text-white rounded">
            Bulk Suspend
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50">
            Export
          </button>
        </div>
      </div>
      {/* User Table */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={skip === 0}
          className="px-4 py-2 bg-white border border-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {skip / LIMIT + 1}</span>
        <button
          onClick={handleNext}
          disabled={data.length < LIMIT}
          className="px-4 py-2 bg-white border border-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <Skeleton loading={isLoading}>
        <table className="min-w-full bg-white  rounded-lg overflow-hidden">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="p-2">
                <input type="checkbox" />
              </th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Industry</th>
              <th className="p-2 text-left">Company</th>
              <th className="p-2 text-left">Job Title</th>
              {/* <th className="p-2 text-left">Recruiter</th> */}
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <UserRow user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      </Skeleton>
    </div>
  );
}

function UserRow({ user }: { user: TUser }) {
  return (
    <tr key={user.id} className="hover:bg-gray-50 ">
      <td className="p-2">
        <input type="checkbox" />
      </td>
      <td className="p-2">{user.full_name}</td>
      <td className="p-2">{user.industry}</td>
      <td className="p-2">{user.company || "nil"}</td>
      <td className="p-2">{user.job_title}</td>
      <td className="p-2">
        <Link href={`/user/${user.id}`}>View</Link>
      </td>
      {/* <td className="p-2">{user.recruiter_tag}</td> */}
    </tr>
  );
}

function MetricsBoard({
  loading,
  title,
  value,
}: {
  loading: boolean;
  title: string;
  value?: string | number;
}) {
  return (
    <Skeleton loading={loading}>
      <div className="flex flex-col gap-3 border p-2">
        <p>{title}</p>
        <div>{value}</div>
      </div>
    </Skeleton>
  );
}
