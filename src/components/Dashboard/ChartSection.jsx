"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { week: "Week 1", expected: 40, actual: 38 },
  { week: "Week 2", expected: 40, actual: 39 },
  { week: "Week 3", expected: 40, actual: 41 },
  { week: "Week 4", expected: 40, actual: 38.5 },
];

const dailyData = [
  { day: "Mon", hours: 8.2 },
  { day: "Tue", hours: 7.8 },
  { day: "Wed", hours: 8.0 },
  { day: "Thu", hours: 8.5 },
  { day: "Fri", hours: 6.0 },
];

export default function ChartsSection() {
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

  const [timesheetData, setTimesheetData] = useState({})
  const timesheetApi = "/api/timesheets/me";

  useEffect(() => {

    fetchTimesheetData();

  },[])

  async function fetchTimesheetData(){

    try{
      const timesheetRes = await axios.get(timesheetApi);
      setTimesheetData(timesheetRes.data)

    } catch(e){
      console.log("Error occurred while fetching"+e)
    }
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Comparison - GROUPED BAR CHART */}
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

      {/* Daily Working Hours - Keep Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border-t-4 border-t-green-500">
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Daily Working Hours
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Current week breakdown
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="day" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: "8px",
                  color: tooltipText,
                }}
              />
              <Bar
                dataKey="hours"
                fill="#34d399"
                radius={[8, 8, 0, 0]}
                name="Hours Worked"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
