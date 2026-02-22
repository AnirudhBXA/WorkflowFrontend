import { Users, CheckCircle, Clock, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const initialStats = [
  { key: "subordinates", title: "Subordinates", value: "-", icon: Users },
  { key: "tasks", title: "Tasks", value: "-", icon: CheckCircle },
  {
    key: "hours",
    title: "Hours This Month",
    value: "-",
    icon: Clock,
    unit: "hrs",
  },
  { key: "interviews", title: "Interviews", value: "-", icon: Zap },
];

export default function StatsCards() {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const res = await axiosInstance.get("/data/dashboard/summary");
        const { interviews, tasks, totalHours, subordinates } = res.data;

        setStats((prev) =>
          prev.map((stat) => {
            switch (stat.key) {
              case "interviews":
                return { ...stat, value: interviews || 0 };
              case "tasks":
                return { ...stat, value: tasks || 0 };
              case "hours":
                return { ...stat, value: totalHours || 0 };
              case "subordinates":
                return { ...stat, value: subordinates || 0 };
              default:
                return stat;
            }
          }),
        );
      } catch {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-950 text-red-400 px-4 py-3 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-indigo-600/50 transition"
          >
            <div className="flex items-center justify-between mb-5">
              <Icon className="w-6 h-6 text-indigo-400" />
              <span className="text-xs font-bold text-emerald-400">LIVE</span>
            </div>

            <p className="text-sm text-slate-400 font-medium">{stat.title}</p>

            <div className="flex items-baseline gap-2 mt-2">
              <h3 className="text-3xl font-extrabold text-white">
                {stat.value}
              </h3>
              {stat.unit && (
                <span className="text-sm font-semibold text-slate-400">
                  {stat.unit}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
