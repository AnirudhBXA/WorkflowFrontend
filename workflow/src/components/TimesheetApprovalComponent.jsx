import { useEffect, useState } from "react";
import { Table, Tabs, SimpleGrid, For } from "@chakra-ui/react"
import TimesheetBriefCard from "./TimesheetBriefCard";


function TimesheetApprovalComponent(){

    const [timeSheetsList, setTimeSheetsList] = useState([]);
    const [isCardActive, setIsCardActive] = useState(false)
    const [cardItem, setCardItem] = useState(null);

    useEffect(()=>{
        setTimeSheetsList(
            [
                { id: 1, employeeName : "anirudh", dateOfSubmit : "2-3-2026", totalWorkingHours: 40},
                { id: 2, employeeName : "sai", dateOfSubmit : "2-3-2026", totalWorkingHours: 40},
                { id: 3, employeeName : "murli", dateOfSubmit : "2-3-2026", totalWorkingHours: 40},
                { id: 4, employeeName : "keerthu", dateOfSubmit : "2-3-2026", totalWorkingHours: 40},
            ]
        )
    },[])

    function openTimesheetApproval(item){
        setIsCardActive(true)
        console.log(item)
    }

    return (
        <>

            {isCardActive && (
                <>
                    <TimesheetBriefCard item={cardItem}></TimesheetBriefCard>
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
                
                {/* Header */}
                <Table.Header>
                <Table.Row bg="gray.50">
                    <Table.ColumnHeader fontSize="xs" color="gray.600">
                    Employee Name
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontSize="xs" color="gray.600">
                    Submitted on
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontSize="xs" color="gray.600">
                    Working hours
                    </Table.ColumnHeader>
                </Table.Row>
                </Table.Header>

                {/* Body */}
                <Table.Body>
                {timeSheetsList.map((item) => (
                    <Table.Row
                    key={item.id}
                    _hover={{ bg: "gray.50" }}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    onClick={ (item) => openTimesheetApproval(item)}
                    >
                    <Table.Cell fontSize="sm">{item.employeeName}</Table.Cell>
                    <Table.Cell fontSize="sm">{item.dateOfSubmit}</Table.Cell>
                    <Table.Cell fontSize="sm">{item.totalWorkingHours}</Table.Cell>
                    
                    </Table.Row>
                ))}
                </Table.Body>

            </Table.Root>
            </Table.ScrollArea>

        </>
    )
}

export default TimesheetApprovalComponent;