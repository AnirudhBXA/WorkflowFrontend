import { Stack, Accordion, Box, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import WeeklyHoursChart from "../components/Timesheets/WeeklyHoursChart";
import MonthlyTimesheetTable from "../components/Timesheets/MonthlyTimesheetTable";
import ManagerTimesheetApprovalTable from "../components/Timesheets/ManagerTimesheetApprovalTable";

function TimesheetsComponent() {
  const [role, setRole] = useState("manager"); // later from user profile API
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [teamTimesheets, setTeamTimesheets] = useState([]);

  const dummyWeekly = [
    { day: "Mon", hours: 8 },
    { day: "Tue", hours: 7 },
    { day: "Wed", hours: 6 },
    { day: "Thu", hours: 8 },
    { day: "Fri", hours: 5 },
  ];

  const dummyMonthly = [
    { week: "Week 1", hours: 38, status: "Approved" },
    { week: "Week 2", hours: 40, status: "Approved" },
    { week: "Week 3", hours: 36, status: "Pending" },
  ];

  const dummyTeam = [
    { id: 1, employee: "John Doe", week: "Week 3", hours: 35 },
    { id: 2, employee: "Jane Smith", week: "Week 3", hours: 40 },
  ];

  useEffect(() => {
    // Simulate data fetching delay
    setTimeout(() => {
      setWeeklyData(dummyWeekly);
      setMonthlyData(dummyMonthly);
      setTeamTimesheets(dummyTeam);
      setLoading(false);
    }, 1000);
  }, []);

  // useEffect(() => {
  //   async function fetchTimesheetData() {
  //     try {
  //       const [weekRes, monthRes, teamRes] = await Promise.all([
  //         axiosInstance.get("/timesheets/my/week"),
  //         axiosInstance.get("/timesheets/my/month"),
  //         role === "manager"
  //           ? axiosInstance.get("/timesheets/team/pending")
  //           : Promise.resolve({ data: [] }),
  //       ]);

  //       setWeeklyData(weekRes.data);
  //       setMonthlyData(monthRes.data);
  //       setTeamTimesheets(teamRes.data);
  //     } catch (err) {
  //       console.log("Using dummy timesheet data");
  //       setWeeklyData(dummyWeekly);
  //       setMonthlyData(dummyMonthly);
  //       setTeamTimesheets(dummyTeam);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchTimesheetData();
  // }, [role]);

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
        Timesheets
      </Heading>

      <Accordion.Root collapsible defaultValue={["personal"]}>
        {/* PERSONAL SECTION */}
        <Accordion.Item value="personal">
          <Accordion.ItemTrigger fontWeight="semibold">
            My Work Summary
          </Accordion.ItemTrigger>

          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Stack spacing={8}>
                {/* Weekly Chart */}
                <Box
                  bg="white"
                  p={5}
                  rounded="xl"
                  shadow="sm"
                  border="1px solid"
                  borderColor="gray.100"
                >
                  <Heading size="sm" mb={4} color="gray.600">
                    This Week’s Work Hours
                  </Heading>
                  <WeeklyHoursChart data={weeklyData} />
                </Box>

                {/* Monthly Table */}
                <MonthlyTimesheetTable data={monthlyData} />
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        {/* MANAGER SECTION */}
        {role === "manager" && (
          <Accordion.Item value="management">
            <Accordion.ItemTrigger fontWeight="semibold">
              Team Timesheet Approvals
            </Accordion.ItemTrigger>

            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <ManagerTimesheetApprovalTable data={teamTimesheets} />
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        )}
      </Accordion.Root>
    </Stack>
  );
}

export default TimesheetsComponent;
