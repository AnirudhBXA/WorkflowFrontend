import { useEffect, useState } from "react";
import {
  Stack,
  Accordion,
  Table,
  Badge,
  Box,
  Heading,
  Spinner,
  Button,
} from "@chakra-ui/react";
import axiosInstance from "../utils/axiosInstance";
import ValuesDisplayCard from "../components/ValuesDisplayCard";

function CertificationsComponent() {
  const [role, setRole] = useState("HR");
  const [loading, setLoading] = useState(true);
  const [myCerts, setMyCerts] = useState([]);
  const [teamCerts, setTeamCerts] = useState([]);
  const [reimbursements, setReimbursements] = useState([]);
  const [summary, setSummary] = useState({ left: 0, used: 0 });

  const dummyMyCerts = [
    {
      id: 1,
      title: "AWS Architect",
      provider: "Amazon",
      date: "2026-02-01",
      status: "APPROVED",
    },
    {
      id: 2,
      title: "Azure Fundamentals",
      provider: "Microsoft",
      date: "2026-03-01",
      status: "SUBMITTED",
    },
  ];

  const dummyTeamCerts = [
    { id: 1, employee: "Rohit", title: "GCP Engineer", status: "SUBMITTED" },
  ];

  const dummyHRData = [
    {
      id: 1,
      employee: "Sneha",
      title: "Scrum Master",
      amount: 15000,
      status: "APPROVED",
    },
  ];

  useEffect(() => {
    // Simulate data fetching delay
    setTimeout(() => {
      console.log("Using dummy certification data");
      setMyCerts(dummyMyCerts);
      setTeamCerts(dummyTeamCerts);
      setReimbursements(dummyHRData);
      setSummary({ left: 20000, used: 30000 });
      setLoading(false);
    }, 1000);
  }, []);

  // useEffect(() => {
  //   async function fetchCertData() {
  //     try {
  //       const [myRes, summaryRes, teamRes, hrRes] = await Promise.all([
  //         axiosInstance.get("/certifications/my"),
  //         axiosInstance.get("/certifications/summary"),
  //         role === "manager"
  //           ? axiosInstance.get("/certifications/team/pending")
  //           : Promise.resolve({ data: [] }),
  //         role === "HR"
  //           ? axiosInstance.get("/certifications/hr/reimbursements")
  //           : Promise.resolve({ data: [] }),
  //       ]);

  //       setMyCerts(myRes.data);
  //       setSummary(summaryRes.data);
  //       setTeamCerts(teamRes.data);
  //       setReimbursements(hrRes.data);
  //     } catch (err) {
  //       console.log("Using dummy certification data");
  //       setMyCerts(dummyMyCerts);
  //       setTeamCerts(dummyTeamCerts);
  //       setReimbursements(dummyHRData);
  //       setSummary({ left: 20000, used: 30000 });
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchCertData();
  // }, [role]);

  const getStatusBadge = (status) => {
    const map = {
      SUBMITTED: "blue",
      APPROVED: "green",
      REJECTED: "red",
      REIMBURSED: "purple",
    };
    return <Badge colorScheme={map[status]}>{status}</Badge>;
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
      <Heading size="lg">Certifications</Heading>

      {/* SUMMARY CARDS */}
      <Stack direction={{ base: "column", md: "row" }} spacing={6}>
        <ValuesDisplayCard
          data={{
            context: "Refund Amount Left",
            value: summary.left,
            units: "₹",
          }}
        />
        <ValuesDisplayCard
          data={{
            context: "Refund Amount Used",
            value: summary.used,
            units: "₹",
          }}
        />
      </Stack>

      <Accordion.Root collapsible defaultValue={["my"]}>
        {/* MY CERTIFICATIONS */}
        <Accordion.Item value="my">
          <Accordion.ItemTrigger fontWeight="semibold">
            My Certifications
          </Accordion.ItemTrigger>

          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Box
                bg="white"
                rounded="xl"
                shadow="sm"
                border="1px solid"
                borderColor="gray.100"
              >
                <Table.Root size="sm">
                  <Table.Header bg="gray.50">
                    <Table.Row>
                      <Table.ColumnHeader>Name</Table.ColumnHeader>
                      <Table.ColumnHeader>Provider</Table.ColumnHeader>
                      <Table.ColumnHeader>Date</Table.ColumnHeader>
                      <Table.ColumnHeader>Status</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {myCerts.map((c) => (
                      <Table.Row key={c.id} _hover={{ bg: "indigo.50" }}>
                        <Table.Cell>{c.title}</Table.Cell>
                        <Table.Cell>{c.provider}</Table.Cell>
                        <Table.Cell>{c.date}</Table.Cell>
                        <Table.Cell>{getStatusBadge(c.status)}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* MANAGER APPROVALS */}
        {role === "manager" && (
          <Accordion.Item value="manager">
            <Accordion.ItemTrigger fontWeight="semibold">
              Team Certification Approvals
            </Accordion.ItemTrigger>

            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <Box
                  bg="white"
                  rounded="xl"
                  shadow="sm"
                  border="1px solid"
                  borderColor="gray.100"
                >
                  <Table.Root size="sm">
                    <Table.Header bg="gray.50">
                      <Table.Row>
                        <Table.ColumnHeader>Employee</Table.ColumnHeader>
                        <Table.ColumnHeader>Certification</Table.ColumnHeader>
                        <Table.ColumnHeader>Status</Table.ColumnHeader>
                        <Table.ColumnHeader>Action</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {teamCerts.map((c) => (
                        <Table.Row key={c.id}>
                          <Table.Cell>{c.employee}</Table.Cell>
                          <Table.Cell>{c.title}</Table.Cell>
                          <Table.Cell>{getStatusBadge(c.status)}</Table.Cell>
                          <Table.Cell>
                            <Button size="xs" colorScheme="green" mr={2}>
                              Approve
                            </Button>
                            <Button size="xs" colorScheme="red">
                              Reject
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        )}

        {/* HR REIMBURSEMENT PROCESSING */}
        {role === "HR" && (
          <Accordion.Item value="hr">
            <Accordion.ItemTrigger fontWeight="semibold">
              Reimbursement Processing
            </Accordion.ItemTrigger>

            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <Box
                  bg="white"
                  rounded="xl"
                  shadow="sm"
                  border="1px solid"
                  borderColor="gray.100"
                >
                  <Table.Root size="sm">
                    <Table.Header bg="gray.50">
                      <Table.Row>
                        <Table.ColumnHeader>Employee</Table.ColumnHeader>
                        <Table.ColumnHeader>Certification</Table.ColumnHeader>
                        <Table.ColumnHeader>Amount</Table.ColumnHeader>
                        <Table.ColumnHeader>Status</Table.ColumnHeader>
                        <Table.ColumnHeader>Action</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {reimbursements.map((r) => (
                        <Table.Row key={r.id}>
                          <Table.Cell>{r.employee}</Table.Cell>
                          <Table.Cell>{r.title}</Table.Cell>
                          <Table.Cell>₹{r.amount}</Table.Cell>
                          <Table.Cell>{getStatusBadge(r.status)}</Table.Cell>
                          <Table.Cell>
                            <Button size="xs" colorScheme="purple">
                              Mark Reimbursed
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        )}
      </Accordion.Root>
    </Stack>
  );
}

export default CertificationsComponent;
