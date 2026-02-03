import { Box, Table, Badge } from "@chakra-ui/react";

function MonthlyTimesheetTable({ data }) {
  return (
    <Box
      bg="white"
      p={5}
      rounded="xl"
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
    >
      <Table.Root size="sm">
        <Table.Header bg="gray.50">
          <Table.Row>
            <Table.ColumnHeader>Week</Table.ColumnHeader>
            <Table.ColumnHeader>Total Hours</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row, idx) => (
            <Table.Row key={idx} _hover={{ bg: "indigo.50" }}>
              <Table.Cell>{row.week}</Table.Cell>
              <Table.Cell>{row.hours}</Table.Cell>
              <Table.Cell>
                <Badge
                  colorScheme={row.status === "Approved" ? "green" : "yellow"}
                >
                  {row.status}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export default MonthlyTimesheetTable;
