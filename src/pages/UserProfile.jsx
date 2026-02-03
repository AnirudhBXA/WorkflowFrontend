import { useEffect, useState } from "react";
import { Table, Tabs, SimpleGrid } from "@chakra-ui/react";
import ValuesDisplayCard from "../components/ValuesDisplayCard";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [leaveSummary, setLeaveSummary] = useState({ available: 0, used: 0 });

  useEffect(() => {
    setProfile({
      name: "Anirudh Myakam",
      designation: "Frontend Developer",
      email: "anirudh@company.com",
      department: "Engineering",
      manager: "Ravi Kumar",
      hr: "Sneha Sharma",
      employeeId: "EMP-1024",
    });

    setLeaves([
      {
        id: 1,
        from: "2026-02-01",
        to: "2026-02-03",
        days: 3,
        reason: "Vacation",
        status: "approved",
      },
      {
        id: 2,
        from: "2026-03-05",
        to: "2026-03-06",
        days: 2,
        reason: "Medical",
        status: "pending",
      },
      {
        id: 3,
        from: "2026-01-10",
        to: "2026-01-12",
        days: 3,
        reason: "Travel",
        status: "rejected",
      },
    ]);

    setCertifications([
      { id: 1, title: "AI & ML", provider: "Coursera", date: "2025-10-01" },
      {
        id: 2,
        title: "Cloud Computing",
        provider: "Udemy",
        date: "2025-12-15",
      },
    ]);

    setLeaveSummary({ available: 5, used: 3 });
  }, []);

  const filterLeaves = (status) => leaves.filter((l) => l.status === status);

  if (!profile) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* PROFILE CARD */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-6 border-b pb-6">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-2xl font-semibold">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {profile.name}
            </h2>
            <p className="text-sm text-gray-500">{profile.designation}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <ProfileField label="Email" value={profile.email} />
          <ProfileField label="Department" value={profile.department} />
          <ProfileField label="Manager" value={profile.manager} />
          <ProfileField label="HR" value={profile.hr} />
          <ProfileField label="Employee ID" value={profile.employeeId} />
        </div>
      </div>

      {/* LEAVES */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-6">
          Leave Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ValuesDisplayCard
            data={{
              context: "Available Leaves",
              value: leaveSummary.available,
              units: "days",
            }}
          />
          <ValuesDisplayCard
            data={{
              context: "Leaves Used",
              value: leaveSummary.used,
              units: "days",
            }}
          />
        </div>

        <SimpleGrid columns={2} gap="14" width="full">
          <Tabs.Root defaultValue="approved" variant="outline">
            <Tabs.List>
              <Tabs.Trigger value="approved">Approved</Tabs.Trigger>
              <Tabs.Trigger value="rejected">Rejected</Tabs.Trigger>
              <Tabs.Trigger value="pending">Pending</Tabs.Trigger>
            </Tabs.List>

            {["approved", "rejected", "pending"].map((status) => (
              <Tabs.Content key={status} value={status}>
                <Table.ScrollArea borderWidth="1px" rounded="md" height="160px">
                  <Table.Root size="sm" stickyHeader>
                    <Table.Header>
                      <Table.Row bg="bg.subtle">
                        <Table.ColumnHeader>From</Table.ColumnHeader>
                        <Table.ColumnHeader>To</Table.ColumnHeader>
                        <Table.ColumnHeader>Days</Table.ColumnHeader>
                        <Table.ColumnHeader>Reason</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {filterLeaves(status).map((l) => (
                        <Table.Row key={l.id}>
                          <Table.Cell>{l.from}</Table.Cell>
                          <Table.Cell>{l.to}</Table.Cell>
                          <Table.Cell>{l.days}</Table.Cell>
                          <Table.Cell>{l.reason}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Table.ScrollArea>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </SimpleGrid>
      </div>

      {/* CERTIFICATIONS */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-6">
          Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-5 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition hover:-translate-y-1"
            >
              <h3 className="text-md font-semibold text-gray-800">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-500">{cert.provider}</p>
              <p className="text-sm mt-2">Completed: {cert.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-800">{value}</p>
    </div>
  );
}

export default UserProfile;
