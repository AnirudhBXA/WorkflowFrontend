// import { ShieldCheck, ArrowRight } from "lucide-react";

// export default function CertificationApprovalComponent({ items, setSelected }) {
//   return (
//     <div className="space-y-6 pt-6 border-t border-dashed border-gray-200">
//       <div className="flex items-center gap-2 px-2">
//         <ShieldCheck className="w-6 h-6 text-indigo-600" />
//         <h2 className="text-xl font-bold text-gray-900 tracking-tight">
//           Pending Verifications
//         </h2>
//       </div>

//       <div className="bg-white rounded-4xl shadow-sm border border-indigo-50 overflow-hidden">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
//               <th className="px-8 py-5 text-left">Employee</th>
//               <th className="px-8 py-5 text-left">Certification</th>
//               <th className="px-8 py-5 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {items.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="3"
//                   className="px-8 py-10 text-center text-gray-400 font-medium"
//                 >
//                   No pending certifications to review.
//                 </td>
//               </tr>
//             ) : (
//               items.map((item) => (
//                 <tr
//                   key={item.certId}
//                   className="group hover:bg-indigo-50/30 transition-colors cursor-pointer"
//                   onClick={() => setSelected(item)}
//                 >
//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-3">
//                       <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 font-black text-xs">
//                         {item.employee.name.charAt(0)}
//                       </div>
//                       <span className="font-bold text-gray-900">
//                         {item.employee.name}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-8 py-6 font-bold text-gray-700">
//                     {item.certificationName}
//                   </td>
//                   <td className="px-8 py-6 text-center">
//                     <div className="inline-flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase group-hover:gap-4 transition-all">
//                       Review <ArrowRight size={14} />
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// import { ShieldCheck, ArrowRight } from "lucide-react";

// export default function CertificationApprovalComponent({ items, setSelected }) {
//   return (
//     <div className="space-y-6 pt-6 border-t border-slate-800">
//       <div className="flex items-center gap-2">
//         <ShieldCheck className="w-5 h-5 text-indigo-400" />
//         <h2 className="text-lg font-bold text-white">
//           Pending Verifications
//         </h2>
//       </div>

//       <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
//             <tr>
//               <th className="px-6 py-5 text-left">Employee</th>
//               <th className="px-6 py-5 text-left">Certification</th>
//               <th className="px-6 py-5 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-slate-800">
//             {items.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="3"
//                   className="px-6 py-10 text-center text-slate-500"
//                 >
//                   No pending certifications to review
//                 </td>
//               </tr>
//             ) : (
//               items.map((item) => (
//                 <tr
//                   key={item.certId}
//                   onClick={() => setSelected(item)}
//                   className="hover:bg-[#0B1220] transition cursor-pointer"
//                 >
//                   <td className="px-6 py-6">
//                     <div className="flex items-center gap-3">
//                       <div className="w-9 h-9 rounded-lg bg-indigo-600/10 text-indigo-400 font-bold flex items-center justify-center text-xs">
//                         {item.employee.name.charAt(0)}
//                       </div>
//                       <span className="font-semibold text-slate-200">
//                         {item.employee.name}
//                       </span>
//                     </div>
//                   </td>

//                   <td className="px-6 py-6 text-slate-300 font-semibold">
//                     {item.certificationName}
//                   </td>

//                   <td className="px-6 py-6 text-center">
//                     <div className="inline-flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase">
//                       Review <ArrowRight size={14} />
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import {
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

export default function CertificationApprovalComponent({ items, setSelected }) {
  const PAGE_SIZE = 5;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedItems = items.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="space-y-6 pt-6 border-t border-slate-800">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-bold text-white">Pending Verifications</h2>
      </div>

      <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-5 text-left">Employee</th>
              <th className="px-6 py-5 text-left">Certification</th>
              <th className="px-6 py-5 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {paginatedItems.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-10 text-center text-slate-500"
                >
                  No pending certifications to review
                </td>
              </tr>
            ) : (
              paginatedItems.map((item) => (
                <tr
                  key={item.certId}
                  onClick={() => setSelected(item)}
                  className="hover:bg-[#0B1220] transition cursor-pointer"
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-600/10 text-indigo-400 font-bold flex items-center justify-center text-xs">
                        {item.employee.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-200">
                        {item.employee.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-6 text-slate-300 font-semibold">
                    {item.certificationName}
                  </td>

                  <td className="px-6 py-6 text-center">
                    <div className="inline-flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase">
                      Review <ArrowRight size={14} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

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
    </div>
  );
}
