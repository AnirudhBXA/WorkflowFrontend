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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border-t-4 border-t-blue-500">
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            Weekly Hours Comparison
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Expected vs Actual working hours
          </p>
        </div>

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
              dataKey="expected"
              fill="#60a5fa"
              radius={[6, 6, 0, 0]}
              name="Expected Hours"
            />
            <Bar
              dataKey="actual"
              fill="#a78bfa"
              radius={[6, 6, 0, 0]}
              name="Actual Hours"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
