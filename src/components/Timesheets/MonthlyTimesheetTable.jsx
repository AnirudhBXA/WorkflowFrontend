export default function MonthlyTimesheetTable({ data }) {
  const badge = (status) =>
    status === "APPROVED"
      ? "bg-emerald-500/10 text-emerald-400"
      : status === "PENDING"
      ? "bg-amber-500/10 text-amber-400"
      : "bg-rose-500/10 text-rose-400";

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 text-sm font-bold uppercase text-slate-300">
        Monthly Summary
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left">Period</th>
              <th className="px-6 py-4 text-left">Recorded</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#0B1220] transition">
                <td className="px-6 py-5 text-slate-300 font-semibold">
                  {row.weekStart} – {row.weekEnd}
                </td>
                <td className="px-6 py-5 font-bold text-white">
                  {row.hoursWorked}
                  <span className="text-xs text-slate-400 ml-1">hrs</span>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
