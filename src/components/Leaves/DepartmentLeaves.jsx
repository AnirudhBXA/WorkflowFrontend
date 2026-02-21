// import { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import LeaveBriefCard from "./LeaveBriefCard";

// function formatDateToDDMMYYYY(dateString) {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// }

// export default function DepartmentLeaves() {
//   const [leavesList, setLeavesList] = useState([]);
//   const [selectedLeave, setSelectedLeave] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchDepartmentLeaves = async () => {
//     try {
//       const response = await axiosInstance.get("/leaves/dept-leaves");
//       setLeavesList(response.data || []);
//       console.log("Fetched subordinate leaves:", response.data);
//     } catch (e) {
//       console.error("Error fetching subordinate leaves:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDepartmentLeaves();
//   }, []);

//   const badge = (status) => {
//     const map = {
//       APPROVED:
//         "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
//       PENDING:
//         "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
//       REJECTED: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
//     };
//     return (
//       <span
//         className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}
//       >
//         {status}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <>
//       {selectedLeave && (
//         <LeaveBriefCard
//           leave={selectedLeave}
//           onClose={() => setSelectedLeave(null)}
//         />
//       )}

//       <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
//             <tr>
//               <th className="px-6 py-3 text-left">Employee</th>
//               <th className="px-6 py-3 text-left">Leave Type</th>
//               <th className="px-6 py-3 text-left">From</th>
//               <th className="px-6 py-3 text-left">To</th>
//               <th className="px-6 py-3 text-left">Status</th>
//               <th className="px-6 py-3 text-left">Reason</th>
//               <th className="px-6 py-3 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leavesList.map((item) => (
//               <tr
//                 key={item.id}
//                 className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
//               >
//                 <td className="px-6 py-4">{item.name}</td>
//                 <td className="px-6 py-4">{item.leaveType}</td>
//                 <td className="px-6 py-4">
//                   {formatDateToDDMMYYYY(item.startDate)}
//                 </td>
//                 <td className="px-6 py-4">
//                   {formatDateToDDMMYYYY(item.endDate)}
//                 </td>
//                 <td className="px-6 py-4">{badge(item.status)}</td>
//                 <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
//                   {item.reason}
//                 </td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => setSelectedLeave(item)}
//                     className="px-3 py-1 text-xs font-medium border border-indigo-500 text-indigo-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900"
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

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
