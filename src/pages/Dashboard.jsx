import { Box, Container, VStack, Heading, Text } from "@chakra-ui/react";
import StatsCards from "../components/Dashboard/StatsCards";
import ChartsSection from "../components/Dashboard/ChartSection";
import TasksAndCalendar from "../components/Dashboard/TasksAndCalendar";

export default function DashboardPage() {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, gray.50, gray.100)"
      _dark={{ bgGradient: "linear(to-br, gray.950, gray.900)" }}
      py={8}
      px={{ base: 4, md: 8 }}
    >
      <Container maxW="7xl">
        <VStack align="stretch" spacing={4} gap={10}>
          {/* Header */}
          {/* <Box>
            <Heading
              as="h1"
              size="2xl"
              mb={2}
              color="gray.900"
              _dark={{ color: "white" }}
            >
              Employee Dashboard
            </Heading>
            <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.400" }}>
              Welcome back! Here's your performance overview.
            </Text>
          </Box> */}

          {/* Stats Cards */}
          <StatsCards />

          {/* Charts Section */}
          <ChartsSection />

          {/* Tasks and Calendar */}
          <TasksAndCalendar />
        </VStack>
      </Container>
    </Box>
  );
}
