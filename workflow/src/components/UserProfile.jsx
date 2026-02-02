
import { Table, Tabs, SimpleGrid, For } from "@chakra-ui/react"

import ValuesDisplayCard from './ValuesDisplayCard'

function UserProfile() {


    let leavesList = [
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


    function ProfileField({ label, value }) {

        return (
          <div>
            <p className="text-sm text-gray-500">
              {label}
            </p>
            <p className="text-base font-medium text-gray-800">
              {value}
            </p>
          </div>
        );
      }

    return (
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            User Profile
          </h1>
          <p className="text-sm text-gray-500">
            View your personal and organizational details
          </p>
        </div>
  
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          
          {/* Top Section */}
          <div className="flex items-center gap-6 border-b pb-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-semibold">
              AM
            </div>
  
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Anirudh Myakam
              </h2>
              <p className="text-sm text-gray-500">
                Software Engineer
              </p>
            </div>
          </div>
  
          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            
            <ProfileField label="Email" value="anirudh@company.com" />
            <ProfileField label="Department" value="Engineering" />
            <ProfileField label="Role" value="Frontend Developer" />
            <ProfileField label="Manager" value="Ravi Kumar" />
            <ProfileField label="HR" value="Sneha Sharma" />
            <ProfileField label="Employee ID" value="EMP-1024" />
            
          </div>
        </div>

        {/* leaves card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          
          {/* Top Section */}
          <div className="flex items-center gap-6 border-b pb-6">
  
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Leaves
              </h2>
            </div>
          </div>
  
          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            
            {/* leave balance display */}
            <div>
                <ValuesDisplayCard data={available_leaves}></ValuesDisplayCard>
            </div>
            <div>
                <ValuesDisplayCard data={leaves_used}></ValuesDisplayCard>
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
                            {leavesList.map((item) => (
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
                            {leavesList.map((item) => (
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
                            {leavesList.map((item) => (
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
            
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-xl shadow-md p-6">
          
          {/* Top Section */}
          <div className="flex items-center gap-6 border-b pb-6">
  
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Certifications
              </h2>
            </div>
          </div>
  
          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            
            <div className="items-center gap-6 px-8 py-6 bg-white rounded-lg shadow-md min-w-[320px]">
                <h3>AI&ML training</h3>
                <div className="flex">
                    <p>completion date</p>
                    <p className="">Organization</p>
                </div>
            </div>
            <div className="items-center gap-6 px-8 py-6 bg-white rounded-lg shadow-md min-w-[320px]">
                <h3>Cloud computing</h3>
                <div className="flex">
                    <p>completion date</p>
                    <p>Organization</p>
                </div>
            </div>
            <div className="items-center gap-6 px-8 py-6 bg-white rounded-lg shadow-md min-w-[320px]">
                <h3>Communication Like pro</h3>
                <div className="flex">
                    <p>completion date</p>
                    <p>Organization</p>
                </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
  
  export default UserProfile;
  