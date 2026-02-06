import { Users, CheckCircle, Clock, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const initialStats = [
  {
    key: "subordinates",
    title: "Subordinates",
    value: "-",
    icon: Users,
    bgColor: "bg-blue-50 dark:bg-blue-950",
    textColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-l-blue-500",
  },
  {
    key: "tasks",
    title: "Tasks",
    value: "-",
    icon: CheckCircle,
    bgColor: "bg-green-50 dark:bg-green-950",
    textColor: "text-green-600 dark:text-green-400",
    borderColor: "border-l-green-500",
  },
  {
    key: "hours",
    title: "Hours This Week",
    value: "-",
    icon: Clock,
    bgColor: "bg-purple-50 dark:bg-purple-950",
    textColor: "text-purple-600 dark:text-purple-400",
    borderColor: "border-l-purple-500",
    unit: "hrs",
  },
  {
    key: "interviews",
    title: "Interviews",
    value: "-",
    icon: Zap,
    bgColor: "bg-orange-50 dark:bg-orange-950",
    textColor: "text-orange-600 dark:text-orange-400",
    borderColor: "border-l-orange-500",
  },
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

        const updatedStats = stats.map((stat) => {
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
        });

        setStats(updatedStats);
        console.log("Dashboard summary data:", res.data);
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-transparent">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 bg-red-50 p-4 rounded-md">
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
            className="group bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-2xl ${stat.bgColor} transition-transform group-hover:scale-110`}
              >
                <Icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Live
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">{stat.title}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                  {stat.value}
                </h3>
                {stat.unit && (
                  <span className="text-sm font-bold text-indigo-400">
                    {stat.unit}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
