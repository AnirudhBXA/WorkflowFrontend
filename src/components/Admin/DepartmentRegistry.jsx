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

export default function DepartmentRegistryView({
  departments = [],
  onEditSubmit,
  onDeleteConfirm,
  loading,
  error,
  onChange,
  onSubmit,
  departmentName,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Inline Edit State
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Loading/Error State for actions
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  // --- Logic Handlers ---

  const startEdit = (dept) => {
    setEditingId(dept.departmentId);
    setEditData({ ...dept });
    setActionError("");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      setActionLoading(true);
      await onEditSubmit(editData);
      setEditingId(null);
    } catch (err) {
      setActionError("Failed to update department.");
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setActionLoading(true);
      await onDeleteConfirm(deleteConfirm);
      setDeleteConfirm(null);
    } catch (err) {
      setActionError("Failed to delete department.");
    } finally {
      setActionLoading(false);
    }
  };

  // --- Search & Pagination ---

  const filteredData = useMemo(() => {
    return departments.filter((dept) =>
      Object.values(dept).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [departments, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="space-y-8 relative">
      {/* Error Banner */}
      {actionError && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 p-3 border border-red-200 rounded text-sm">
          <AlertCircle size={16} />
          {actionError}
        </div>
      )}

      {/* --- Delete Confirmation Modal --- */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
          <div className="bg-white p-6 max-w-sm w-full shadow-xl border border-zinc-200">
            <h3 className="font-bold text-lg mb-2">Delete Department</h3>
            <p className="text-zinc-600 text-sm mb-6">
              Are you sure? All associations with this department may be
              affected.
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
                onClick={confirmDelete}
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

      {/* --- Create Department Form (Simplified for brevity) --- */}
      <div className="bg-white border border-zinc-200 shadow-sm">
        <div className="bg-zinc-50 px-6 py-3 border-b">
          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500">
            Add New Department
          </h2>
        </div>
        <form
          onSubmit={onSubmit} // ADD THIS: crucial for form submission
          className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="md:col-span-2">
            <label className="text-xs font-bold uppercase text-zinc-500">
              Dept Name *
            </label>
            <input
              name="departmentName"
              value={departmentName}
              onChange={onChange} // This now correctly calls setDepartmentName in the parent
              className="w-full px-3 py-2 border text-sm outline-none focus:ring-1 focus:ring-zinc-900"
              placeholder="e.g. Engineering"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit" // Ensure type is submit
              disabled={loading}
              className="w-full bg-zinc-900 text-white px-8 py-2 text-xs uppercase font-bold h-9.5 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Dept"}
            </button>
          </div>
        </form>
      </div>

      {/* --- Table Section --- */}
      <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden relative">
        {actionLoading && !deleteConfirm && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            <Loader2 className="animate-spin text-zinc-900" size={32} />
          </div>
        )}

        <div className="p-4 border-b flex items-center gap-2">
          <Search size={18} className="text-zinc-400" />
          <input
            type="text"
            placeholder="Search departments..."
            className="text-sm outline-none w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b">
            <tr>
              <th className="px-4 py-4 text-left">Dept ID</th>
              <th className="px-4 py-4 text-left">Name</th>
              <th className="px-4 py-4 text-left">HR Lead</th>
              <th className="px-4 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {currentRows.length > 0 ? (
              currentRows.map((dept) => (
                <tr
                  key={dept.departmentId}
                  className={
                    editingId === dept.departmentId ? "bg-zinc-50" : ""
                  }
                >
                  <td className="px-4 py-4 text-xs">
                    {dept.departmentId}
                  </td>

                  {editingId === dept.departmentId ? (
                    <>
                      <td className="px-4 py-2">
                        <input
                          name="departmentName"
                          value={editData.departmentName}
                          onChange={handleEditChange}
                          className="border border-zinc-300 p-1 w-full bg-white text-sm"
                        />
                      </td>
                      <td className="px-4 py-4 text-zinc-400 italic">
                        HR linked to ID: {dept.hrId || "N/A"}
                      </td>
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
                      <td className="px-4 py-4 font-bold">
                        {dept.departmentName}
                      </td>
                      <td className="px-4 py-4 text-zinc-600">
                        {dept.hrId || "Unassigned"}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-3 text-zinc-300">
                          <button
                            onClick={() => startEdit(dept)}
                            className="hover:text-zinc-900"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(dept.departmentId)}
                            className="hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-8 text-center text-zinc-400 italic"
                >
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-zinc-50 px-4 py-3 border-t flex items-center justify-between">
          <p className="text-xs text-zinc-500">
            Page {currentPage} of {totalPages || 1}
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
              disabled={currentPage === totalPages}
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
