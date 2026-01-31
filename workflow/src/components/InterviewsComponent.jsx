import { Table, Tabs, SimpleGrid, For } from "@chakra-ui/react"
import { useState } from "react";
import FileUploadComponent from "./FileUploadComponent";

function InterviewsComponent(){

    const role = "HR";

    const [isUploadActive, setIsUploadActive] = useState(false);

    function makeUploadCardActive(){
        setIsUploadActive(true)
    }

    let items = [
        { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
        { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
        { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
        { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
        { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
    ]

    return (
        <>

            { (role === "HR") && (
                <>
                    <button onClick={makeUploadCardActive}>Schedule Trainings</button>
                </>
            )}

            { isUploadActive && (
                <>
                <FileUploadComponent></FileUploadComponent>
                </>
            )}

            <SimpleGrid columns={2} gap="14" width="full">
                <Tabs.Root key="outline" defaultValue="members" variant="outline">

                    {/* Tabs display */}
                    <Tabs.List>
                    <Tabs.Trigger value="previous">
                        Previous
                    </Tabs.Trigger>
                    <Tabs.Trigger value="upcoming">
                        Upcoming
                    </Tabs.Trigger>
                    </Tabs.List>


                    {/* Content for the tabs */}
                    <Tabs.Content value="previous">
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

                    <Tabs.Content value="upcoming">
                        
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

export default InterviewsComponent