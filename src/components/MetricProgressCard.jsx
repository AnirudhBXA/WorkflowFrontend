// function MetricProgressCard({ title, value }) {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
//       <p className="text-sm text-gray-500 mb-2">{title}</p>
//       <p className="text-3xl font-semibold text-indigo-600">{value}</p>
//       <div className="mt-3 h-2 bg-indigo-100 rounded-full overflow-hidden">
//         <div
//           className="h-full bg-indigo-600 rounded-full"
//           style={{ width: `${Math.min(value * 10, 100)}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// }

// export default MetricProgressCard;

export default function MetricProgressCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{title}</p>
      <p className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
        {value}
      </p>
      <div className="mt-3 h-2 bg-indigo-100 dark:bg-indigo-900 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all"
          style={{ width: `${Math.min(value * 10, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}
