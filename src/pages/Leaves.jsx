import { useEffect, useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import ValuesDisplayCard from "../components/ValuesDisplayCard";
import LeaveApprovalComponent from "../components/Leaves/LeaveApproval";
import { AuthContext } from "../context/AuthContext";
import DepartmentLeaves from "../components/Leaves/DepartmentLeaves";
import { FileText, UserCheck, Briefcase } from "lucide-react";

export default function LeavesComponent() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ available: 0, used: 0 });
  const [leavesList, setLeavesList] = useState([]);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 6;
  const totalPages = Math.ceil(leavesList.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedLeaves = leavesList.slice(startIndex, startIndex + PAGE_SIZE);
  useEffect(() => {
    async function fetchLeaves() {
      try {
        const res = await axiosInstance.get("/leaves/me");
        const leaves = res.data || [];
        setLeavesList(leaves);

        // ✅ Only count approved leaves
        const totalDaysUsed = leaves.reduce((sum, leave) => {
          if (leave.status === "APPROVED") {
            const start = new Date(leave.startDate);
            const end = new Date(leave.endDate);
            const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1; // inclusive
            return sum + days;
          }
          return sum;
        }, 0);

        const totalAllowance = 30; // fixed annual allowance
        setSummary({
          available: Math.max(totalAllowance - totalDaysUsed, 0),
          used: totalDaysUsed,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchLeaves();
  }, []);

  const statusBadge = (status) => {
    const map = {
      APPROVED: "bg-emerald-500/10 text-emerald-400",
      PENDING: "bg-amber-500/10 text-amber-400",
      REJECTED: "bg-rose-500/10 text-rose-400",
    };
    return (
      <span
        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${map[status]}`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-t-4 border-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Leave Management
        </h1>
        <p className="text-slate-400 mt-1">
          Track your time-off and department requests
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <ValuesDisplayCard
          data={{
            context: "Available Balance",
            value: summary.available,
            units: "Days",
          }}
        />
        <ValuesDisplayCard
          data={{
            context: "Utilized Leaves",
            value: summary.used,
            units: "Days",
          }}
        />
      </div>

      <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <h2 className="font-bold text-white">My Leave History</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">Timeline</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {paginatedLeaves.map((item) => (
              <tr key={item.id} className="hover:bg-[#0B1220] transition">
                <td className="px-6 py-5 font-semibold text-slate-200">
                  {item.leaveType}
                </td>
                <td className="px-6 py-5 text-slate-400">
                  {new Date(item.startDate).toLocaleDateString()} →{" "}
                  {new Date(item.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-5">{statusBadge(item.status)}</td>
                <td className="px-6 py-5 text-slate-400 truncate max-w-xs">
                  {item.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      {user?.role === "MANAGER" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">
              Subordinate Approvals
            </h2>
          </div>
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <LeaveApprovalComponent />
          </div>
        </div>
      )}

      {user?.role === "HR" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">
              Organization Overview
            </h2>
          </div>
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <DepartmentLeaves />
          </div>
        </div>
      )}
    </div>
  );
}
