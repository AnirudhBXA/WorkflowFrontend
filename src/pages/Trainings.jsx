// import { useEffect, useState } from "react";
// import {
//   Stack,
//   Accordion,
//   Table,
//   Badge,
//   Box,
//   Heading,
//   Spinner,
// } from "@chakra-ui/react";
// import axiosInstance from "../utils/axiosInstance";
// import TrainingCard from "../components/Trainings/TrainingCard";

// function TrainingsComponent() {
//   const [role, setRole] = useState("manager");
//   const [loading, setLoading] = useState(true);
//   const [myTrainings, setMyTrainings] = useState([]);
//   const [teamTrainings, setTeamTrainings] = useState([]);

//   const dummyMyTrainings = [
//     {
//       trainingName: "Advanced Java",
//       trainerName: "Anirudh",
//       startDate: "2026-02-03",
//       endDate: "2026-02-06",
//       status: "ONGOING",
//     },
//     {
//       trainingName: "Business Communication",
//       trainerName: "Krishna",
//       startDate: "2026-03-10",
//       endDate: "2026-03-15",
//       status: "PLANNED",
//     },
//   ];

//   const dummyTeamTrainings = [
//     {
//       employeeName: "Murli",
//       trainingTitle: "Python",
//       trainerName: "Krishna",
//       startDate: "2026-02-03",
//       endDate: "2026-02-06",
//       status: "ONGOING",
//     },
//     {
//       employeeName: "Sneha",
//       trainingTitle: "English",
//       trainerName: "Anirudh",
//       startDate: "2026-01-10",
//       endDate: "2026-01-15",
//       status: "COMPLETED",
//     },
//   ];

//   useEffect(() => {
//     // Simulate data fetching delay
//     setTimeout(() => {
//       setMyTrainings(dummyMyTrainings);
//       setTeamTrainings(dummyTeamTrainings);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // useEffect(() => {
//   //   async function fetchTrainingData() {
//   //     try {
//   //       const [myRes, teamRes] = await Promise.all([
//   //         axiosInstance.get("/trainings/my"),
//   //         role === "manager"
//   //           ? axiosInstance.get("/trainings/team")
//   //           : Promise.resolve({ data: [] }),
//   //       ]);

//   //       setMyTrainings(myRes.data);
//   //       setTeamTrainings(teamRes.data);
//   //     } catch (err) {
//   //       console.log("Using dummy training data");
//   //       setMyTrainings(dummyMyTrainings);
//   //       setTeamTrainings(dummyTeamTrainings);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   }

//   //   fetchTrainingData();
//   // }, [role]);

//   const getStatusMarker = (status) => {
//     const statusColorMap = {
//       PLANNED: "blue",
//       ONGOING: "yellow",
//       COMPLETED: "green",
//     };

//     return (
//       <Badge
//         px={3}
//         py={1}
//         borderRadius="md"
//         fontSize="xs"
//         fontWeight="medium"
//         colorScheme={statusColorMap[status]}
//       >
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
//         Training & Development
//       </Heading>

//       <Accordion.Root collapsible defaultValue={["personal"]}>
//         {/* MY TRAININGS */}
//         <Accordion.Item value="personal">
//           <Accordion.ItemTrigger fontWeight="semibold">
//             My Assigned Trainings
//           </Accordion.ItemTrigger>

//           <Accordion.ItemContent>
//             <Accordion.ItemBody>
//               <Box
//                 display="grid"
//                 gridTemplateColumns={{
//                   base: "1fr",
//                   md: "repeat(2, 1fr)",
//                   lg: "repeat(3, 1fr)",
//                 }}
//                 gap={6}
//               >
//                 {myTrainings.map((item, index) => (
//                   <TrainingCard key={index} data={item} />
//                 ))}
//               </Box>
//             </Accordion.ItemBody>
//           </Accordion.ItemContent>
//         </Accordion.Item>

//         {/* TEAM TRAININGS (VIEW ONLY) */}
//         {role === "manager" && (
//           <Accordion.Item value="management">
//             <Accordion.ItemTrigger fontWeight="semibold">
//               Team Training Progress
//             </Accordion.ItemTrigger>

