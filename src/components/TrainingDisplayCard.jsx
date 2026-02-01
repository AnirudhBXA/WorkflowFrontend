function TrainingCard(props) {

    // {
    //     trainingName,
    //     trainerName,
    //     startDate,
    //     endDate,
    //   }

    const data = props.data

    return (
      <div className="w-[300px] h-[300px] bg-white rounded-xl shadow-md p-5 flex flex-col justify-between">
        
        {/* Top Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 leading-snug">
            {data.trainingName}
          </h2>
  
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Trainer</span>
              <span className="text-gray-800">{data.trainerName}</span>
            </div>
  
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Start</span>
              <span className="text-gray-800">{data.startDate}</span>
            </div>
  
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">End</span>
              <span className="text-gray-800">{data.endDate}</span>
            </div>
          </div>
        </div>
  
        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">
            Training Program
          </div>
  
          <button className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition">
            Let’s Go →
          </button>
        </div>
      </div>
    );
  }
  
  export default TrainingCard;
  