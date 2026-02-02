import { Stack, Accordion, Badge, Table, Tabs, SimpleGrid, For } from "@chakra-ui/react"

import ValuesDisplayCard from './ValuesDisplayCard'
import LeaveApprovalComponent from "./LeaveApprovalComponent";
import { useState } from "react";
import FileUploadComponent from "./FileUploadComponent";


function LeavesComponent(){

    const [role, setRole] = useState("manager")
    const [isUploadActive, setIsUploadActive] = useState(false)

    let leavesList = [
        { id: 1, type: "Laptop", from: "5-7-2026", to: "5-7-2026", days: 5, status: "APPROVED", reason: "personal reason" },
        { id: 2, type: "Coffee Maker", from: "5-7-2026", to: "5-7-2026", days: 5, status: "APPROVED", reason: "personal reason" },
        { id: 3, type: "Desk Chair", from: "5-7-2026", to: "5-7-2026", days: 5, status: "APPROVED", reason: "personal reason" },
        { id: 4, type: "Smartphone", from: "5-7-2026", to: "5-7-2026", days: 5, status: "APPROVED", reason: "personal reason" },
        { id: 5, type: "Headphones", from: "5-7-2026", to: "5-7-2026", days: 5, status: "APPROVED", reason: "personal reason" },
    ]
    
    let available_leaves_count = 5;
    let leaves_used_count = 3;
    
    const available_leaves = { "context" : "available leaves",
                                 "color" : "bg-green-400",
                                 "value" : available_leaves_count,
                                 "units" : "days" }

    const leaves_used = { "context" : "leaves used",
                                 "color" : "bg-red-400",
                                 "value" : leaves_used_count,
                                 "units" : "days" }

    function makeUploadCardActive(){
        setIsUploadActive(true)
    }

    const getStatusMarker = (status) => {
        const statusColorMap = {
            APPROVED:"green",
            PENDING:"yellow",
            REJECTED:"red"
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



    return (
        <Stack width="full" maxW="100%" spacing={4}>
      
          <Accordion.Root collapsible defaultValue={["personal"]}>
      
            {/* Personal Info */}
            <Accordion.Item value="personal">
              <Accordion.ItemTrigger>
                My Personal Info
              </Accordion.ItemTrigger>
      
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <Stack spacing={4}>
                  <div>
                    <ValuesDisplayCard data={available_leaves}></ValuesDisplayCard>
                  </div>
                  <div>
                    <ValuesDisplayCard data={leaves_used}></ValuesDisplayCard>
                  </div>

                    <div>
                    <Table.ScrollArea
                        border="1px solid"
                        borderColor="gray.200"
                        rounded="lg"
                        height="260px"
                        bg="white"
                      >
                        <Table.Root size="sm" stickyHeader>
                          <Table.Header>
                            <Table.Row bg="gray.50">
                              <Table.ColumnHeader fontSize="xs" color="gray.600">
                                Leave Type
                              </Table.ColumnHeader>
                              <Table.ColumnHeader fontSize="xs" color="gray.600">
                                From
                              </Table.ColumnHeader>
                              <Table.ColumnHeader fontSize="xs" color="gray.600">
                                To
                              </Table.ColumnHeader>
                              <Table.ColumnHeader fontSize="xs" color="gray.600">
                                Days
                              </Table.ColumnHeader>
                              <Table.ColumnHeader fontSize="xs" color="gray.600">
                                Status
                              </Table.ColumnHeader>
                              <Table.ColumnHeader fontSize="xs" color="gray.600">
                                Reason
                              </Table.ColumnHeader>
                            </Table.Row>
                          </Table.Header>
      
                          <Table.Body>
                            {leavesList.map((item) => (
                              <Table.Row
                                key={item.id}
                                _hover={{ bg: "gray.50" }}
                                borderBottom="1px solid"
                                borderColor="gray.100"
                              >
                                <Table.Cell fontSize="sm">
                                  {item.type}
                                </Table.Cell>
                                <Table.Cell fontSize="sm">
                                  {item.from}
                                </Table.Cell>
                                <Table.Cell fontSize="sm">
                                  {item.to}
                                </Table.Cell>
                                <Table.Cell fontSize="sm">
                                  {item.days}
                                </Table.Cell>
                                <Table.Cell>
                                  {getStatusMarker(item.status)}
                                </Table.Cell>
                                <Table.Cell fontSize="sm">
                                  {item.reason}
                                </Table.Cell>
                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table.Root>
                      </Table.ScrollArea>
                    </div>

                  </Stack>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
      
            {/* Manager Section */}
            {role === "manager" && (
              <Accordion.Item value="management">
                <Accordion.ItemTrigger>
                  Management / Workflows
                </Accordion.ItemTrigger>
      
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <Stack spacing={4}>

                    <div>
                        { (role === "HR") && (
                            <>
                                <button  className=" bg-blue-800 text-white px-10 py-4 rounded-sm text-sm font-medium hover:bg-blue-1000 transition shadow-sm " onClick={makeUploadCardActive}>Update Leaves</button>
                            </>
                        )}

                        { isUploadActive && (
                            <FileUploadComponent></FileUploadComponent>
                        )}
                    </div>

                    { (role === "manager") && (
                        <div>
                            <LeaveApprovalComponent></LeaveApprovalComponent>
                        </div>
                    )}
      
                    </Stack>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            )}
      
          </Accordion.Root>
        </Stack>
    )

}

export default LeavesComponent;