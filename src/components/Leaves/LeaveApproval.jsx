// import { useEffect, useState } from "react";
// import { Table, Badge, Button } from "@chakra-ui/react";
// import LeaveBriefCard from "./LeaveBriefCard";

// function LeaveApprovalComponent() {
//   const [leavesList, setLeavesList] = useState([]);
//   const [selectedLeave, setSelectedLeave] = useState(null);

//   useEffect(() => {
//     setLeavesList([
//       {
//         id: 1,
//         type: "Casual Leave",
//         from: "2026-07-05",
//         to: "2026-07-07",
//         days: 3,
//         status: "PENDING",
//         reason: "Family function",
//       },
//       {
//         id: 2,
//         type: "Sick Leave",
//         from: "2026-07-10",
//         to: "2026-07-11",
//         days: 2,
//         status: "PENDING",
//         reason: "Fever",
//       },
//     ]);
//   }, []);

//   function openLeaveCard(item) {
//     setSelectedLeave(item);
//   }

//   function closeModal() {
//     setSelectedLeave(null);
//   }

//   function updateStatus(id, newStatus) {
//     setLeavesList((prev) =>
//       prev.map((leave) =>
//         leave.id === id ? { ...leave, status: newStatus } : leave,
//       ),
//     );
//     closeModal();
//   }

//   const statusColor = {
//     APPROVED: "green",
//     PENDING: "yellow",
//     REJECTED: "red",
//   };

//   return (
//     <>
//       {/* 🔍 Modal */}
//       {selectedLeave && (
//         <LeaveBriefCard
//           leave={selectedLeave}
//           onClose={closeModal}
//           onApprove={() => updateStatus(selectedLeave.id, "APPROVED")}
//           onReject={() => updateStatus(selectedLeave.id, "REJECTED")}
//         />
//       )}

//       {/* 📋 Table */}
//       <Table.ScrollArea
//         border="1px solid"
//         borderColor="gray.200"
//         rounded="lg"
//         height="300px"
//         bg="white"
//       >
//         <Table.Root size="sm" stickyHeader>
//           <Table.Header>
//             <Table.Row bg="gray.50">
//               <Table.ColumnHeader>Type</Table.ColumnHeader>
//               <Table.ColumnHeader>From</Table.ColumnHeader>
//               <Table.ColumnHeader>To</Table.ColumnHeader>
//               <Table.ColumnHeader>Days</Table.ColumnHeader>
//               <Table.ColumnHeader>Status</Table.ColumnHeader>
//               <Table.ColumnHeader>Action</Table.ColumnHeader>
//             </Table.Row>
//           </Table.Header>

//           <Table.Body>
//             {leavesList.map((item) => (
//               <Table.Row key={item.id} _hover={{ bg: "gray.50" }}>
//                 <Table.Cell>{item.type}</Table.Cell>
//                 <Table.Cell>{item.from}</Table.Cell>
//                 <Table.Cell>{item.to}</Table.Cell>
//                 <Table.Cell>{item.days}</Table.Cell>
//                 <Table.Cell>
//                   <Badge colorScheme={statusColor[item.status]}>
//                     {item.status}
//                   </Badge>
//                 </Table.Cell>
//                 <Table.Cell>
//                   <Button
//                     size="xs"
//                     colorScheme="indigo"
//                     variant="outline"
//                     onClick={() => openLeaveCard(item)}
//                   >
//                     View
//                   </Button>
//                 </Table.Cell>
//               </Table.Row>
//             ))}
//           </Table.Body>
//         </Table.Root>
//       </Table.ScrollArea>
//     </>
//   );
// }

// export default LeaveApprovalComponent;

import { useEffect, useState } from "react";
import LeaveBriefCard from "./LeaveBriefCard";

export default function LeaveApprovalComponent() {
  const [leavesList, setLeavesList] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);

  useEffect(() => {
    setLeavesList([
      {
        id: 1,
        type: "Casual Leave",
        from: "2026-07-05",
        to: "2026-07-07",
        days: 3,
        status: "PENDING",
      },
      {
        id: 2,
        type: "Sick Leave",
        from: "2026-07-10",
        to: "2026-07-11",
        days: 2,
        status: "PENDING",
      },
    ]);
  }, []);

  const updateStatus = (id, status) => {
    setLeavesList((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l)),
    );
    setSelectedLeave(null);
  };

  const badge = (status) => {
    const map = {
      APPROVED:
        "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      PENDING:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      REJECTED: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <>
      {selectedLeave && (
        <LeaveBriefCard
          leave={selectedLeave}
          onClose={() => setSelectedLeave(null)}
          onApprove={() => updateStatus(selectedLeave.id, "APPROVED")}
          onReject={() => updateStatus(selectedLeave.id, "REJECTED")}
        />
      )}

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">From</th>
              <th className="px-6 py-3 text-left">To</th>
              <th className="px-6 py-3 text-left">Days</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {leavesList.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4">{item.type}</td>
                <td className="px-6 py-4">{item.from}</td>
                <td className="px-6 py-4">{item.to}</td>
                <td className="px-6 py-4">{item.days}</td>
                <td className="px-6 py-4">{badge(item.status)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedLeave(item)}
                    className="px-3 py-1 text-xs font-medium border border-indigo-500 text-indigo-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900"
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
