import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WorkHoursChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="day" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#4f46e5"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WorkHoursChart;
