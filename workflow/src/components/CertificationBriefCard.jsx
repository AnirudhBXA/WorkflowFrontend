
function CertificationBriefCard(){

    const data = {
        "leaveType": "sick leave",
        "employeeName" : "anirudh",
        "days" : "2" ,
        "startDate" : "29-1-2026",
        "endDate" : "30-1-2026" ,
    }
  
    const attachment = {
        "name" : "docs letter",
        "size" : "2.3mb"
    }
  
    function viewAttachment(){
  
    }
  
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        
        {/* Card */}
        <div className="bg-white w-[420px] rounded-xl shadow-xl p-6 relative">
  
          {/* Leave details */}
        <div className="max-w-xl bg-white rounded-xl shadow-md p-6 space-y-4">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Leave Details
            </h2>
            <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
              {data.leaveType}
            </span>
          </div>
    
          {/* Employee Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Employee Name</p>
              <p className="font-medium text-gray-800">
                {data.employeeName}
              </p>
            </div>
    
            <div>
              <p className="text-gray-500">No. of Days</p>
              <p className="font-medium text-gray-800">
                {data.days} Days
              </p>
            </div>
    
            <div>
              <p className="text-gray-500">Start Date</p>
              <p className="font-medium text-gray-800">
                {data.startDate}
              </p>
            </div>
    
            <div>
              <p className="text-gray-500">End Date</p>
              <p className="font-medium text-gray-800">
                {data.endDate}
              </p>
            </div>
          </div>
    
          {/* Attachment */}
          {attachment && (
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Attachment
              </p>
    
              <div className="flex items-center gap-3 border rounded-lg p-3 bg-gray-50">
                {/* File Icon */}
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-100 text-blue-600">
                  📄
                </div>
    
                {/* File Info */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {attachment.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {attachment.size}
                  </p>
                </div>
    
                {/* Action */}
                <button
                  type="button"
                  className="text-blue-600 text-sm hover:underline"
                  onClick={viewAttachment}
                >
                  View
                </button>
              </div>
            </div>
          )}
        </div>
          
          <div>
              <button>Approve</button>
              <button>Reject</button>
          </div>
        </div>
      </div>
    );
}

export default CertificationBriefCard;