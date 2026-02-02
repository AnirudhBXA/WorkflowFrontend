function WorkHoursChart({ data, maxValue = 10 }) {

    const getBarColor = (value) => {
      if (value < 4) return "bg-red-500";
      if (value <= 8) return "bg-blue-700";
      return "bg-gray-300";
    };
  
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 w-[30%]">
        
        {/* Title */}
        <h2 className="text-indigo-700 font-medium mb-6">
          Work hours
        </h2>
  
        {/* Chart Container (FIXED HEIGHT) */}
        <div className="relative h-64 flex items-end justify-between px-4">
          
          {/* Guide lines */}
          <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-300" />
          <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-gray-200" />
  
          {data.map((item, index) => {
            const heightPercent = (item.value / maxValue) * 100;
  
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-end h-full gap-2"
              >
                {/* Value */}
                <span className="text-sm text-indigo-700 font-medium">
                  {item.value}
                </span>
  
                {/* Bar wrapper — FULL HEIGHT */}
                <div className="h-full flex items-end">
                  <div
                    className={`w-6 rounded-md ${getBarColor(item.value)}`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
  
                {/* Day label */}
                <span className="text-xs text-gray-500">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  export default WorkHoursChart;
  