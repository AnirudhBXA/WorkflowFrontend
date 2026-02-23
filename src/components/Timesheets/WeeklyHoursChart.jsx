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
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
            barSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
