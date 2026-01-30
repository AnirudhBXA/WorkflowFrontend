import { Table, Tabs, SimpleGrid, For } from "@chakra-ui/react"

import ValuesDisplayCard from './ValuesDisplayCard'


function LeavesComponent(){

    let items = [
        { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
        { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
        { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
        { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
        { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
    ]

    let available_leaves = 5;
    let leaves_used = 3;

    return (
        <>

            <div>
                <ValuesDisplayCard context="available leaves" color="bg-green-400" value={available_leaves} units="days"></ValuesDisplayCard>
            </div>
            <div>
                <ValuesDisplayCard context="leaves used" color="bg-red-400" value={leaves_used} units="days"></ValuesDisplayCard>
            </div>


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