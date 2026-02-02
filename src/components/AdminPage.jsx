import { useState } from "react";

function AdminPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Anirudh Myakam",
      email: "anirudh@company.com",
      role: "Employee",
      department: "Engineering",
    },
    {
      id: 2,
      name: "Ravi Kumar",
      email: "ravi@company.com",
      role: "Manager",
      department: "Engineering",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.email) return;

    setUsers([
      ...users,
      { ...formData, id: Date.now() },
    ]);

    setFormData({ name: "", email: "", role: "", department: "" });
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          User Management
        </h1>
        <p className="text-sm text-gray-500">
          Create, update and manage users
        </p>
      </div>

      {/* Create User Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Create User
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border rounded-md px-3 py-2"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-md px-3 py-2"
          />

          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="border rounded-md px-3 py-2"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border rounded-md px-3 py-2"
          >
            <option value="">Select Role</option>
            <option>Employee</option>
            <option>Manager</option>
            <option>HR</option>
            <option>Admin</option>
          </select>
        </div>

        <button
          onClick={handleAddUser}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          All Users
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Role</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                  <td>
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      {user.role}
                    </span>
                  </td>
                  <td className="text-right space-x-2">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default AdminPage;
