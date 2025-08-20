"use client";
import { getAllPost } from "@/functions/posts";
import { ChangeEvent, useMemo, useState } from "react";
import useSWR from "swr";

import { Eye, Filter, RefreshCw } from "lucide-react";
import { Skeleton } from "@radix-ui/themes";
import { formatNumber } from "../analytics/utils";
import { TPost, TPostAndAnalytics } from "@/types/posts";
import Link from "next/link";

function buildQuery(params: { is_active?: string; industries?: string[] }) {
  const qs = new URLSearchParams();
  if (params.is_active === "true" || params.is_active === "false") {
    qs.append("is_active", params.is_active);
  }
  params.industries?.forEach((ind) => {
    const v = ind.trim();
    if (v) qs.append("industries", v);
  });
  return qs.toString();
}

function formatDate(iso?: string) {
  return iso ? new Date(iso).toLocaleString() : "-";
}

export default function PostsPage() {
  // filters
  const [isActive, setIsActive] = useState<string>(""); // '', 'true', 'false'
  const [industriesInput, setIndustriesInput] = useState<string>(""); // comma separated
  const [queryString, setQueryString] = useState<string>(""); // used to trigger SWR

  const query = useMemo(() => {
    const industries = industriesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return buildQuery({ is_active: isActive, industries });
  }, [isActive, industriesInput]);

  const { data, error, isLoading } = useSWR(`/admin/posts?${queryString}`, () =>
    getAllPost("", { arg: { query: queryString } })
  );

  const posts = (data || []) as TPostAndAnalytics[];

  // modal state
  const [openId, setOpenId] = useState<string | null>(null);

  const applyFilters = () => setQueryString(query);
  const resetFilters = () => {
    setIsActive("");
    setIndustriesInput("");
    setQueryString(""); // fetch all
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Posts</h1>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-lg bg-white  border border-gray-200 ">
        <div className="flex items-center gap-2 text-gray-700  mb-3">
          <Filter size={18} />
          <h2 className="font-semibold">Filters</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <label className="block">
            <span className="text-xs text-gray-500">Active</span>
            <select
              value={isActive}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setIsActive(e.target.value)
              }
              className="mt-1 w-full rounded border p-2"
            >
              <option value="">Any</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </label>
          <label className="block col-span-2">
            <span className="text-xs text-gray-500">
              Industries (comma separated)
            </span>
            <input
              type="text"
              value={industriesInput}
              onChange={(e) => setIndustriesInput(e.target.value)}
              placeholder="e.g. fintech, healthcare, education"
              className="mt-1 w-full rounded border p-2"
            />
          </label>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={applyFilters}
            className="px-3 py-2 rounded bg-primary text-white"
          >
            Apply
          </button>
          <button
            onClick={resetFilters}
            className="px-3 py-2 rounded border border-gray-300 flex items-center gap-2"
          >
            <RefreshCw size={16} /> Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <Skeleton loading={isLoading}>
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="p-2 text-left">Title / Snippet</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Industry</th>
              <th className="p-2 text-left">Author</th>
              <th className="p-2 text-left">Created</th>
              <th className="p-2 text-left">Active</th>
              <th className="p-2 text-right">Engagement</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => {
              const p = post.post;
              return (
                <tr key={p.id} className="hover:bg-gray-50  align-top">
                  <td className="p-2 max-w-[320px]">
                    <div
                      className="font-medium truncate"
                      title={p.title || p.content}
                    >
                      {p.title || p.content?.slice(0, 80) || "Untitled"}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {p.content}
                    </div>
                  </td>
                  <td className="p-2 text-sm capitalize">
                    {p.post_type || "-"}
                  </td>
                  <td className="p-2 text-sm">{p.industry || "-"}</td>
                  <td className="p-2 text-sm">
                    {p.user?.full_name || p.username || "—"}
                  </td>
                  <td className="p-2 text-sm">{formatDate(p.created_at)}</td>
                  <td className="p-2">
                    {p.is_active ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-0.5 rounded text-xs">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-2 text-right text-sm whitespace-nowrap">
                    <span title="Comments">
                      💬 {formatNumber(p.total_comments)}
                    </span>
                    <span className="ml-2" title="Reactions">
                      👍 {formatNumber(p.total_reactions)}
                    </span>
                    <span className="ml-2" title="Reposts">
                      🔁 {formatNumber(p.total_reposts)}
                    </span>
                  </td>
                  <td className="p-2 text-right">
                    <Link
                      href={`/posts/${p.id}`}
                      onClick={() => setOpenId(p.id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-gray-300 hover:bg-gray-50"
                    >
                      <Eye size={16} /> View
                    </Link>
                  </td>
                </tr>
              );
            })}
            {posts.length === 0 && (
              <tr>
                <td colSpan={8} className="p-4 text-sm text-gray-500">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Skeleton>
    </div>
  );
}
