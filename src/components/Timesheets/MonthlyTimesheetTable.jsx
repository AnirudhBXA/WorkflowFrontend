// export default function MonthlyTimesheetTable({ data }) {
//   const badge = (status) =>
//     status === "Approved"
//       ? "bg-emerald-50 text-emerald-700 border-emerald-100"
//       : "bg-amber-50 text-amber-700 border-amber-100";

//   return (
//     <div className="bg-white rounded-4xl shadow-sm border border-indigo-50 overflow-hidden">
//       <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/30 font-black text-sm text-gray-800 uppercase tracking-tight">
//         Monthly Summary
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50/50">
//               <th className="px-8 py-4 text-left">Period</th>
//               <th className="px-8 py-4 text-left">Recorded</th>
//               <th className="px-8 py-4 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {data.map((row, idx) => (
//               <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
//                 <td className="text-[11px] px-8 py-5 text-sm font-bold text-gray-700">
//                   {row.weekStart} <br></br> - {row.weekEnd}
//                 </td>
//                 <td className="px-8 py-5 text-sm font-black text-gray-900">
//                   {row.hoursWorked}{" "}
//                   <span className="text-[10px] text-gray-400 font-bold uppercase">
//                     hrs
//                   </span>
//                 </td>
//                 <td className="px-8 py-5">
//                   <span
//                     className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${badge(row.status)}`}
//                   >
//                     {row.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

export default function MonthlyTimesheetTable({ data }) {
  const badge = (status) =>
    status === "Approved"
      ? "bg-emerald-500/10 text-emerald-400"
      : "bg-amber-500/10 text-amber-400";

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
