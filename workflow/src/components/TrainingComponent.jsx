import { useState } from "react";
import TrainingCard from "./TrainingDisplayCard";
import FileUploadComponent from "./FileUploadComponent";
import { Stack, Accordion, Table, Badge  } from "@chakra-ui/react"

function TrainingsComponent(){

    const [role, setRole] = useState("manager")
    const [isUploadActive, setIsUploadActive] = useState(false)

    const items = [
        {"trainingName": "java", "trainerName": "anirudh", "startDate": "3-2-2026", "endDate":"6-2-2026"},
        {"trainingName": "python", "trainerName": "krishna", "startDate": "3-2-2026", "endDate":"6-2-2026"},
        {"trainingName": "english", "trainerName": "anirudh", "startDate": "3-2-2026", "endDate":"6-2-2026"},
        {"trainingName": "java 2.0", "trainerName": "prakash", "startDate": "3-2-2026", "endDate":"6-2-2026"},
    ]

    const employeeTrainings = [
        {"employeeName": "murli", "trainingTitle": "java", "trainerName": "anirudh", "startDate": "3-2-2026", "endDate":"6-2-2026", "status": "PLANNED"},
        {"employeeName": "murli","trainingTitle": "python", "trainerName": "krishna", "startDate": "3-2-2026", "endDate":"6-2-2026", "status": "ONGOING"},
        {"employeeName": "murli","trainingTitle": "english", "trainerName": "anirudh", "startDate": "3-2-2026", "endDate":"6-2-2026", "status": "COMPLETED"},
        {"employeeName": "murli","trainingTitle": "java 2.0", "trainerName": "prakash", "startDate": "3-2-2026", "endDate":"6-2-2026", "status": "COMPLETED"},
    ]

    function openUploadComponent(){
        setIsUploadActive(true)
    }

    const getStatusMarker = (status) => {
        const statusColorMap = {
            PLANNED:"blue",
            ONGOING:"yellow",
            COMPLETED:"green"
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
                    {items.map((item, index) => (
                      <TrainingCard data={item} key={index} />
                    ))}
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
      
                      {/* Assign Button */}
                      <button
                        className="bg-blue-800 text-white px-10 py-3 rounded-md text-sm font-medium hover:bg-blue-900 transition shadow-sm w-fit"
                        onClick={openUploadComponent}
                      >
                        Assign Trainings
                      </button>
      
                      {/* Upload Component */}
                      {isUploadActive && <FileUploadComponent />}
      
                      {/* Table */}
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
                                Employee Name
                              </Table.ColumnHeader>
                              <Table.ColumnHeader fontSize="xs" color="gray.600">
                                Training Title
                              </Table.ColumnHeader>
                              <Table.ColumnHeader fontSize="xs" color="gray.600">
                                Start Date
                              </Table.ColumnHeader>
                              <Table.ColumnHeader fontSize="xs" color="gray.600">
                                End Date
                              </Table.ColumnHeader>
                              <Table.ColumnHeader fontSize="xs" color="gray.600">
                                Status
                              </Table.ColumnHeader>
                            </Table.Row>
                          </Table.Header>
      
                          <Table.Body>
                            {employeeTrainings.map((item) => (
                              <Table.Row
                                key={item.id}
                                _hover={{ bg: "gray.50" }}
                                borderBottom="1px solid"
                                borderColor="gray.100"
                              >
                                <Table.Cell fontSize="sm">
                                  {item.employeeName}
                                </Table.Cell>
                                <Table.Cell fontSize="sm">
                                  {item.trainingTitle}
                                </Table.Cell>
                                <Table.Cell fontSize="sm">
                                  {item.startDate}
                                </Table.Cell>
                                <Table.Cell fontSize="sm">
                                  {item.endDate}
                                </Table.Cell>
                                <Table.Cell>
                                  {getStatusMarker(item.status)}
                                </Table.Cell>
                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table.Root>
                      </Table.ScrollArea>
      
                    </Stack>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            )}
      
          </Accordion.Root>
        </Stack>
      );
      
}

export default TrainingsComponent;