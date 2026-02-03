import { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Heading,
  Table,
  Badge,
  Button,
  Spinner,
} from "@chakra-ui/react";
import axiosInstance from "../utils/axiosInstance";
import MetricProgressCard from "../components/MetricProgressCard";

function InterviewsComponent() {
  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState([]);

  const dummyInterviews = [
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
  ];

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setInterviews(dummyInterviews);
      setLoading(false);
    }, 1000);
  }, []);

  // useEffect(() => {
  //   async function fetchInterviews() {
  //     try {
  //       const res = await axiosInstance.get("/interviews/my");
  //       setInterviews(res.data);
  //     } catch (err) {
  //       console.log("Using dummy interview data");
  //       setInterviews(dummyInterviews);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchInterviews();
  // }, []);

  async function handleStatusUpdate(id, newStatus) {
    try {
      await axiosInstance.patch(`/interviews/${id}/status`, {
        status: newStatus,
      });

      setInterviews((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i)),
      );
    } catch (err) {
      console.error("Failed to update status");
    }
  }

  const getStatusBadge = (status) => {
    const map = {
      SCHEDULED: "blue",
      COMPLETED: "green",
      NO_SHOW: "red",
      CANCELLED: "gray",
    };

    return (
      <Badge colorScheme={map[status]} px={3} py={1} borderRadius="md">
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Box p={6} textAlign="center">
        <Spinner size="lg" color="indigo.500" />
      </Box>
    );
  }

  return (
    <Stack spacing={6} p={8} bg="gray.50" minH="100vh">
      <Heading size="lg" color="gray.700">
        My Interviews
      </Heading>

      <MetricProgressCard
        title="Total Interviews Scheduled"
        value={interviews.length}
      />

      <Box
        border="1px solid"
        borderColor="gray.200"
        rounded="xl"
        overflow="hidden"
        bg="white"
        boxShadow="sm"
      >
        <Table.Root size="sm">
          <Table.Header bg="gray.50">
            <Table.Row>
              <Table.ColumnHeader>Candidate</Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Date</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Action</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {interviews.map((item) => (
              <Table.Row key={item.id} _hover={{ bg: "indigo.50" }}>
                <Table.Cell fontWeight="medium">
                  {item.candidateName}
                </Table.Cell>
                <Table.Cell>{item.candidateEmail}</Table.Cell>
                <Table.Cell>{item.scheduledDate}</Table.Cell>
                <Table.Cell>{getStatusBadge(item.status)}</Table.Cell>
                <Table.Cell>
                  {item.status === "SCHEDULED" && (
                    <Stack direction="row" spacing={2}>
                      <Button
                        size="xs"
                        colorScheme="green"
                        variant="subtle"
                        onClick={() => handleStatusUpdate(item.id, "COMPLETED")}
                      >
                        Mark Completed
                      </Button>
                      <Button
                        size="xs"
                        colorScheme="red"
                        variant="subtle"
                        onClick={() => handleStatusUpdate(item.id, "NO_SHOW")}
                      >
                        No Show
                      </Button>
                    </Stack>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Stack>
  );
}

export default InterviewsComponent;
