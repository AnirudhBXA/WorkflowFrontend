// import { useEffect, useState } from "react";
// import {
//   Stack,
//   Box,
//   Heading,
//   Table,
//   Badge,
//   Button,
//   Spinner,
// } from "@chakra-ui/react";
// import axiosInstance from "../utils/axiosInstance";
// import MetricProgressCard from "../components/MetricProgressCard";

// function InterviewsComponent() {
//   const [loading, setLoading] = useState(true);
//   const [interviews, setInterviews] = useState([]);

//   const dummyInterviews = [
//     {
//       id: 1,
//       candidateName: "Rahul Sharma",
//       candidateEmail: "rahul@email.com",
//       scheduledDate: "2026-02-05 11:00 AM",
//       status: "SCHEDULED",
//     },
//     {
//       id: 2,
//       candidateName: "Sneha Verma",
//       candidateEmail: "sneha@email.com",
//       scheduledDate: "2026-02-04 03:00 PM",
//       status: "COMPLETED",
//     },
//     {
//       id: 3,
//       candidateName: "Amit Singh",
//       candidateEmail: "amit@email.com",
//       scheduledDate: "2026-02-03 01:00 PM",
//       status: "NO_SHOW",
//     },
//   ];

//   useEffect(() => {
//     // Simulate data fetching
//     setTimeout(() => {
//       setInterviews(dummyInterviews);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // useEffect(() => {
//   //   async function fetchInterviews() {
//   //     try {
//   //       const res = await axiosInstance.get("/interviews/my");
//   //       setInterviews(res.data);
//   //     } catch (err) {
//   //       console.log("Using dummy interview data");
//   //       setInterviews(dummyInterviews);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   }

//   //   fetchInterviews();
//   // }, []);

//   async function handleStatusUpdate(id, newStatus) {
//     try {
//       await axiosInstance.patch(`/interviews/${id}/status`, {
//         status: newStatus,
//       });

//       setInterviews((prev) =>
//         prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i)),
//       );
//     } catch (err) {
//       console.error("Failed to update status");
//     }
//   }

//   const getStatusBadge = (status) => {
//     const map = {
//       SCHEDULED: "blue",
//       COMPLETED: "green",
//       NO_SHOW: "red",
//       CANCELLED: "gray",
//     };

//     return (
//       <Badge colorScheme={map[status]} px={3} py={1} borderRadius="md">
//         {status}
//       </Badge>
//     );
//   };

//   if (loading) {
//     return (
//       <Box p={6} textAlign="center">
//         <Spinner size="lg" color="indigo.500" />
//       </Box>
//     );
//   }

//   return (
//     <Stack spacing={6} p={8} bg="gray.50" minH="100vh">
//       <Heading size="lg" color="gray.700">
//         My Interviews
//       </Heading>

//       <MetricProgressCard
//         title="Total Interviews Scheduled"
//         value={interviews.length}
//       />

//       <Box
//         border="1px solid"
//         borderColor="gray.200"
//         rounded="xl"
//         overflow="hidden"
//         bg="white"
//         boxShadow="sm"
//       >
//         <Table.Root size="sm">
//           <Table.Header bg="gray.50">
//             <Table.Row>
//               <Table.ColumnHeader>Candidate</Table.ColumnHeader>
//               <Table.ColumnHeader>Email</Table.ColumnHeader>
//               <Table.ColumnHeader>Date</Table.ColumnHeader>
//               <Table.ColumnHeader>Status</Table.ColumnHeader>
//               <Table.ColumnHeader>Action</Table.ColumnHeader>
//             </Table.Row>
//           </Table.Header>

//           <Table.Body>
//             {interviews.map((item) => (
//               <Table.Row key={item.id} _hover={{ bg: "indigo.50" }}>
//                 <Table.Cell fontWeight="medium">
//                   {item.candidateName}
//                 </Table.Cell>
//                 <Table.Cell>{item.candidateEmail}</Table.Cell>
//                 <Table.Cell>{item.scheduledDate}</Table.Cell>
//                 <Table.Cell>{getStatusBadge(item.status)}</Table.Cell>
//                 <Table.Cell>
//                   {item.status === "SCHEDULED" && (
//                     <Stack direction="row" spacing={2}>
//                       <Button
//                         size="xs"
//                         colorScheme="green"
//                         variant="subtle"
//                         onClick={() => handleStatusUpdate(item.id, "COMPLETED")}
//                       >
//                         Mark Completed
//                       </Button>
//                       <Button
//                         size="xs"
//                         colorScheme="red"
//                         variant="subtle"
//                         onClick={() => handleStatusUpdate(item.id, "NO_SHOW")}
//                       >
//                         No Show
//                       </Button>
//                     </Stack>
//                   )}
//                 </Table.Cell>
//               </Table.Row>
//             ))}
//           </Table.Body>
//         </Table.Root>
//       </Box>
//     </Stack>
//   );
// }

// export default InterviewsComponent;

"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import MetricProgressCard from "../components/MetricProgressCard";

export default function InterviewsComponent() {
  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setInterviews([
        {
          id: 1,
          candidateName: "Rahul Sharma",
          candidateEmail: "rahul@email.com",
          scheduledDate: "2026-02-05 11:00 AM",
          status: "SCHEDULED",
        },
        {
          id: 2,
          candidateName: "Sneha Verma",
          candidateEmail: "sneha@email.com",
          scheduledDate: "2026-02-04 03:00 PM",
          status: "COMPLETED",
        },
        {
          id: 3,
          candidateName: "Amit Singh",
          candidateEmail: "amit@email.com",
          scheduledDate: "2026-02-03 01:00 PM",
          status: "NO_SHOW",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  async function handleStatusUpdate(id, newStatus) {
    try {
      await axiosInstance.patch(`/interviews/${id}/status`, {
        status: newStatus,
      });
      setInterviews((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i)),
      );
    } catch {
      console.error("Failed to update status");
    }
  }

  const badgeStyles = {
    SCHEDULED: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    COMPLETED:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    NO_SHOW: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    CANCELLED: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        My Interviews
      </h1>

      <MetricProgressCard
        title="Total Interviews Scheduled"
        value={interviews.length}
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-left">Candidate</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  {item.candidateName}
                </td>
                <td className="px-6 py-4">{item.candidateEmail}</td>
                <td className="px-6 py-4">{item.scheduledDate}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {item.status === "SCHEDULED" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(item.id, "COMPLETED")}
                        className="px-3 py-1 text-xs font-medium rounded-md bg-green-500 text-white hover:bg-green-600"
                      >
                        Mark Completed
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(item.id, "NO_SHOW")}
                        className="px-3 py-1 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-600"
                      >
                        No Show
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
