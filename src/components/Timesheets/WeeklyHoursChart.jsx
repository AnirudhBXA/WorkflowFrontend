import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeeklyHoursChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <XAxis dataKey="day" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip />
        <Bar dataKey="hours" fill="#4f46e5" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default WeeklyHoursChart;
