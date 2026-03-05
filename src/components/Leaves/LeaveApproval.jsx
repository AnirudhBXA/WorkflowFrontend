import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import LeaveBriefCard from "./LeaveBriefCard";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const PAGE_SIZE = 5;

  useEffect(() => {
    axiosInstance.get("/leaves").then((res) => {
      setLeavesList(res.data || []);
      setLoading(false);
    });
  }, []);

  const handleStatusUpdate = async (decision, taskId) => {
    try {
      await axiosInstance.post(`/leaves/workflow/tasks/${taskId}/complete`, {
        decision,
      });
      toast.success(decision + " leave successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to Update status",
      );
    }
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

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedLeaves = [...leavesList].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (sortConfig.key === "startDate" || sortConfig.key === "endDate") {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedLeaves.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedLeaves = sortedLeaves.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 border-t-4 border-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={14} className="inline ml-1 text-indigo-400" />
      ) : (
        <ChevronDown size={14} className="inline ml-1 text-indigo-400" />
      );
    }
    return <ChevronDown size={14} className="inline ml-1 text-slate-600" />;
  };

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
            <thead className="bg-[#0B1220] text-slate-500 uppercase text-xs">
              <tr>
                <th
                  className="px-6 py-4 text-left cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  Leave Id {renderSortIcon("id")}
                </th>
                <th
                  className="px-6 py-4 text-left cursor-pointer"
                  onClick={() => handleSort("empEmail")}
                >
                  Employee {renderSortIcon("empEmail")}
                </th>
                <th
                  className="px-6 py-4 text-left cursor-pointer"
                  onClick={() => handleSort("leaveType")}
                >
                  Leave Type {renderSortIcon("leaveType")}
                </th>
                <th
                  className="px-6 py-4 text-left cursor-pointer"
                  onClick={() => handleSort("startDate")}
                >
                  From {renderSortIcon("startDate")}
                </th>
                <th
                  className="px-6 py-4 text-left cursor-pointer"
                  onClick={() => handleSort("endDate")}
                >
                  To {renderSortIcon("endDate")}
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {paginatedLeaves.map((item) => (
                <tr key={item.id} className="hover:bg-[#0B1220] transition">
                  <td className="px-6 py-4 text-slate-200">{item.id}</td>
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
                  <td className="px-4 py-6 text-center">
                    <div
                      className="inline-flex cursor-pointer items-center gap-2 text-indigo-400 font-semibold text-xs uppercase"
                      onClick={() => setSelectedLeave(item)}
                    >
                      Review <ArrowRight size={14} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 0 && (
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
