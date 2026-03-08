import { useContext, useEffect, useState } from "react";
import TrainingCard from "../components/Trainings/TrainingCard";
import { BookOpen, Users, ChevronUp, ChevronDown } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "sonner";

export default function TrainingsComponent() {
  const { user } = useContext(AuthContext);
  const [myLoading, setMyLoading] = useState(true);
  const [teamLoading, setTeamLoading] = useState(true);
  const [myTrainings, setMyTrainings] = useState([]);
  const [teamTrainings, setTeamTrainings] = useState([]);
  const [completingTaskId, setCompletingTaskId] = useState(-1);

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    fetchMyTrainings();
    if (user.role === "MANAGER") {
      fetchTeamTrainings();
    } else {
      setTeamLoading(false);
    }
  }, []);

  async function fetchMyTrainings() {
    try {
      const response = await axiosInstance.get("/trainings/me");
      setMyTrainings(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch your trainings",
      );
    } finally {
      setMyLoading(false);
    }
  }

  async function fetchTeamTrainings() {
    try {
      const response = await axiosInstance.get("/trainings/teamTrainings");
      setTeamTrainings(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch team trainings",
      );
    } finally {
      setTeamLoading(false);
    }
  }

  async function handleComplete(taskId) {
    if (!taskId) return;

    setCompletingTaskId(taskId);
    try {
      await axiosInstance.post(`/trainings/tasks/${taskId}/complete`);
      await fetchMyTrainings();
      toast.success("Training marked as completed!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to mark training as complete. Please try again.",
      );
    } finally {
      setCompletingTaskId(-1);
    }
  }

  const statusBadge = (status) => {
    const map = {
      ASSIGNED: "bg-indigo-500/10 text-indigo-400",
      COMPLETED: "bg-emerald-500/10 text-emerald-400",
      GRACE_PERIOD: "bg-rose-500/10 text-rose-400",
    };

    return (
      <span
        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${
          map[status] || "bg-slate-500/10 text-slate-400"
        }`}
      >
        {status}
      </span>
    );
  };

  // Sorting logic
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTeamTrainings = [...teamTrainings].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let valA, valB;
    switch (sortConfig.key) {
      case "trainingId":
        valA = a.trainingId;
        valB = b.trainingId;
        break;
      case "employeeEmail":
        valA = a.employee.email.toLowerCase();
        valB = b.employee.email.toLowerCase();
        break;
      case "trainingName":
        valA = a.trainingName.toLowerCase();
        valB = b.trainingName.toLowerCase();
        break;
      case "trainerName":
        valA = a.trainerName.toLowerCase();
        valB = b.trainerName.toLowerCase();
        break;
      case "dueDate":
        valA = new Date(a.dueDate);
        valB = new Date(b.dueDate);
        break;
      case "status":
        valA = a.status;
        valB = b.status;
        break;
      default:
        return 0;
    }

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedTeamTrainings.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedTeamTrainings = sortedTeamTrainings.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={14} className="inline ml-1 text-indigo-400" />
      ) : (
        <ChevronDown size={14} className="inline ml-1 text-indigo-400" />
      );
    }
    return <ChevronDown size={14} className="inline ml-1 text-slate-600" />;
  };

  if (myLoading || (user.role === "MANAGER" && teamLoading)) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="h-10 w-10 border-t-4 border-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* My Trainings */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">My Trainings</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myTrainings.map((item) => (
            <TrainingCard
              key={item.trainingId}
              data={item}
              onComplete={handleComplete}
              completingTaskId={completingTaskId}
            />
          ))}
        </div>
      </section>

      {user.role === "MANAGER" && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Team Progress</h2>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
                  <tr>
                    <th
                      className="px-8 py-5 text-left cursor-pointer"
                      onClick={() => handleSort("trainingId")}
                    >
                      ID {renderSortIcon("trainingId")}
                    </th>
                    <th
                      className="px-8 py-5 text-left cursor-pointer"
                      onClick={() => handleSort("employeeEmail")}
                    >
                      Employee Email {renderSortIcon("employeeEmail")}
                    </th>
                    <th
                      className="px-8 py-5 text-left cursor-pointer"
                      onClick={() => handleSort("trainingName")}
                    >
                      Training {renderSortIcon("trainingName")}
                    </th>
                    <th
                      className="px-8 py-5 text-left cursor-pointer"
                      onClick={() => handleSort("trainerName")}
                    >
                      Trainer {renderSortIcon("trainerName")}
                    </th>
                    <th
                      className="px-8 py-5 text-left cursor-pointer"
                      onClick={() => handleSort("dueDate")}
                    >
                      Due {renderSortIcon("dueDate")}
                    </th>
                    <th className="px-8 py-5 text-left">Grace Period</th>
                    <th
                      className="px-8 py-5 text-left cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      Status {renderSortIcon("status")}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {paginatedTeamTrainings.map((item) => (
                    <tr
                      key={`${item.employee.employeeId}-${item.trainingId}`}
                      className="hover:bg-[#0B1220] transition"
                    >
                      <td className="px-8 py-6 text-slate-400">
                        {item.trainingId}
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-slate-200">
                            {item.employee.email}
                          </span>
                        </div>
                      </td>

                      <td className="px-8 py-6 font-semibold text-slate-300">
                        {item.trainingName}
                      </td>

                      <td className="px-8 py-6 text-slate-400">
                        {item.trainerName}
                      </td>

                      <td className="px-8 py-6 text-slate-400">
                        {item.dueDate}
                      </td>

                      <td className="px-8 py-6 text-rose-400">
                        {item.graceDueDate || "—"}
                      </td>

                      <td className="px-8 py-6">{statusBadge(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#0B1220]">
              <span className="text-xs text-slate-500">
                Page {page} of {totalPages}
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="py-2 px-4 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40"
                >
                  ‹
                </button>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
