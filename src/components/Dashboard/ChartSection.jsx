import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        <h4 className="text-sm font-semibold text-white">{monthName}</h4>
        <div className="flex gap-1">
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
              )
            }
            className="p-1.5 rounded-lg hover:bg-[#0B1220]"
          >
            <ChevronLeft size={16} className="text-slate-400" />
          </button>
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
              )
            }
            className="p-1.5 rounded-lg hover:bg-[#0B1220]"
          >
            <ChevronRight size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold text-slate-500 py-2"
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
              className={`aspect-square flex items-center justify-center rounded-lg text-sm font-semibold ${
                day === null
                  ? "text-transparent"
                  : isToday
                    ? "bg-indigo-600 text-white"
                    : "bg-[#0B1220] text-slate-200 hover:bg-[#111827]"
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
      } catch {}
    };
    fetchWeeklySummary();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 bg-[#111827] border border-slate-800 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-white">
              Productivity Analysis
            </h3>
            <p className="text-sm text-slate-400">Monthly Working Hours</p>
          </div>
          <select className="bg-[#0B1220] border border-slate-700 rounded-lg text-xs font-semibold text-slate-400 px-3 py-1 focus:outline-none">
            <option>Last 4 Weeks</option>
          </select>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#1E293B"
              />
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 600, fill: "#64748B" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 600, fill: "#64748B" }}
              />
              <Tooltip
                cursor={{ fill: "#020617" }}
                contentStyle={{
                  backgroundColor: "#0B1220",
                  borderRadius: "12px",
                  border: "1px solid #1E293B",
                  color: "#E5E7EB",
                  padding: "12px",
                }}
              />
              <Bar
                dataKey="actual"
                fill="#6366F1"
                radius={[6, 6, 6, 6]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full lg:w-96 bg-[#111827] border border-slate-800 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-white mb-6">Schedule</h3>
        <Calendar />
      </div>
    </div>
  );
}
