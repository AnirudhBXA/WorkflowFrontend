import { Edit3, Trash2 } from "lucide-react";

export default function UserRegistryView({
  users,
  formData,
  loading,
  error,
  onChange,
  onSubmit,
}) {
  return (
    <div className="space-y-8">
      {/* Create User */}
      <div className="bg-white border border-zinc-200 shadow-sm">
        <div className="bg-zinc-50 px-6 py-3 border-b">
          <h2 className="text-xs font-black uppercase tracking-widest">
            Create New Account
          </h2>
        </div>

        <form onSubmit={onSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["name", "email", "username"].map((field) => (
              <div key={field}>
                <label className="text-xs font-bold uppercase">{field} *</label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={onChange}
                  className="w-full px-3 py-2 border text-sm"
                />
              </div>
            ))}

            <div>
              <label className="text-xs font-bold uppercase">role *</label>
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

          {error && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 p-3 border">
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              disabled={loading}
              className="bg-zinc-900 text-white px-8 py-2 text-xs uppercase"
            >
              {loading ? "Creating..." : "Add User"}
            </button>
          </div>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white border shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 font-bold">{user.name}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{user.status}</td>
                <td className="px-6 py-4 text-right">
                  <button className="mr-2">
                    <Edit3 size={16} />
                  </button>
                  <button>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
