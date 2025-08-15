// app/reports/page.tsx (Reports List & Actions)
"use client";

import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { Skeleton } from "@radix-ui/themes";
import {
  getAllReports,
  resolveReport,
  updateReport,
} from "@/functions/reports";
import { TReportType } from "@/types/reports";
import CPModal from "@/components/CPModal";
import useSWRMutation from "swr/mutation";
import { successMessage } from "@/utils/toastalert";
import CPbutton, { CPbuttonTwo } from "@/components/CPbutton";

export default function ReportsPage() {
  const LIMIT = 50;
  const [skip, setSkip] = useState(0);
  const [activeReport, setActiveReport] = useState<null | TReportType>(null);
  const { data, error, isLoading, mutate } = useSWR(
    `/admin/reports?skip=${skip}&limit=${LIMIT}`,
    () => getAllReports({ skip, limit: LIMIT })
  );

  const reports = data;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Reports</h1>

      <Skeleton loading={isLoading} height={"500px"}>
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
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
            {reports?.reports.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
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
                  <button
                    className="px-3 py-1 bg-primary text-white rounded"
                    onClick={() => {
                      setActiveReport(r);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Skeleton>
      {activeReport && (
        <ReportModal
          report={activeReport}
          onClose={() => setActiveReport(null)}
        />
      )}
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
        <button
          onClick={() =>
            reports?.reports.length === LIMIT && setSkip(skip + LIMIT)
          }
          disabled={(reports?.reports.length || 0) < LIMIT}
          className="px-4 py-2 bg-white border border-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export type TReportEdit = Pick<
  TReportType,
  | "status"
  | "priority"
  | "assigned_to"
  | "resolution_notes"
  | "escalated_to"
  | "escalation_reason"
>;

export function ReportModal({
  report,
  onClose,
}: {
  report: TReportType;
  onClose: () => void;
}) {
  const { trigger } = useSWRMutation(`reports/${report.id}`, updateReport);
  const [form, setForm] = useState<TReportEdit>(() => ({
    status: report.status,
    priority: report.priority,
    assigned_to: report.assigned_to || "",
    resolution_notes: report.resolution_notes || "",
    escalated_to: report.escalated_to || "",
    escalation_reason: report.escalation_reason || "",
  }));

  // Refill when a different report is opened
  useEffect(() => {
    setForm({
      status: report.status,
      priority: report.priority,
      assigned_to: report.assigned_to || "",
      resolution_notes: report.resolution_notes || "",
      escalated_to: report.escalated_to || "",
      escalation_reason: report.escalation_reason || "",
    });
  }, [report]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = async (payload: TReportEdit) => {
    for (const key in payload) {
      if (payload[key] == "") {
        delete payload[key];
      }
    }
    try {
      await trigger(payload);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const onResolve = async (id: number, notes: string) => {
    try {
      await resolveReport(id, notes);
      successMessage("Resolved succesfully");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const createdAt = useMemo(
    () => new Date(report.created_at).toLocaleString(),
    [report.created_at]
  );

  return (
    <CPModal width={680} backgroundAction={onClose} zIndex={60}>
      <div className="p-5">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Report #{report.id}: {report.title}
            </h3>
            <p className="text-sm text-gray-500">Created: {createdAt}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Read-only details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs text-gray-500">Reporter</label>
            <div className="text-sm font-medium">{report.reporter_name}</div>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Reported User</label>
            <div className="text-sm font-medium">
              {report.reported_user_name}
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Type</label>
            <div className="text-sm">{report.report_type}</div>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Content URL</label>
            <a
              href={report.content_url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-primary underline"
            >
              {report.content_url}
            </a>
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-500">Description</label>
            <div className="text-sm whitespace-pre-wrap">
              {report.description}
            </div>
          </div>
          {report.evidence_urls?.length ? (
            <div className="col-span-2">
              <label className="block text-xs text-gray-500 mb-1">
                Evidence
              </label>
              <ul className="list-disc pl-5 space-y-1">
                {report.evidence_urls.map((u, i) => (
                  <li key={i}>
                    <a
                      href={u}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      {u}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Editable controls (prefilled from report) */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <label className="block">
            <span className="block text-xs text-gray-500">Status</span>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 w-full rounded border p-2"
            >
              {/* adjust options to match your backend enums */}
              <option value="new">new</option>
              <option value="investigating">investigating</option>
              <option value="resolved">resolved</option>
              <option value="escalated">escalated</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-xs text-gray-500">Priority</span>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="mt-1 w-full rounded border p-2"
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
              <option value="critical">critical</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-xs text-gray-500">
              Assigned To (Moderator ID)
            </span>
            <input
              type="text"
              name="assigned_to"
              value={form.assigned_to}
              onChange={handleChange}
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <div />
          <label className="block col-span-2">
            <span className="block text-xs text-gray-500">
              Resolution Notes
            </span>
            <textarea
              name="resolution_notes"
              rows={3}
              value={form.resolution_notes}
              onChange={handleChange}
              className="mt-1 w-full rounded border p-2"
              placeholder="Add internal notes or final resolution"
            />
          </label>
          <label className="block">
            <span className="block text-xs text-gray-500">
              Escalate To (Team/ID)
            </span>
            <input
              type="text"
              name="escalated_to"
              value={form.escalated_to}
              onChange={handleChange}
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="block">
            <span className="block text-xs text-gray-500">
              Escalation Reason
            </span>
            <input
              type="text"
              name="escalation_reason"
              value={form.escalation_reason}
              onChange={handleChange}
              className="mt-1 w-full rounded border p-2"
            />
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300"
          >
            Cancel
          </button>
          {onSave && (
            <button
              onClick={() => onSave(form)}
              className="px-4 py-2 rounded bg-white border border-gray-300 hover:bg-gray-50"
            >
              Save changes
            </button>
          )}
          {onResolve && (
            <CPbutton
              onClick={() => onResolve(report.id, form.resolution_notes)}
              disabled={!form.resolution_notes?.trim()}
              title={
                !form.resolution_notes?.trim()
                  ? "Add resolution notes first"
                  : ""
              }
            >
              Mark as Resolved
            </CPbutton>
          )}
        </div>
      </div>
    </CPModal>
  );
}
