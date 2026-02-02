function MetricProgressCard({ title, value, max = 10 }) {
    const getColor = () => {
      if (value < 3) return "bg-red-500";
      if (value < 6) return "bg-yellow-400";
      if (value < 9) return "bg-blue-700";
      return "bg-green-600";
    };
  
    const percentage = Math.min((value / max) * 100, 100);
  
    return (
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl">
        
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          {title}
        </h3>
  
        {/* Progress Row */}
        <div className="flex items-center gap-6">
          
          {/* Progress Bar */}
          <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${getColor()}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
  
          {/* Value */}
          <span className="text-sm font-semibold text-gray-800 min-w-[24px]">
            {value}
          </span>
        </div>
      </div>
    );
  }
  
  export default MetricProgressCard;
  