function TrainingCard({ data }) {
  const statusColor = {
    PLANNED: "blue.500",
    ONGOING: "yellow.500",
    COMPLETED: "green.500",
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {data.trainingName}
        </h3>
        <span
          className="text-xs font-medium px-2 py-1 rounded-full"
          style={{ backgroundColor: "#EEF2FF", color: "#4F46E5" }}
        >
          {data.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-1">
        Trainer: <span className="font-medium">{data.trainerName}</span>
      </p>
      <p className="text-sm text-gray-500">
        {data.startDate} → {data.endDate}
      </p>
    </div>
  );
}

export default TrainingCard;