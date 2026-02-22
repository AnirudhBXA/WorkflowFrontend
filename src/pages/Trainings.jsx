import { useContext, useEffect, useState } from "react";
import TrainingCard from "../components/Trainings/TrainingCard";
import { BookOpen, Users, ArrowUpRight } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

export default function TrainingsComponent() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [myTrainings, setMyTrainings] = useState([]);
  const [teamTrainings, setTeamTrainings] = useState([]);

  useEffect(() => {
    fetchMyTrainings();
    if (user.role === "MANAGER") {
      fetchTeamTrainings();
    }
  }, []);

  async function fetchMyTrainings() {
    try {
      const response = await axiosInstance.get("/trainings/me");
      setMyTrainings(response.data);
    } catch {
      alert("failed to fetch the data");
    } finally {
      setLoading(false);
    }
  }

  async function fetchTeamTrainings() {
    try {
      const response = await axiosInstance.get("/trainings/teamTrainings");
      setTeamTrainings(response.data);
    } catch {
      alert("failed to fetch the data");
    } finally {
      setLoading(false);
    }
  }

  const statusBadge = (status) => {
    const map = {
      PLANNED: "bg-indigo-500/10 text-indigo-400",
      ONGOING: "bg-amber-500/10 text-amber-400",
      COMPLETED: "bg-emerald-500/10 text-emerald-400",
      GRACE_PERIOD: "bg-rose-500/10 text-rose-400",
    };
    return (
      <span
        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${map[status]}`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="h-10 w-10 border-t-4 border-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Learning & Development
          </h1>
          <p className="text-slate-400 mt-1">
            Upskill yourself and track your team’s growth
          </p>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">My Trainings</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myTrainings.map((item, index) => (
            <TrainingCard key={index} data={item} />
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
                    <th className="px-8 py-5 text-left">Employee</th>
                    <th className="px-8 py-5 text-left">Training</th>
                    <th className="px-8 py-5 text-left">Mentor</th>
                    <th className="px-8 py-5 text-left">Due Date</th>
                    <th className="px-8 py-5 text-left">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {teamTrainings.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#0B1220] transition">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-600/10 flex items-center justify-center text-xs font-bold text-indigo-400">
                            {item.employee.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-slate-200">
                            {item.employee.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-8 py-6 font-semibold text-slate-300">
                        {item.trainingName}
                      </td>

                      <td className="px-8 py-6 text-slate-400">
                        {item.trainerName}
                      </td>

                      <td className="px-8 py-6 text-xs text-slate-400">
                        {item.dueDate || "No due date"}
                      </td>

                      <td className="px-8 py-6">{statusBadge(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
