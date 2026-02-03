function ValuesDisplayCard({ data }) {
  return (
    <div className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <p className="text-sm text-gray-500 mb-2 tracking-wide uppercase">
        {data.context}
      </p>

      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-semibold text-gray-800">
            {data.value}
          </span>
          <span className="text-sm text-gray-400 ml-2">{data.units}</span>
        </div>

        <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg font-bold">
          {data.context.includes("Available") ? "+" : "–"}
        </div>
      </div>
    </div>
  );
}

export default ValuesDisplayCard;