"use client";

import React, { useMemo, useState } from "react";
import useSWR from "swr";

import { Search, UserPlus, ShieldCheck, ShieldOff } from "lucide-react";
import {
  getAllModerators,
  makeUserAModerator,
  removeAModerator,
} from "@/functions/moderators";
import { TModerator } from "@/types/moderators";
import { Skeleton } from "@radix-ui/themes";
import useSWRMutation from "swr/mutation";

export default function ModeratorsPage() {
  const { data, isLoading, mutate } = useSWR(
    "/admin/moderators/",
    getAllModerators
  );
  const { trigger: makeModerator } = useSWRMutation(
    "/admin/moderators/",
    makeUserAModerator
  );
  const { trigger: removeModerator } = useSWRMutation(
    "/admin/moderators/",
    removeAModerator
  );
  const [filter, setFilter] = useState("");
  const [userId, setUserId] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const rows = (data || []) as TModerator[];
    if (!filter.trim()) return rows;
    const q = filter.toLowerCase();
    return rows.filter((m) =>
      [m.full_name, m.email, m.id].some((v) => v?.toLowerCase().includes(q))
    );
  }, [data, filter]);

  const handleMake = async () => {
    const id = userId.trim();
    if (!id) return;
    setBusyId(id);
    try {
      await makeModerator({ user_id: id });
      setUserId("");
      await mutate();
    } finally {
      removeModerator({ user_id: id });
    }
  };

  const handleToggle = async (m: TModerator) => {
    setBusyId(m.id);
    try {
      if (m.is_moderator) {
        await removeAModerator("", { arg: { user_id: m.id } });
      } else {
        await makeUserAModerator("", { arg: { user_id: m.id } });
      }
      await mutate();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Moderators</h1>

      {/* Add moderator */}
      <div className="p-4 rounded-lg bg-white  border border-gray-200 ">
        <div className="flex items-end gap-3 flex-wrap">
          <div className="flex-1 min-w-[260px]">
            <label className="block text-xs text-gray-500">User ID</label>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user_id to promote"
              className="mt-1 w-full rounded border p-2"
            />
          </div>
          <button
            onClick={handleMake}
            disabled={!userId.trim() || !!busyId}
            className="inline-flex items-center gap-2 px-3 py-2 rounded bg-primary text-white disabled:opacity-50"
          >
            <UserPlus size={16} /> Make Moderator
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 max-w-md">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            placeholder="Search by name, email, or id…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-9 pr-3 py-2 w-full rounded border"
          />
        </div>
      </div>

      {/* Table */}
      <Skeleton loading={isLoading}>
        <table className="min-w-full bg-white  rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">User ID</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50 ">
                <td className="p-2">{m.full_name}</td>
                <td className="p-2">{m.email}</td>
                <td className="p-2 text-xs text-gray-500">{m.id}</td>
                <td className="p-2">
                  {m.is_moderator ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                      <ShieldCheck size={14} /> Moderator
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-0.5 rounded text-xs">
                      Member
                    </span>
                  )}
                </td>
                <td className="p-2 text-right">
                  <button
                    onClick={() => handleToggle(m)}
                    disabled={busyId === m.id}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded border ${
                      m.is_moderator
                        ? "border-rose-300 text-rose-700 hover:bg-rose-50"
                        : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    } disabled:opacity-50`}
                    title={
                      m.is_moderator ? "Remove moderator" : "Make moderator"
                    }
                  >
                    {m.is_moderator ? (
                      <ShieldOff size={16} />
                    ) : (
                      <ShieldCheck size={16} />
                    )}
                    {m.is_moderator ? "Remove" : "Make"}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-sm text-gray-500">
                  No moderators found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Skeleton>
    </div>
  );
}
