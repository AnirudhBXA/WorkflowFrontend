function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function LeaveBriefCard({
  leave,
  onClose,
  onApprove,
  onReject,
}) {
  const statusColors = {
    APPROVED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
        >
          X
        </button>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Leave Request Details
          </h2>
          <span
            className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${statusColors[leave.status]}`}
          >
            {leave.status}
          </span>
        </div>

        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <span className="font-medium">Type:</span> {leave.leaveType}
          </div>
          <div>
            <span className="font-medium">From:</span>{" "}
            {formatDateToDDMMYYYY(leave.startDate)}
          </div>
          <div>
            <span className="font-medium">To:</span>{" "}
            {formatDateToDDMMYYYY(leave.endDate)}
          </div>
          <div>
            <span className="font-medium">Reason:</span> {leave.reason}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Close
          </button>

          {leave.status === "PENDING" && (
            <>
              <button
                onClick={onReject}
                className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Reject
              </button>
              <button
                onClick={onApprove}
                className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
