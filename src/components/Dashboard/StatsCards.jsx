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

  // const endpoints = {
  //   interviews: "/interview/me",
  //   tasks: "/tasks/me",
  //   timesheet: "/timesheets/me",
  //   subordinates: "/users/subordinates-count",
  // };

  // useEffect(() => {
  //   const fetchAllStats = async () => {
  //     try {
  //       const [interviewRes, taskRes, timesheetRes, subordinatesRes] =
  //         await Promise.all([
  //           axiosInstance.get(endpoints.interviews),
  //           axiosInstance.get(endpoints.tasks),
  //           axiosInstance.get(endpoints.timesheet),
  //           axiosInstance.get(endpoints.subordinates),
  //         ]);

  //       const updatedStats = stats.map((stat) => {
  //         switch (stat.key) {
  //           case "interviews":
  //             return { ...stat, value: interviewRes.data.interviews.length };
  //           case "tasks":
  //             return { ...stat, value: taskRes.data.tasks.length };
  //           case "hours":
  //             return { ...stat, value: timesheetRes.data.totalHours };
  //           case "subordinates":
  //             return { ...stat, value: subordinatesRes.data.count };
  //           default:
  //             return stat;
  //         }
  //       });

  //       setStats(updatedStats);
  //     } catch (err) {
  //       console.error("Error fetching dashboard stats:", err);
  //       setError("Failed to load dashboard data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAllStats();
  // }, []);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className={`flex items-center gap-4 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer border-l-4 ${stat.borderColor} p-4`}
          >
            <div className={`p-3 rounded-md ${stat.bgColor} shrink-0`}>
              <Icon className={`w-5 h-5 ${stat.textColor}`} />
            </div>
            <div className="flex flex-col leading-tight">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
                {stat.unit && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
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
