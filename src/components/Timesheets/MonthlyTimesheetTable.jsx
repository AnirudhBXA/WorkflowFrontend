// import { Box, Table, Badge } from "@chakra-ui/react";

// function MonthlyTimesheetTable({ data }) {
//   return (
//     <Box
//       bg="white"
//       p={5}
//       rounded="xl"
//       shadow="sm"
//       border="1px solid"
//       borderColor="gray.100"
//     >
//       <Table.Root size="sm">
//         <Table.Header bg="gray.50">
//           <Table.Row>
//             <Table.ColumnHeader>Week</Table.ColumnHeader>
//             <Table.ColumnHeader>Total Hours</Table.ColumnHeader>
//             <Table.ColumnHeader>Status</Table.ColumnHeader>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {data.map((row, idx) => (
//             <Table.Row key={idx} _hover={{ bg: "indigo.50" }}>
//               <Table.Cell>{row.week}</Table.Cell>
//               <Table.Cell>{row.hours}</Table.Cell>
//               <Table.Cell>
//                 <Badge
//                   colorScheme={row.status === "Approved" ? "green" : "yellow"}
//                 >
//                   {row.status}
//                 </Badge>
//               </Table.Cell>
//             </Table.Row>
//           ))}
//         </Table.Body>
//       </Table.Root>
//     </Box>
//   );
// }

// export default MonthlyTimesheetTable;

export default function MonthlyTimesheetTable({ data }) {
  const badge = (status) =>
    status === "Approved"
      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-200">
        Monthly Summary
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 text-left">Week</th>
            <th className="px-6 py-3 text-left">Total Hours</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-6 py-4">{row.week}</td>
              <td className="px-6 py-4">{row.hours}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${badge(row.status)}`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
