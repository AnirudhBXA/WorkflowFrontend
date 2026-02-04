// function TrainingCard({ data }) {
//   const statusColor = {
//     PLANNED: "blue.500",
//     ONGOING: "yellow.500",
//     COMPLETED: "green.500",
//   };

//   return (
//     <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition hover:-translate-y-1">
//       <div className="flex justify-between items-start mb-3">
//         <h3 className="text-lg font-semibold text-gray-800">
//           {data.trainingName}
//         </h3>
//         <span
//           className="text-xs font-medium px-2 py-1 rounded-full"
//           style={{ backgroundColor: "#EEF2FF", color: "#4F46E5" }}
//         >
//           {data.status}
//         </span>
//       </div>

//       <p className="text-sm text-gray-600 mb-1">
//         Trainer: <span className="font-medium">{data.trainerName}</span>
//       </p>
//       <p className="text-sm text-gray-500">
//         {data.startDate} → {data.endDate}
//       </p>
//     </div>
//   );
// }

// export default TrainingCard;
export default function TrainingCard({ data }) {
  const statusStyles = {
    PLANNED: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    ONGOING:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    COMPLETED:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {data.trainingName}
        </h3>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[data.status]}`}
        >
          {data.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        Trainer:{" "}
        <span className="font-medium text-gray-800 dark:text-gray-200">
          {data.trainerName}
        </span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {data.startDate} → {data.endDate}
      </p>
    </div>
  );
}
