import WorkHoursChart from "./WorkHoursChat";

function TimesheetBriefCard(){

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

    const workdata = [{ day: "13 Sa", value: 9 },
    { day: "14 Su", value: 9 },
    { day: "15 Ma", value: 6.6 },
    { day: "16 Tu", value: 8 },
    { day: "17 We", value: 5 },
    { day: "18 Th", value: 3 },
    { day: "19 Fr", value: 6 },]
  
    function viewAttachment(){
  
    }
  
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        
        {/* Card */}
        <div className="bg-white w-[420px] rounded-xl shadow-xl p-6 relative">
  
            <WorkHoursChart data = {workdata}></WorkHoursChart>
          
          <div>
              <button>Approve</button>
              <button>Reject</button>
          </div>
        </div>
      </div>
    );
}

export default TimesheetBriefCard;