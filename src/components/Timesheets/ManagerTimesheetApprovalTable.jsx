// import { Box, Table, Button, Badge, Stack } from "@chakra-ui/react";

// function ManagerTimesheetApprovalTable({ data }) {
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
//             <Table.ColumnHeader>Employee</Table.ColumnHeader>
//             <Table.ColumnHeader>Week</Table.ColumnHeader>
//             <Table.ColumnHeader>Total Hours</Table.ColumnHeader>
//             <Table.ColumnHeader>Status</Table.ColumnHeader>
//             <Table.ColumnHeader>Actions</Table.ColumnHeader>
//           </Table.Row>
//         </Table.Header>

//         <Table.Body>
//           {data.map((row) => (
//             <Table.Row key={row.id} _hover={{ bg: "indigo.50" }}>
//               <Table.Cell fontWeight="medium">{row.employee}</Table.Cell>
//               <Table.Cell>{row.week}</Table.Cell>
//               <Table.Cell>{row.hours}</Table.Cell>
//               <Table.Cell>
//                 <Badge colorScheme="yellow">Pending</Badge>
//               </Table.Cell>
//               <Table.Cell>
//                 <Stack direction="row" spacing={2}>
//                   <Button size="xs" colorScheme="green" variant="subtle">
//                     Approve
//                   </Button>
//                   <Button size="xs" colorScheme="red" variant="subtle">
//                     Reject
//                   </Button>
//                 </Stack>
//               </Table.Cell>
//             </Table.Row>
//           ))}
//         </Table.Body>
//       </Table.Root>
//     </Box>
//   );
// }

// export default ManagerTimesheetApprovalTable;

export default function ManagerTimesheetApprovalTable({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-200">
        Team Timesheet Approvals
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 text-left">Employee</th>
            <th className="px-6 py-3 text-left">Week</th>
            <th className="px-6 py-3 text-left">Total Hours</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                {row.employee}
              </td>
              <td className="px-6 py-4">{row.week}</td>
              <td className="px-6 py-4">{row.hours}</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4 flex gap-2">
                <button className="px-3 py-1 text-xs font-medium rounded-md bg-green-500 text-white hover:bg-green-600">
                  Approve
                </button>
                <button className="px-3 py-1 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-600">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
