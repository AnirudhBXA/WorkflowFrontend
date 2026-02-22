import { useEffect, useState, useMemo } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
  UserCheck,
  Search,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const PAGE_SIZE = 5;

function PriorityBadge({ priority }) {
  const map = {
    high: "bg-red-500/10 text-red-400",
    medium: "bg-amber-500/10 text-amber-400",
    low: "bg-emerald-500/10 text-emerald-400",
  };
  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-bold ${map[priority] || "bg-slate-500/10 text-slate-400"}`}
    >
      {priority || "Unknown"}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: "bg-yellow-500/10 text-amber-400",
    approved: "bg-emerald-500/10 text-emerald-400",
    rejected: "bg-red-500/10 text-red-400",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-md text-xs font-semibold ${map[status] || "bg-slate-500/10 text-slate-400"}`}
    >
      {status}
    </span>
  );
}

function SkeletonList() {
  return (
    <div className="p-6 space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="animate-pulse flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-slate-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-700 rounded w-3/4" />
            <div className="h-3 bg-slate-700 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TasksAndCalendar() {
  const { user } = useContext(AuthContext);
  const [taskData, setTaskData] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState({}); // { [id]: true }

  useEffect(() => {
    setLoading(true);
    setError("");
    axiosInstance
      .get("/data/tasks/me")
      .then((res) => {
        // Expect tasks with fields: id, title, priority, dueDate, requester, approver, status, createdAt, description
        setTaskData(res.data || []);
      })
      .catch((err) => {
        setError("Failed to load tasks");
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleTask = (id) => {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const totalPages = Math.max(1, Math.ceil(taskData.length / PAGE_SIZE));

  // Filtering + search
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return taskData.filter((t) => {
      if (priorityFilter !== "all" && t.priority !== priorityFilter)
        return false;
      if (!q) return true;
      return (
        (t.title || "").toLowerCase().includes(q) ||
        (t.requester?.name || "").toLowerCase().includes(q) ||
        (t.approver?.name || "").toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q)
      );
    });
  }, [taskData, query, priorityFilter]);

  const paginatedTasks = showAll
    ? filtered
    : filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalFilteredPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE),
  );

  // Approve / Reject actions (optimistic)
  const performAction = async (id, action) => {
    setActionLoading((s) => ({ ...s, [id]: true }));
    const prev = taskData;
    setTaskData((t) =>
      t.map((x) =>
        x.id === id
          ? { ...x, status: action === "approve" ? "approved" : "rejected" }
          : x,
      ),
    );
    try {
      await axiosInstance.post(`/data/tasks/${id}/${action}`); // backend endpoints: approve / reject
    } catch (err) {
      // rollback
      setTaskData(prev);
      console.error(err);
      // optional: show toast
    } finally {
      setActionLoading((s) => ({ ...s, [id]: false }));
    }
  };

  if (loading) {
    return (
      <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
        <SkeletonList />
      </div>
    );
  }

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">Active Tasks</h3>
          <p className="text-sm text-slate-400">
            {filtered.length} items{" "}
            {priorityFilter !== "all" && `· ${priorityFilter}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#0B1220] border border-slate-700 rounded-lg px-2 py-1">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search tasks, requester, approver..."
              className="bg-transparent outline-none text-sm text-slate-200 ml-2 placeholder:text-slate-500 w-48 sm:w-64"
              aria-label="Search tasks"
            />
          </div>

          <select
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value);
              setPage(1);
            }}
            className="bg-[#0B1220] border border-slate-700 text-sm text-slate-200 rounded-lg px-3 py-2"
            aria-label="Filter by priority"
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button
            onClick={() => {
              setShowAll((p) => !p);
              setPage(1);
            }}
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
          >
            {showAll ? "Show less" : "View all"}
          </button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block">
        <table className="w-full">
          <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left">Task</th>
              <th className="px-6 py-4 text-left">Priority</th>
              <th className="px-6 py-4 text-left">Due</th>
              <th className="px-6 py-4 text-left">Created</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {paginatedTasks.map((task) => (
              <tr key={task.id} className="hover:bg-[#0B1220] transition">
                <td className="px-6 py-5 max-w-[320px]">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleTask(task.id)}
                      aria-pressed={completedTasks.includes(task.id)}
                      className="mt-1"
                    >
                      {completedTasks.includes(task.id) ? (
                        <CheckCircle2 className="text-emerald-400" />
                      ) : (
                        <Circle className="text-slate-500" />
                      )}
                    </button>

                    <div>
                      <div
                        className={`text-sm font-semibold ${completedTasks.includes(task.id) ? "line-through text-slate-500" : "text-slate-200"}`}
                      >
                        {task.title}
                      </div>
                      {task.description && (
                        <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {task.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <PriorityBadge priority={task.priority} />
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock size={14} />
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : "No due date"}
                  </div>
                </td>

                <td className="px-6 py-5 text-sm text-slate-400">
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                <td className="px-6 py-5">
                  <StatusBadge status={task.status || "pending"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden">
        <div className="p-4 space-y-3">
          {paginatedTasks.map((task) => (
            <article
              key={task.id}
              className="bg-[#0B1220] border border-slate-800 rounded-xl p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button onClick={() => toggleTask(task.id)} className="mt-1">
                    {completedTasks.includes(task.id) ? (
                      <CheckCircle2 className="text-emerald-400" />
                    ) : (
                      <Circle className="text-slate-500" />
                    )}
                  </button>

                  <div>
                    <div
                      className={`text-sm font-semibold ${completedTasks.includes(task.id) ? "line-through text-slate-500" : "text-slate-200"}`}
                    >
                      {task.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {task.requester?.name || "—"} ·{" "}
                      <span className="uppercase">{task.priority}</span>
                    </div>
                    {task.description && (
                      <div className="text-xs text-slate-400 mt-2 line-clamp-3">
                        {task.description}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "No due date"}
                  </div>
                  <div className="mt-2">
                    <StatusBadge status={task.status || "pending"} />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-3 flex items-center gap-2">
                {task.status === "pending" &&
                user?.email === task.approver?.email ? (
                  <>
                    <button
                      onClick={() => performAction(task.id, "approve")}
                      disabled={actionLoading[task.id]}
                      className="flex-1 px-3 py-2 rounded-md bg-emerald-600 text-white text-sm font-semibold disabled:opacity-60"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => performAction(task.id, "reject")}
                      disabled={actionLoading[task.id]}
                      className="flex-1 px-3 py-2 rounded-md bg-red-600 text-white text-sm font-semibold disabled:opacity-60"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <div className="text-xs text-slate-400">
                    Approver: {task.approver?.name || "—"}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {!showAll && filtered.length > PAGE_SIZE && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#0B1220]">
          <span className="text-xs text-slate-500">
            Page {page} of {totalFilteredPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>

            <button
              disabled={page === totalFilteredPages}
              onClick={() =>
                setPage((p) => Math.min(totalFilteredPages, p + 1))
              }
              className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {error && <div className="p-4 text-sm text-red-400">{error}</div>}
      {!loading && filtered.length === 0 && (
        <div className="p-6 text-center text-sm text-slate-400">
          No tasks found. Try changing filters or check back later.
        </div>
      )}
    </div>
  );
}
