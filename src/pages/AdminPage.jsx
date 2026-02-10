import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import AdminSidebar from "../components/Admin/AdminSidebar";
import UserRegistryView from "../components/Admin/UserRegistery";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    username: "",
  });

  /* ---------------- Utils ---------------- */

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- Fetch Users ---------------- */

  useEffect(() => {
    axiosInstance
      .get("/admin/users")
      .then((res) => setUsers(res.data ?? []))
      .catch(() => setError("Failed to load users"));
  }, []);

  /* ---------------- Add User ---------------- */

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.role ||
      !formData.username
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const tempPassword = Math.random().toString(36).slice(-8);

    const payload = {
      ...formData,
      password: tempPassword,
    };

    try {
      setLoading(true);
      const res = await axiosInstance.post("/admin/user/create", payload);

      setUsers((prev) => [
        ...prev,
        {
          ...payload,
          id: res.data?.id ?? Date.now(),
          status: "Active",
        },
      ]);

      alert("User created successfully. Password sent securely.");

      setFormData({
        name: "",
        email: "",
        role: "",
        username: "",
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ?? err?.message ?? "Invalid request",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Placeholder ---------------- */

  const PlaceholderView = ({ title }) => (
    <div className="h-96 flex items-center justify-center border-2 border-dashed text-zinc-400">
      <h2 className="text-xl font-black uppercase">{title} Configuration</h2>
    </div>
  );

  /* ---------------- Render ---------------- */

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1">
        <div className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold">
            System <span className="text-indigo-600">Admin</span>
          </h1>
        </div>

        <div className="p-8">
          {activeTab === "users" && (
            <UserRegistryView
              users={users}
              formData={formData}
              loading={loading}
              error={error}
              onChange={handleChange}
              onSubmit={handleAddUser}
            />
          )}

          {activeTab === "departments" && (
            <PlaceholderView title="Department" />
          )}
          {activeTab === "workflows" && <PlaceholderView title="Workflow" />}
          {activeTab === "employees" && <PlaceholderView title="Employee" />}
          {activeTab === "security" && <PlaceholderView title="Security" />}
        </div>
      </div>
    </div>
  );
}
