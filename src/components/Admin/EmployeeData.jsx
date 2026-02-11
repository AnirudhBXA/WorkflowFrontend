import {
  Edit3,
  Trash2,
  X,
  Check,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useState, useMemo } from "react";

export default function EmployeeDataView({
  employees = [],
  onEditSubmit,
  onDeleteConfirm,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Track which specific ID is being edited
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  const startEdit = (emp) => {
    setEditingId(emp.employeeId);
    setEditData({
      ...emp,
      salary: emp.salary || 0,
      leaveBalance: emp.leaveBalance || 0,
    });
    setActionError("");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      setActionLoading(true);
      const payload = { ...editData };

      await onEditSubmit(payload);
      setEditingId(null);
    } catch (err) {
      setActionError("Failed to update employee.");
    } finally {
      setActionLoading(false);
    }
  };

  // --- Search & Pagination logic ---
  const filteredData = useMemo(() => {
    return employees.filter((emp) =>
      Object.values(emp).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [employees, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="space-y-6 relative">
      {actionError && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 p-3 border border-red-200 rounded text-sm">
          <AlertCircle size={16} />
          {actionError}
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
          <div className="bg-white p-6 max-w-sm w-full shadow-xl border border-zinc-200">
            <h3 className="font-bold text-lg mb-2">Confirm Deletion</h3>
            <p className="text-zinc-600 text-sm mb-6">
              Remove this employee record?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-xs font-bold uppercase border"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    setActionLoading(true);
                    await onDeleteConfirm(deleteConfirm);
                    setDeleteConfirm(null);
                  } finally {
                    setActionLoading(false);
                  }
                }}
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

      <div className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-3 shadow-sm">
        <Search size={18} className="text-zinc-400" />
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full text-sm outline-none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden relative">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b">
            <tr>
              <th className="px-4 py-4 text-left">EmpID</th>
              <th className="px-4 py-4 text-left">Full Name</th>
              <th className="px-4 py-4 text-left">Email</th>
              <th className="px-4 py-4 text-left">Leaves</th>
              <th className="px-4 py-4 text-left">Salary</th>
              <th className="px-4 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {currentRows.map((emp) => (
              <tr
                key={emp.employeeId}
                className={
                  editingId === emp.employeeId
                    ? "bg-zinc-50"
                    : "hover:bg-zinc-50/50"
                }
              >
                <td className="px-4 py-4 text-xs">{emp.employeeId || "N/A"}</td>

                {/* STRICT ID CHECK: Only current row enters edit mode */}
                {editingId === emp.employeeId ? (
                  <>
                    <td className="px-4 py-2">
                      <input
                        name="name"
                        value={editData.name || ""}
                        onChange={handleEditChange}
                        className="border p-1 w-full rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-2 text-zinc-400 bg-zinc-100/30 text-xs italic">
                      {emp.email}
                    </td>
                    <td className="px-4 py-2">
                      <input
                        name="leaveBalance"
                        type="number"
                        value={editData.leaveBalance ?? ""}
                        onChange={handleEditChange}
                        className="border p-1 w-full rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        name="salary"
                        type="number"
                        value={editData.salary ?? ""}
                        onChange={handleEditChange}
                        className="border p-1 w-full rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={saveEdit}
                          className="text-green-600 p-1"
                        >
                          <Check size={20} />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditData({});
                          }}
                          className="text-zinc-400 p-1"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-4 font-medium">{emp.name}</td>
                    <td className="px-4 py-4 text-zinc-500">{emp.email}</td>
                    <td className="px-4 py-4">{emp.leaveBalance ?? "0"}</td>
                    <td className="px-4 py-4">
                      ${emp.salary?.toLocaleString() ?? "0"}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-3 text-zinc-300">
                        <button
                          onClick={() => startEdit(emp)}
                          className="hover:text-zinc-900"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(emp.employeeId)}
                          className="hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bg-zinc-50 px-4 py-3 border-t flex items-center justify-between">
          <p className="text-xs text-zinc-500">
            Showing {currentRows.length} records
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
