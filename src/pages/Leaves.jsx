import {
  Stack,
  Accordion,
  Badge,
  Table,
  Spinner,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import ValuesDisplayCard from "../components/ValuesDisplayCard";
import LeaveApprovalComponent from "../components/Leaves/LeaveApproval";
import FileUploadComponent from "../components/FileUploadComponent";

function LeavesComponent() {
  const [role, setRole] = useState("manager"); // later from auth/user API
  const [isUploadActive, setIsUploadActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [leavesList, setLeavesList] = useState([]);

  useEffect(() => {
    async function fetchLeavesData() {
      try {
        const [summaryRes, leavesRes] = await Promise.all([
          axiosInstance.get("/leaves/summary"),
          axiosInstance.get("/leaves/my"),
        ]);

        setSummary(summaryRes.data);
        setLeavesList(leavesRes.data);
      } catch (err) {
        console.log("Using dummy leave data");
        setSummary(dummySummary);
        setLeavesList(dummyLeaves);
      } finally {
        setLoading(false);
      }
    }

    fetchLeavesData();
  }, []);

  const dummySummary = { available: 5, used: 3 };

  const dummyLeaves = [
    {
      id: 1,
      type: "Casual Leave",
      from: "2026-07-05",
      to: "2026-07-07",
      days: 3,
      status: "APPROVED",
      reason: "Family trip",
    },
    {
      id: 2,
      type: "Sick Leave",
      from: "2026-06-10",
      to: "2026-06-11",
      days: 2,
      status: "PENDING",
      reason: "Fever",
    },
  ];

  const getStatusMarker = (status) => {
    const statusColorMap = {
      APPROVED: "green",
      PENDING: "yellow",
      REJECTED: "red",
    };

    return (
      <Badge
        px={3}
        py={1}
        borderRadius="md"
        fontSize="xs"
        fontWeight="medium"
        colorScheme={statusColorMap[status]}
      >
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
        Leave Management
      </Heading>

      <Accordion.Root collapsible defaultValue={["personal"]}>
        {/* PERSONAL SECTION */}
        <Accordion.Item value="personal">
          <Accordion.ItemTrigger
            fontWeight="semibold"
            fontSize="md"
            _hover={{ color: "indigo.600" }}
          >
            My Leave Summary
          </Accordion.ItemTrigger>

          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Stack spacing={6}>
                {/* Summary Cards */}
                <Stack spacing={8}>
                  <ValuesDisplayCard
                    data={{
                      context: "Available Leaves",
                      value: summary.available,
                      units: "days",
                    }}
                  />
                  <ValuesDisplayCard
                    data={{
                      context: "Leaves Used",
                      value: summary.used,
                      units: "days",
                    }}
                  />
                </Stack>

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
                        <Table.ColumnHeader>Type</Table.ColumnHeader>
                        <Table.ColumnHeader>From</Table.ColumnHeader>
                        <Table.ColumnHeader>To</Table.ColumnHeader>
                        <Table.ColumnHeader>Days</Table.ColumnHeader>
                        <Table.ColumnHeader>Status</Table.ColumnHeader>
                        <Table.ColumnHeader>Reason</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {leavesList.map((item) => (
                        <Table.Row
                          key={item.id}
                          _hover={{
                            bg: "indigo.50",
                            transform: "scale(1.01)",
                            transition: "0.15s ease-in-out",
                          }}
                          cursor="pointer"
                        >
                          <Table.Cell fontWeight="medium">
                            {item.type}
                          </Table.Cell>
                          <Table.Cell>{item.from}</Table.Cell>
                          <Table.Cell>{item.to}</Table.Cell>
                          <Table.Cell>{item.days}</Table.Cell>
                          <Table.Cell>
                            {getStatusMarker(item.status)}
                          </Table.Cell>
                          <Table.Cell color="gray.600">
                            {item.reason}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* MANAGEMENT SECTION */}
        {role === "manager" && (
          <Accordion.Item value="management">
            <Accordion.ItemTrigger
              fontWeight="semibold"
              fontSize="md"
              _hover={{ color: "indigo.600" }}
            >
              Manager Actions
            </Accordion.ItemTrigger>

            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <Stack spacing={5}>
                  {role === "HR" && (
                    <>
                      <button
                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm hover:shadow-md active:scale-95"
                        onClick={() => setIsUploadActive(true)}
                      >
                        Update Leave Policies
                      </button>

                      {isUploadActive && <FileUploadComponent />}
                    </>
                  )}

                  <LeaveApprovalComponent />
                </Stack>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        )}
      </Accordion.Root>
    </Stack>
  );
}

export default LeavesComponent;
