import { Box, Table, Button, Badge, Stack } from "@chakra-ui/react";

function ManagerTimesheetApprovalTable({ data }) {
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
            <Table.ColumnHeader>Employee</Table.ColumnHeader>
            <Table.ColumnHeader>Week</Table.ColumnHeader>
            <Table.ColumnHeader>Total Hours</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id} _hover={{ bg: "indigo.50" }}>
              <Table.Cell fontWeight="medium">{row.employee}</Table.Cell>
              <Table.Cell>{row.week}</Table.Cell>
              <Table.Cell>{row.hours}</Table.Cell>
              <Table.Cell>
                <Badge colorScheme="yellow">Pending</Badge>
              </Table.Cell>
              <Table.Cell>
                <Stack direction="row" spacing={2}>
                  <Button size="xs" colorScheme="green" variant="subtle">
                    Approve
                  </Button>
                  <Button size="xs" colorScheme="red" variant="subtle">
                    Reject
                  </Button>
                </Stack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export default ManagerTimesheetApprovalTable;
