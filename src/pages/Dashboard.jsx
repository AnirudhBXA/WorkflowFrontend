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
          <StatsCards />
          <ChartsSection />
          <TasksAndCalendar />
        </VStack>
      </Container>
    </Box>
  );
}
