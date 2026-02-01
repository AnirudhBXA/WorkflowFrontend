import { useEffect, useState } from "react";
import { Table, Tabs, SimpleGrid, For } from "@chakra-ui/react"
import TimesheetBriefCard from "./TimesheetBriefCard";


function TimesheetApprovalComponent(){

    const [items, setItems] = useState([]);
    const [isCardActive, setIsCardActive] = useState(false)
    const [cardItem, setCardItem] = useState(null);

    useEffect(()=>{
        setItems([{ id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
        { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
        { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
        { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
        { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },])
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

            <Table.ScrollArea borderWidth="1px" rounded="md" height="160px">
                <Table.Root size="sm" stickyHeader>
                    <Table.Header>
                    <Table.Row bg="bg.subtle">
                        <Table.ColumnHeader>Product</Table.ColumnHeader>
                        <Table.ColumnHeader>Category</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {items.map((item) => (
                        <Table.Row key={item.id} onClick={ (item) => openTimesheetApproval(item)}>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>{item.category}</Table.Cell>
                        <Table.Cell textAlign="end">{item.price}</Table.Cell>
                        </Table.Row>
                    ))}
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>
        </>
    )
}

export default TimesheetApprovalComponent;