import { useEffect, useState } from "react";
import { Table, Tabs, SimpleGrid, For,Badge } from "@chakra-ui/react"
import LeaveBriefCard from "./LeaveBriefCard";


function LeaveApprovalComponent(){

    const [leavesList, setleavesList] = useState([]);
    const [isCardActive, setIsCardActive] = useState(false)
    const [cardItem, setCardItem] = useState(null);

    useEffect(()=>{
        setleavesList([
            { id: 1, type: "Laptop", from: "5-7-2026", to: "5-7-2026", days: 5, status: "APPROVED", reason: "personal reason" },
            { id: 2, type: "Coffee Maker", from: "5-7-2026", to: "5-7-2026", days: 5, status: "APPROVED", reason: "personal reason" },
            { id: 3, type: "Desk Chair", from: "5-7-2026", to: "5-7-2026", days: 5, status: "APPROVED", reason: "personal reason" },
            { id: 4, type: "Smartphone", from: "5-7-2026", to: "5-7-2026", days: 5, status: "APPROVED", reason: "personal reason" },
            { id: 5, type: "Headphones", from: "5-7-2026", to: "5-7-2026", days: 5, status: "APPROVED", reason: "personal reason" },
        ])
    },[])

    function openLeaveCard(item){
        setIsCardActive(true)
        console.log(item)
    }

    return (
        <>

            {isCardActive && (
                <>
                    <LeaveBriefCard item={cardItem}></LeaveBriefCard>
                </>
            )}


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
                              {/* <Table.ColumnHeader fontSize="xs" color="gray.600">
                                Status
                              </Table.ColumnHeader> */}
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
                                {/* <Table.Cell>
                                  {getStatusMarker(item.status)}
                                </Table.Cell> */}
                                <Table.Cell fontSize="sm">
                                  {item.reason}
                                </Table.Cell>
                                <Table.Cell fontSize="sm">
                                <Badge
                                    px={3}
                                    py={1}
                                    borderRadius="md"
                                    fontSize="xs"
                                    fontWeight="medium"
                                    colorScheme="blue"
                                    
                                    onClick={ (item) => openLeaveCard(item)}
                                >
                                    view
                                </Badge>
                                </Table.Cell>

                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table.Root>
                      </Table.ScrollArea>

        </>
    )

}

export default LeaveApprovalComponent;