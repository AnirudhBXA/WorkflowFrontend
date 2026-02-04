import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart - Expected vs Actual Hours */}
      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Weekly Hours Comparison
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Expected vs Actual working hours
          </p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgb(226 232 240 / 0.5)"
              />
              <XAxis dataKey="week" stroke="rgb(100 116 139)" />
              <YAxis stroke="rgb(100 116 139)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: "#64748b" }} />
              <Line
                type="monotone"
                dataKey="expected"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
                name="Expected Hours"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", r: 4 }}
                activeDot={{ r: 6 }}
                name="Actual Hours"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Bar Chart - Daily Hours */}
      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Daily Working Hours
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Current week breakdown
          </p>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgb(226 232 240 / 0.5)"
              />
              <XAxis dataKey="day" stroke="rgb(100 116 139)" />
              <YAxis stroke="rgb(100 116 139)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="hours"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
                name="Hours Worked"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
