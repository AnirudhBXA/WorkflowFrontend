import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import LeaveBriefCard from "./LeaveBriefCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}/${date.getFullYear()}`;
}

export default function LeaveApprovalComponent() {
  const [leavesList, setLeavesList] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 5;
  const totalPages = Math.ceil(leavesList.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedLeaves = leavesList.slice(startIndex, startIndex + PAGE_SIZE);

  useEffect(() => {
    axiosInstance.get("/leaves").then((res) => {
      setLeavesList(res.data || []);
      setLoading(false);
    });
  }, []);

  const handleStatusUpdate = async (decision, taskId) => {
    await axiosInstance.post(`/leaves/workflow/tasks/${taskId}/complete`, {
      decision,
    });
    setLeavesList((prev) =>
      prev.map((leave) =>
        leave.taskId === taskId ? { ...leave, status: decision } : leave,
      ),
    );
    setSelectedLeave(null);
  };

  const badge = (status) => {
    const map = {
      APPROVED: "bg-emerald-500/10 text-emerald-400",
      PENDING: "bg-amber-500/10 text-amber-400",
      REJECTED: "bg-rose-500/10 text-rose-400",
    };
    return (
      <span
        className={`px-3 py-1 rounded-lg text-xs font-semibold ${map[status]}`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 border-t-4 border-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {selectedLeave && (
        <LeaveBriefCard
          leave={selectedLeave}
          onClose={() => setSelectedLeave(null)}
          onApprove={() => handleStatusUpdate("APPROVED", selectedLeave.taskId)}
          onReject={() => handleStatusUpdate("REJECTED", selectedLeave.taskId)}
        />
      )}

      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#0B1220] text-slate-500">
              <tr>
                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Employee
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap">Leave</th>
                <th className="px-6 py-4 text-left whitespace-nowrap">From</th>
                <th className="px-6 py-4 text-left whitespace-nowrap">To</th>
                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {paginatedLeaves.map((item) => (
                <tr key={item.id} className="hover:bg-[#0B1220] transition">
                  <td className="px-6 py-4 text-slate-200 whitespace-nowrap">
                    {item.empEmail}
                  </td>
                  <td className="px-6 py-4 text-slate-300 whitespace-nowrap">
                    {item.leaveType}
                  </td>
                  <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                    {formatDateToDDMMYYYY(item.startDate)}
                  </td>
                  <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                    {formatDateToDDMMYYYY(item.endDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {badge(item.status)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedLeave(item)}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#0B1220]">
            <span className="text-xs text-slate-500">
              Page {page} of {totalPages}
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} />
              </button>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
