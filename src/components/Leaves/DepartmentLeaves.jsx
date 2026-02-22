import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import LeaveBriefCard from "./LeaveBriefCard";

function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

export default function DepartmentLeaves() {
  const [leavesList, setLeavesList] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/leaves/dept-leaves").then((res) => {
      setLeavesList(res.data || []);
      setLoading(false);
    });
  }, []);

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
        />
      )}

      <div className="overflow-hidden rounded-xl border border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-[#0B1220] text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left">Employee</th>
              <th className="px-6 py-4 text-left">Leave</th>
              <th className="px-6 py-4 text-left">From</th>
              <th className="px-6 py-4 text-left">To</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Reason</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {leavesList.map((item) => (
              <tr key={item.id} className="hover:bg-[#0B1220]">
                <td className="px-6 py-4 text-slate-200">{item.name}</td>
                <td className="px-6 py-4 text-slate-300">{item.leaveType}</td>
                <td className="px-6 py-4 text-slate-400">
                  {formatDateToDDMMYYYY(item.startDate)}
                </td>
                <td className="px-6 py-4 text-slate-400">
                  {formatDateToDDMMYYYY(item.endDate)}
                </td>
                <td className="px-6 py-4">{badge(item.status)}</td>
                <td className="px-6 py-4 text-slate-400">{item.reason}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedLeave(item)}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
