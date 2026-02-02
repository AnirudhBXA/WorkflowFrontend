import { Stack, Accordion, Table, Badge, Tabs, SimpleGrid, For, Button } from "@chakra-ui/react"
import { useState } from "react";
import FileUploadComponent from "./FileUploadComponent";
import MetricProgressCard from "./MetricProgressCard";

function InterviewsComponent(){

    const role = "HR";

    const [isUploadActive, setIsUploadActive] = useState(false);

    function makeUploadCardActive(){
        setIsUploadActive(true)
    }

    let interviewList = [
        { id: 1, candidateName: "Laptop", candidateEmail: "Electronics", scheduledDate: 999.99, status: "unMarked" },
        { id: 2, candidateName: "Coffee Maker", candidateEmail: "Home Appliances", scheduledDate: 49.99, status: "unMarked" },
        { id: 3, candidateName: "Desk Chair", candidateEmail: "Furniture", scheduledDate: 150.0, status: "noShow" },
        { id: 4, candidateName: "Smartphone", candidateEmail: "Electronics", scheduledDate: 799.99, status: "completed" },
        { id: 5, candidateName: "Headphones", candidateEmail: "Accessories", scheduledDate: 199.99, status: "completed" },
    ]

    function makeMarkingActive(){

    }

    function closeUploadComponent(){
        setIsUploadActive(false)
    }

    function handleMarkingClick(){

    }

    const getStatusMarker = (status) => {
        const statusColorMap = {
            unMarked:"blue",
            noShow:"black",
            completed:"green"
        };

        const clickableFunction = "";

        if(status==="completed"){
            return (
                <Badge
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontSize="xs"
                  fontWeight="medium"
                  colorScheme={statusColorMap[status]}
                  onClick={handleMarkingClick}
                >
                  {status}
                </Badge>
              );
        }
      
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
                    
                    <MetricProgressCard title="Interview" value="6"></MetricProgressCard>


                    <Table.ScrollArea
            border="1px solid"
            borderColor="gray.200"
            rounded="lg"
            height="260px"
            bg="white"
            >
            <Table.Root size="sm" stickyHeader>
                
                {/* Header */}
                <Table.Header>
                <Table.Row bg="gray.50">
                    <Table.ColumnHeader fontSize="xs" color="gray.600">
                    Candidate Name
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontSize="xs" color="gray.600">
                    Candidate email
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontSize="xs" color="gray.600">
                    Scheduled Date
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontSize="xs" color="gray.600">
                    Status
                    </Table.ColumnHeader>
                </Table.Row>
                </Table.Header>

                {/* Body */}
                <Table.Body>
                {interviewList.map((item) => (
                    <Table.Row
                    key={item.id}
                    _hover={{ bg: "gray.50" }}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    >
                    <Table.Cell fontSize="sm">{item.candidateName}</Table.Cell>
                    <Table.Cell fontSize="sm">{item.candidateEmail}</Table.Cell>
                    <Table.Cell fontSize="sm">{item.scheduledDate}</Table.Cell>
                    <Table.Cell fontSize="sm">{getStatusMarker(item.status)}</Table.Cell>
                    
                    </Table.Row>
                ))}
                </Table.Body>

            </Table.Root>
            </Table.ScrollArea>

                  </Stack>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
      
            {/* Manager Section */}
            {(role === "manager" || role === "HR") && (
              <Accordion.Item value="management">
                <Accordion.ItemTrigger>
                  Management / Workflows
                </Accordion.ItemTrigger>
      
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <Stack spacing={4}>
      
                    { (role === "HR") && (
                        <>
                            <button className=" bg-blue-800 text-white px-10 py-4 rounded-sm text-sm font-medium hover:bg-blue-1000 transition shadow-sm "
                            onClick={makeUploadCardActive}>Schedule Trainings</button>
                        </>
                    )}

                    { isUploadActive && (
                        <>
                        <div className="bg-white w-[420px] rounded-xl shadow-xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-sm font-semibold text-gray-800">
                                    Upload the Trainings excel
                                </h2>
                                <button onClick={closeUploadComponent} className="text-gray-400 hover:text-gray-600">✕</button>
                            </div>
                            <FileUploadComponent></FileUploadComponent>
                        </div>
                        </>
                    )}
      
                    </Stack>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            )}
      
          </Accordion.Root>
        </Stack>
      );
}

export default InterviewsComponent