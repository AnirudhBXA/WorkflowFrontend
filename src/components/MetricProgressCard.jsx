function MetricProgressCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <p className="text-3xl font-semibold text-indigo-600">{value}</p>
      <div className="mt-3 h-2 bg-indigo-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full"
          style={{ width: `${Math.min(value * 10, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}

export default MetricProgressCard;
