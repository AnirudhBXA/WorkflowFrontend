import { Table, Tabs, SimpleGrid, For } from "@chakra-ui/react"

import ValuesDisplayCard from './ValuesDisplayCard'
import LeaveApprovalComponent from "./LeaveApprovalComponent";
import { useState } from "react";
import FileUploadComponent from "./FileUploadComponent";


function LeavesComponent(){

    const [role, setRole] = useState("manager")
    const [isUploadActive, setIsUploadActive] = useState(false)

    let items = [
        { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
        { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
        { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
        { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
        { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
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


    return (
        <>

            <div>
                <ValuesDisplayCard data={available_leaves}></ValuesDisplayCard>
            </div>
            <div>
                <ValuesDisplayCard data={leaves_used}></ValuesDisplayCard>
            </div>

            <div>
                { (role === "HR") && (
                    <>
                        <button onClick={makeUploadCardActive}>Update Leaves</button>
                    </>
                )}

                { isUploadActive && (
                    <>
                    <FileUploadComponent></FileUploadComponent>
                    </>
                )}
            </div>

            { (role === "manager") && (
                <div>
                    <LeaveApprovalComponent></LeaveApprovalComponent>
                </div>
            )}

            
            <SimpleGrid columns={2} gap="14" width="full">
                <Tabs.Root key="outline" defaultValue="members" variant="outline">

                    {/* Tabs display */}
                    <Tabs.List>
                    <Tabs.Trigger value="approved">
                        Approved
                    </Tabs.Trigger>
                    <Tabs.Trigger value="rejected">
                        Rejected
                    </Tabs.Trigger>
                    <Tabs.Trigger value="pending">
                        Pending
                    </Tabs.Trigger>
                    </Tabs.List>


                    {/* Content for the tabs */}
                    <Tabs.Content value="approved">
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
                                <Table.Row key={item.id}>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>{item.category}</Table.Cell>
                                <Table.Cell textAlign="end">{item.price}</Table.Cell>
                                </Table.Row>
                            ))}
                            </Table.Body>
                        </Table.Root>
                        </Table.ScrollArea>
                    </Tabs.Content>

                    <Tabs.Content value="rejected">
                        
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
                                <Table.Row key={item.id}>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>{item.category}</Table.Cell>
                                <Table.Cell textAlign="end">{item.price}</Table.Cell>
                                </Table.Row>
                            ))}
                            </Table.Body>
                        </Table.Root>
                    </Table.ScrollArea>
                    </Tabs.Content>

                    <Tabs.Content value="pending">
                        
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
                                <Table.Row key={item.id}>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>{item.category}</Table.Cell>
                                <Table.Cell textAlign="end">{item.price}</Table.Cell>
                                </Table.Row>
                            ))}
                            </Table.Body>
                        </Table.Root>
                        </Table.ScrollArea>
                    </Tabs.Content>
                    
                </Tabs.Root>
            </SimpleGrid>
        </>
    )

}

export default LeavesComponent;