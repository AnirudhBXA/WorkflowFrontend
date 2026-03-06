import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import AdminSidebar from "../components/Admin/AdminSidebar";
import UserRegistryView from "../components/Admin/UserRegistery";
import DepartmentRegistryView from "../components/Admin/DepartmentRegistry";
import EmployeeDataView from "../components/Admin/EmployeeData";
import Loader from "../components/Layout/Loader";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [departmentName, setDepartmentName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    username: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, deptRes, empRes] = await Promise.all([
          axiosInstance.get("/admin/user/all"),
          axiosInstance.get("/departments"),
          axiosInstance.get("/employees"),
        ]);
        setUsers(usersRes.data ?? []);
        setDepartments(deptRes.data ?? []);
        setEmployees(empRes.data ?? []);
      } catch (err) {
        setError("Failed to synchronize system data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const tempPassword = Math.random().toString(36).slice(-8);
    try {
      setLoading(true);
      const res = await axiosInstance.post("/admin/user/create", {
        ...formData,
        password: tempPassword,
      });
      setUsers((prev) => [
        ...prev,
        { ...formData, id: res.data?.id ?? Date.now(), status: "Active" },
      ]);
      setFormData({ name: "", email: "", role: "", username: "" });
      alert(`User created successfully!`);
    } catch (err) {
      setError(err.response?.data?.message || "User creation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (updatedUser) => {
    try {
      setLoading(true);
      await axiosInstance.put(`/admin/user/update`, {
        id: updatedUser.id,
        role: updatedUser.role,
      });
      setUsers((prev) =>
        prev.map((u) =>
          u.id === updatedUser.id ? { ...u, ...updatedUser } : u,
        ),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async (userId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/admin/user/${userId}`);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstance.post("/departments", { departmentName });
      setDepartments((prev) => [...prev, res.data]);
      setDepartmentName("");
    } catch (err) {
      setError("Dept creation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEditDept = async (updatedDept) => {
    try {
      setLoading(true);
      const payload = {
        departmentName: updatedDept.departmentName,
        hrId: updatedDept.hrId ? Number(updatedDept.hrId) : null,
      };

      const res = await axiosInstance.put(
        `/departments/${updatedDept.departmentId}`,
        payload,
      );

      const savedDept = res.data;

      setDepartments((prev) =>
        prev.map((d) =>
          d.departmentId === updatedDept.departmentId
            ? {
                ...savedDept,
                hrId: savedDept.hr?.employeeId || savedDept.hrId,
              }
            : d,
        ),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDept = async (id) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/departments/${id}`);
      setDepartments((prev) => prev.filter((d) => d.departmentId !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditEmployee = async (updatedEmp) => {
    try {
      setLoading(true);
      const empId = updatedEmp.employeeId;
      if (!empId) return;

      const res = await axiosInstance.put(`/employees/${empId}`, updatedEmp);
      const finalData = res.data || updatedEmp;

      setEmployees((prev) =>
        prev.map((emp) => (emp.employeeId === empId ? finalData : emp)),
      );

      return finalData;
    } catch (err) {
      console.error("Backend Error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/employees/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp.employeeId !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader label="Fetching data..." />;
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 antialiased text-zinc-900">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold">
            System <span className="text-indigo-600">Admin {`>`} </span>{" "}
            <span className="capitalize">{activeTab}</span>
          </h1>
        </header>
        <main className="p-8">
          {activeTab === "users" && (
            <UserRegistryView
              users={users}
              formData={formData}
              loading={loading}
              error={error}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              onSubmit={handleAddUser}
              onEditSubmit={handleEditSubmit}
              onDeleteConfirm={handleDeleteConfirm}
            />
          )}

          {activeTab === "departments" && (
            <DepartmentRegistryView
              departments={departments}
              departmentName={departmentName}
              loading={loading}
              error={error}
              onChange={(e) => setDepartmentName(e.target.value)}
              onSubmit={handleAddDepartment}
              onEditSubmit={handleEditDept}
              onDeleteConfirm={handleDeleteDept}
            />
          )}

          {activeTab === "employees" && (
            <EmployeeDataView
              employees={employees}
              onEditSubmit={handleEditEmployee}
              onDeleteConfirm={handleDeleteEmployee}
            />
          )}

          {["workflows", "security"].includes(activeTab) && (
            <div className="h-96 flex items-center justify-center border-2 border-dashed text-zinc-400">
              <h2 className="text-xl font-black uppercase">
                {activeTab} Configuration
              </h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
