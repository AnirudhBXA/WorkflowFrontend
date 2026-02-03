import { useEffect, useState } from "react";
import { Table, Badge, Button } from "@chakra-ui/react";
import LeaveBriefCard from "./LeaveBriefCard";

function LeaveApprovalComponent() {
  const [leavesList, setLeavesList] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);

  useEffect(() => {
    setLeavesList([
      {
        id: 1,
        type: "Casual Leave",
        from: "2026-07-05",
        to: "2026-07-07",
        days: 3,
        status: "PENDING",
        reason: "Family function",
      },
      {
        id: 2,
        type: "Sick Leave",
        from: "2026-07-10",
        to: "2026-07-11",
        days: 2,
        status: "PENDING",
        reason: "Fever",
      },
    ]);
  }, []);

  function openLeaveCard(item) {
    setSelectedLeave(item);
  }

  function closeModal() {
    setSelectedLeave(null);
  }

  function updateStatus(id, newStatus) {
    setLeavesList((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: newStatus } : leave,
      ),
    );
    closeModal();
  }

  const statusColor = {
    APPROVED: "green",
    PENDING: "yellow",
    REJECTED: "red",
  };

  return (
    <>
      {/* 🔍 Modal */}
      {selectedLeave && (
        <LeaveBriefCard
          leave={selectedLeave}
          onClose={closeModal}
          onApprove={() => updateStatus(selectedLeave.id, "APPROVED")}
          onReject={() => updateStatus(selectedLeave.id, "REJECTED")}
        />
      )}

      {/* 📋 Table */}
      <Table.ScrollArea
        border="1px solid"
        borderColor="gray.200"
        rounded="lg"
        height="300px"
        bg="white"
      >
        <Table.Root size="sm" stickyHeader>
          <Table.Header>
            <Table.Row bg="gray.50">
              <Table.ColumnHeader>Type</Table.ColumnHeader>
              <Table.ColumnHeader>From</Table.ColumnHeader>
              <Table.ColumnHeader>To</Table.ColumnHeader>
              <Table.ColumnHeader>Days</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Action</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {leavesList.map((item) => (
              <Table.Row key={item.id} _hover={{ bg: "gray.50" }}>
                <Table.Cell>{item.type}</Table.Cell>
                <Table.Cell>{item.from}</Table.Cell>
                <Table.Cell>{item.to}</Table.Cell>
                <Table.Cell>{item.days}</Table.Cell>
                <Table.Cell>
                  <Badge colorScheme={statusColor[item.status]}>
                    {item.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="xs"
                    colorScheme="indigo"
                    variant="outline"
                    onClick={() => openLeaveCard(item)}
                  >
                    View
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </>
  );
}

export default LeaveApprovalComponent;
