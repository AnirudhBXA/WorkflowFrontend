// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// function WeeklyHoursChart({ data }) {
//   return (
//     <ResponsiveContainer width="100%" height={260}>
//       <BarChart data={data}>
//         <XAxis dataKey="day" stroke="#6b7280" />
//         <YAxis stroke="#6b7280" />
//         <Tooltip />
//         <Bar dataKey="hours" fill="#4f46e5" radius={[6, 6, 0, 0]} />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

// export default WeeklyHoursChart;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function WeeklyHoursChart({ data }) {
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "#374151" : "#e5e7eb"}
        />
        <XAxis dataKey="day" stroke={isDark ? "#9ca3af" : "#6b7280"} />
        <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="hours" fill="#6366f1" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
