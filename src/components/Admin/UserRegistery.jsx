import {
  Edit3,
  Trash2,
  X,
  Check,
  Loader2,
  AlertCircle,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useMemo } from "react";

export default function UserRegistryView({
  users,
  formData,
  loading,
  error,
  onChange,
  onSubmit,
  onEditSubmit,
  onDeleteConfirm,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      Object.values(user).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditData(user);
    setActionError("");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      setActionLoading(true);
      setActionError("");
      await onEditSubmit(editData);
      setEditingId(null);
    } catch (err) {
      setActionError("Failed to update user.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-8 relative">
      {actionError && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 p-3 border border-red-200 rounded text-sm">
          <AlertCircle size={16} />
          {actionError}
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
          <div className="bg-white p-6 max-w-sm w-full shadow-xl border border-zinc-200">
            <h3 className="font-bold text-lg mb-2">Confirm Delete</h3>
            <p className="text-zinc-600 text-sm mb-6">
              Are you sure? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                disabled={actionLoading}
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-xs font-bold uppercase border"
              >
                Cancel
              </button>
              <button
                disabled={actionLoading}
                onClick={() => onDeleteConfirm(deleteConfirm)}
                className="px-4 py-2 text-xs font-bold uppercase bg-red-600 text-white flex items-center gap-2"
              >
                {actionLoading && (
                  <Loader2 size={14} className="animate-spin" />
                )}{" "}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-zinc-200 shadow-sm">
        <div className="bg-zinc-50 px-6 py-3 border-b">
          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500">
            Create Account
          </h2>
        </div>
        <form onSubmit={onSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["name", "email", "username"].map((field) => (
              <div key={field}>
                <label className="text-xs font-bold uppercase text-zinc-500">
                  {field} *
                </label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={onChange}
                  className="w-full px-3 py-2 border text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-bold uppercase text-zinc-500">
                role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={onChange}
                className="w-full px-3 py-2 border text-sm"
              >
                <option value="">Select Role</option>
                <option>Employee</option>
                <option>Manager</option>
                <option>HR</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <div className="mt-6 flex justify-end">
            <button
              disabled={loading}
              className="bg-zinc-900 text-white px-8 py-2 text-xs uppercase font-bold"
            >
              {loading ? "Creating..." : "Add User"}
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2">
        <Search size={18} className="text-zinc-400" />
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          className="w-full text-sm outline-none"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden relative">
        {actionLoading && !deleteConfirm && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            <Loader2 className="animate-spin text-zinc-900" size={32} />
          </div>
        )}

        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b">
            <tr>
              <th className="px-4 py-4 text-left">ID</th>
              <th className="px-4 py-4 text-left">Username</th>
              <th className="px-4 py-4 text-left text-zinc-400">Email</th>
              <th className="px-4 py-4 text-left">Role</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {currentRows.map((user) => (
              <tr
                key={user.id}
                className={editingId === user.id ? "bg-zinc-50" : ""}
              >
                <td className="px-4 py-4 text-xs">{user.id}</td>
                <td className="px-4 py-4">{user.username}</td>
                <td className="px-4 py-4 text-zinc-400">{user.email}</td>
                {editingId === user.id ? (
                  <>
                    <td className="px-4 py-2">
                      <select
                        name="role"
                        value={editData.role}
                        onChange={handleEditChange}
                        className="border border-zinc-300 p-1 w-full bg-white"
                      >
                        <option>Employee</option>
                        <option>Manager</option>
                        <option>HR</option>
                        <option>Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 italic text-zinc-400">Active</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={saveEdit} className="text-green-600">
                          <Check size={20} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-zinc-400"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-4">
                      <span className="bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase rounded">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-green-600">Active</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => startEdit(user)}
                          className="text-zinc-400 hover:text-zinc-900"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(user.id)}
                          className="text-zinc-300 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {currentRows.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10 text-zinc-400">
                  No users found match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="bg-zinc-50 px-4 py-3 border-t flex items-center justify-between">
          <p className="text-xs text-zinc-500">
            Showing <span className="font-bold">{indexOfFirstRow + 1}</span> to{" "}
            <span className="font-bold">
              {Math.min(indexOfLastRow, filteredUsers.length)}
            </span>{" "}
            of <span className="font-bold">{filteredUsers.length}</span> results
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-1 border bg-white disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-1 border bg-white disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}