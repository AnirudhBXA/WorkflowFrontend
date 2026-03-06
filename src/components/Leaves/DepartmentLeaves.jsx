import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import LeaveBriefCard from "./LeaveBriefCard";

function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}/${date.getFullYear()}`;
}

export default function DepartmentLeaves() {
  const [leavesList, setLeavesList] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0); // backend uses 0 index
  const [totalPages, setTotalPages] = useState(0);

  const PAGE_SIZE = 5;

  useEffect(() => {
    fetchDepartmentLeaves();
  }, [page]);

  async function fetchDepartmentLeaves() {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/leaves/dept-leaves", {
        params: {
          page: page,
        },
      });

      setLeavesList(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } finally {
      setLoading(false);
    }
  }

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
              <th className="px-6 py-4 text-left">Leave Id</th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">Employee Email</th>
              <th className="px-6 py-4 text-left">From</th>
              <th className="px-6 py-4 text-left">To</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {leavesList.map((item) => (
              <tr key={item.leaveId} className="hover:bg-[#0B1220]">
                <td className="px-6 py-4 text-slate-200">{item.leaveId}</td>
                <td className="px-6 py-4 text-slate-300">{item.leaveType}</td>
                <td className="px-6 py-4 text-slate-400">{item.email}</td>

                <td className="px-6 py-4 text-slate-400">
                  {formatDateToDDMMYYYY(item.startDate)}
                </td>

                <td className="px-6 py-4 text-slate-400">
                  {formatDateToDDMMYYYY(item.endDate)}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedLeave(item)}
                    className="px-3 py-1 text-xs cursor-pointer font-semibold rounded-lg bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#0B1220]">
            <span className="text-xs text-slate-500">
              Page {page + 1} of {totalPages}
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="py-2 px-4 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40"
              >
                ‹
              </button>

              <button
                disabled={page === totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="py-2 px-4 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
