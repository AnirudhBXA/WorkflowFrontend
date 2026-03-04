import { User } from "lucide-react";
export default function MonthlyTimesheetTable({ data }) {
  const badge = (status) =>
    status === "APPROVED"
      ? "bg-emerald-500/10 text-emerald-400"
      : status === "REJECTED"
        ? "bg-rose-500/10 text-rose-400"
        : "bg-slate-500/10 text-slate-400";

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 text-sm font-bold uppercase text-slate-300">
        Monthly Summary
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left">Timesheet ID</th>
              <th className="px-6 py-4 text-left">Employee</th>
              <th className="px-6 py-4 text-left">Week Range</th>
              <th className="px-6 py-4 text-left">Hours</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Created At</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#0B1220] transition">
                <td className="px-6 py-5 text-slate-400">{row.timesheetId}</td>
                <td className="px-6 py-5 text-slate-300 font-semibold">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/10 flex items-center justify-center text-indigo-400">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">
                        {row?.employee?.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-slate-300 font-semibold">
                  {formatDate(row.weekStart)} – {formatDate(row.weekEnd)}
                </td>
                <td className="px-6 py-5 font-bold text-indigo-400">
                  {row.hoursWorked} hrs
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${badge(
                      row.status,
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-slate-400">
                  {formatDateTime(row.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
