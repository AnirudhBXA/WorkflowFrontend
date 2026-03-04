import { Check, X, User, Loader2 } from "lucide-react";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "sonner";

export default function ManagerTimesheetApprovalTable({
  data,
  onActionComplete,
}) {
  const [loadingAction, setLoadingAction] = useState({
    taskId: null,
    decision: null,
  });
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedData = data.slice(startIndex, startIndex + PAGE_SIZE);

  async function handleApprovalTask(taskId, decision) {
    try {
      setLoadingAction({ taskId, decision });

      try {
        await axiosInstance.post(`/timesheets/tasks/${taskId}/complete`, {
          managerDecision: decision,
        });
        toast.success(`Timesheet ${decision} successfully!`);
      } catch (err) {
        toast.error(
          err?.response?.data?.message || err?.message || "Failed to update",
        );
      }

      onActionComplete();
    } catch {
      toast.error("Failed to update the status");
    } finally {
      setLoadingAction({ taskId: null, decision: null });
    }
  }

  const statusBadge = (status) => {
    const map = {
      APPROVED: "bg-emerald-500/10 text-emerald-400",
      PENDING: "bg-amber-500/10 text-amber-400",
      REJECTED: "bg-rose-500/10 text-rose-400",
    };
    return (
      <span
        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${
          map[status] || "bg-slate-500/10 text-slate-400"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase text-slate-300">
          Team Approvals
        </h3>
        <span className="bg-indigo-600/10 text-indigo-400 text-xs font-bold px-2 py-1 rounded-md">
          {data.length} Pending
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left">Timesheet ID</th>
              <th className="px-6 py-4 text-left">Member</th>
              <th className="px-6 py-4 text-left">Week Range</th>
              <th className="px-6 py-4 text-left">Hours</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {paginatedData.map((row) => {
              const isApproveLoading =
                loadingAction.taskId === row.taskId &&
                loadingAction.decision === "APPROVED";
              const isRejectLoading =
                loadingAction.taskId === row.taskId &&
                loadingAction.decision === "REJECTED";

              return (
                <tr key={row.taskId} className="hover:bg-[#0B1220] transition">
                  <td className="px-6 py-5 text-slate-400">
                    {row.timesheetId}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/10 flex items-center justify-center text-indigo-400">
                        <User size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-200">
                          {row.employee.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-slate-400">
                    {row.weekStart} – {row.weekEnd}
                  </td>

                  <td className="px-6 py-5 font-bold text-indigo-400">
                    {row.hoursWorked} hrs
                  </td>

                  <td className="px-6 py-5">{statusBadge(row.status)}</td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button
                        disabled={isApproveLoading}
                        onClick={() =>
                          handleApprovalTask(row.taskId, "APPROVED")
                        }
                        className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50"
                      >
                        {isApproveLoading ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <Check size={16} />
                        )}
                      </button>

                      <button
                        disabled={isRejectLoading}
                        onClick={() =>
                          handleApprovalTask(row.taskId, "REJECTED")
                        }
                        className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 disabled:opacity-50"
                      >
                        {isRejectLoading ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <X size={16} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#0B1220]">
          <span className="text-xs text-slate-500">
            Page {page} of {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="py-2 px-4 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40"
            >
              ‹
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
