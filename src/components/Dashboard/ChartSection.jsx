import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { CheckCircle2, Circle, ChevronLeft, ChevronRight } from "lucide-react";
function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
          {monthName}
        </h4>
        <div className="flex gap-1">
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
              )
            }
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ChevronLeft
              size={16}
              className="text-gray-600 dark:text-gray-400"
            />
          </button>
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
              )
            }
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ChevronRight
              size={16}
              className="text-gray-600 dark:text-gray-400"
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-center text-xs font-bold text-gray-600 dark:text-gray-400 py-2"
          >
            {d}
          </div>
        ))}

        {days.map((day, idx) => {
          const isToday =
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

          return (
            <div
              key={idx}
              className={`aspect-square flex items-center justify-center rounded-md text-sm font-medium ${
                day === null
                  ? "text-transparent"
                  : isToday
                    ? "bg-blue-500 text-white"
                    : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ChartsSection() {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchWeeklySummary = async () => {
      try {
        const res = await axiosInstance.get("/data/timesheets/summary");
        setWeeklyData(res.data.weekly || []);
      } catch (err) {
        console.error("Failed to fetch weekly timesheet summary:", err);
      }
    };

    fetchWeeklySummary();
  }, []);

  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const gridColor = isDark
    ? "rgba(107, 114, 128, 0.3)"
    : "rgba(226, 232, 240, 0.5)";
  const axisColor = isDark ? "#9ca3af" : "#64748b";
  const tooltipBg = isDark ? "#1f2937" : "#f8fafc";
  const tooltipBorder = isDark ? "#374151" : "#e2e8f0";
  const tooltipText = isDark ? "#f3f4f6" : "#1f2937";

  return (
    <div className="flex flex-col lg:flex-row gap-6 py-6">
      {/* Chart Container */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border-t-4 border-t-blue-500 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          Monthly Working Hours
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Actual working hours
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="week" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: "8px",
                color: tooltipText,
              }}
            />
            <Legend wrapperStyle={{ color: axisColor }} />
            <Bar
              dataKey="actual"
              fill="#a78bfa"
              radius={[6, 6, 0, 0]}
              name="Actual Hours"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Calendar Container (Styled Separately) */}
      <div className="w-full lg:w-80">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border-t-4 border-t-cyan-500 p-4 h-full">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