//             <Accordion.ItemContent>
//               <Accordion.ItemBody>
//                 <Box
//                   border="1px solid"
//                   borderColor="gray.200"
//                   rounded="xl"
//                   overflow="hidden"
//                   bg="white"
//                   boxShadow="sm"
//                 >
//                   <Table.Root size="sm">
//                     <Table.Header bg="gray.50">
//                       <Table.Row>
//                         <Table.ColumnHeader>Employee</Table.ColumnHeader>
//                         <Table.ColumnHeader>Training</Table.ColumnHeader>
//                         <Table.ColumnHeader>Trainer</Table.ColumnHeader>
//                         <Table.ColumnHeader>Start</Table.ColumnHeader>
//                         <Table.ColumnHeader>End</Table.ColumnHeader>
//                         <Table.ColumnHeader>Status</Table.ColumnHeader>
//                       </Table.Row>
//                     </Table.Header>

//                     <Table.Body>
//                       {teamTrainings.map((item, idx) => (
//                         <Table.Row key={idx} _hover={{ bg: "indigo.50" }}>
//                           <Table.Cell fontWeight="medium">
//                             {item.employeeName}
//                           </Table.Cell>
//                           <Table.Cell>{item.trainingTitle}</Table.Cell>
//                           <Table.Cell>{item.trainerName}</Table.Cell>
//                           <Table.Cell>{item.startDate}</Table.Cell>
//                           <Table.Cell>{item.endDate}</Table.Cell>
//                           <Table.Cell>
//                             {getStatusMarker(item.status)}
//                           </Table.Cell>
//                         </Table.Row>
//                       ))}
//                     </Table.Body>
//                   </Table.Root>
//                 </Box>
//               </Accordion.ItemBody>
//             </Accordion.ItemContent>
//           </Accordion.Item>
//         )}
//       </Accordion.Root>
//     </Stack>
//   );
// }

// export default TrainingsComponent;

"use client";

import { useEffect, useState } from "react";
import TrainingCard from "../components/Trainings/TrainingCard";

export default function TrainingsComponent() {
  const [role] = useState("manager");
  const [loading, setLoading] = useState(true);
  const [myTrainings, setMyTrainings] = useState([]);
  const [teamTrainings, setTeamTrainings] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setMyTrainings([
        {
          trainingName: "Advanced Java",
          trainerName: "Anirudh",
          startDate: "2026-02-03",
          endDate: "2026-02-06",
          status: "ONGOING",
        },
        {
          trainingName: "Business Communication",
          trainerName: "Krishna",
          startDate: "2026-03-10",
          endDate: "2026-03-15",
          status: "PLANNED",
        },
      ]);

      setTeamTrainings([
        {
          employeeName: "Murli",
          trainingTitle: "Python",
          trainerName: "Krishna",
          startDate: "2026-02-03",
          endDate: "2026-02-06",
          status: "ONGOING",
        },
        {
          employeeName: "Sneha",
          trainingTitle: "English",
          trainerName: "Anirudh",
          startDate: "2026-01-10",
          endDate: "2026-01-15",
          status: "COMPLETED",
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const statusBadge = (status) => {
    const map = {
      PLANNED: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      ONGOING:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      COMPLETED:
        "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}
      >
        {status}
      </span>
    );
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
        Training & Development
      </h1>

      {/* My Trainings */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          My Assigned Trainings
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myTrainings.map((item, index) => (
            <TrainingCard key={index} data={item} />
          ))}
        </div>
      </div>

      {/* Team Trainings */}
      {role === "manager" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Team Training Progress
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 text-left">Employee</th>
                  <th className="px-6 py-3 text-left">Training</th>
                  <th className="px-6 py-3 text-left">Trainer</th>
                  <th className="px-6 py-3 text-left">Start</th>
                  <th className="px-6 py-3 text-left">End</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {teamTrainings.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                      {item.employeeName}
                    </td>
                    <td className="px-6 py-4">{item.trainingTitle}</td>
                    <td className="px-6 py-4">{item.trainerName}</td>
                    <td className="px-6 py-4">{item.startDate}</td>
                    <td className="px-6 py-4">{item.endDate}</td>
                    <td className="px-6 py-4">{statusBadge(item.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
