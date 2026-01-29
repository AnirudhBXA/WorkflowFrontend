function ValuesDisplayCard(props) {

    const { context, color, value, units } = props;

    return (
      <div className="flex items-center gap-6 px-8 py-6 bg-white rounded-lg shadow-md min-w-[320px]">
        
        {/* Value Box */}
        <div
          className={`w-[70px] h-[80px] rounded-md flex flex-col items-center justify-center font-semibold ${color}`}
        >
          <div className="text-2xl">{value}</div>
          <div className="text-xs uppercase">{units}</div>
        </div>
  
        {/* Context */}
        <div className="text-base font-medium text-indigo-700">
          {context}
        </div>
      </div>
    );
}
  
export default ValuesDisplayCard;
  