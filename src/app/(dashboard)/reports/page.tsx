// app/reports/page.tsx (Reports List & Actions)
"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";

import { Skeleton } from "@radix-ui/themes";
import { getAllReports, resolveReport } from "@/functions/reports";
// import { report } from "process";

// interface Report {
//   id: number;
//   reporter_name: string;
//   reported_user_name: string;
//   content_type: string;
//   report_type: string;
//   title: string;
//   status: string;
//   priority: string;
//   created_at: string;
// }

export default function ReportsPage() {
  const LIMIT = 50;
  const [skip, setSkip] = useState(0);
  const { data, error, isLoading, mutate } = useSWR(
    `/admin/reports?skip=${skip}&limit=${LIMIT}`,
    () => getAllReports({ skip, limit: LIMIT })
  );

  const handleResolve = async (id: number, notes: string) => {
    await resolveReport(id, notes);
    mutate();
  };

  const reports = data || [];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Reports</h1>

      <Skeleton loading={isLoading}>
        {reports.map((report, i) => {
          return (
            <table
              className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
              key={i}
            >
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Reporter</th>
                  <th className="p-2 text-left">Reported User</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Priority</th>
                  <th className="p-2 text-left">Created</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {report.reports.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-2">{r.id}</td>
                    <td className="p-2">{r.reporter_name}</td>
                    <td className="p-2">{r.reported_user_name}</td>
                    <td className="p-2">{r.report_type}</td>
                    <td className="p-2">{r.title}</td>
                    <td className="p-2">{r.status}</td>
                    <td className="p-2">{r.priority}</td>
                    <td className="p-2">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="px-3 py-1 bg-primary text-white rounded">
                            Resolve
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <h2 className="text-lg font-bold mb-2">
                            Resolve Report #{r.id}
                          </h2>
                          <textarea
                            id="notes"
                            rows={4}
                            placeholder="Enter resolution notes..."
                            className="w-full p-2 border rounded mb-4"
                          />
                          <button
                            onClick={() => {
                              const notesEl = document.getElementById(
                                "notes"
                              ) as HTMLTextAreaElement;
                              handleResolve(r.id, notesEl.value);
                            }}
                            className="px-4 py-2 bg-primary text-white rounded"
                          >
                            Submit
                          </button>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })}
      </Skeleton>

      {error && <p className="mt-4 text-red-500">Failed to load reports.</p>}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => skip >= LIMIT && setSkip(skip - LIMIT)}
          disabled={skip === 0}
          className="px-4 py-2 bg-white border border-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {skip / LIMIT + 1}</span>
        {/* <button
          onClick={() =>
            reports.reports.length === LIMIT && setSkip(skip + LIMIT)
          }
          disabled={reports.length < LIMIT}
          className="px-4 py-2 bg-white border border-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button> */}
      </div>
    </div>
  );
}
