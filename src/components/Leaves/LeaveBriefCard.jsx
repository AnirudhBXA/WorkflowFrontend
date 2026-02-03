function LeaveBriefCard({ leave, onClose, onApprove, onReject }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-105 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Leave Details
        </h2>

        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">Type:</span> {leave.type}
          </p>
          <p>
            <span className="font-medium">From:</span> {leave.from}
          </p>
          <p>
            <span className="font-medium">To:</span> {leave.to}
          </p>
          <p>
            <span className="font-medium">Days:</span> {leave.days}
          </p>
          <p>
            <span className="font-medium">Reason:</span> {leave.reason}
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border text-gray-600 hover:bg-gray-100"
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

export default LeaveBriefCard;
