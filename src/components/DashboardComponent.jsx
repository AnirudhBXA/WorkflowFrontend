import MetricProgressCard from "./MetricProgressCard";
import ValuesDisplayCard from "./ValuesDisplayCard";
import WorkHoursChart from "./WorkHoursChat";

function DashboardComponent(){

    const workHoursData = [
        { day: "13 Sa", value: 9 },
        { day: "14 Su", value: 9 },
        { day: "15 Ma", value: 6.6 },
        { day: "16 Tu", value: 8 },
        { day: "17 We", value: 5 },
        { day: "18 Th", value: 3 },
        { day: "19 Fr", value: 6 },
    ];

    const no_of_iterviews = 5;

    let available_leaves_count = 5;
    let leaves_used_count = 3;
    
    const available_leaves = { "context" : "available leaves",
                                 "color" : "bg-green-400",
                                 "value" : available_leaves_count,
                                 "units" : "days" }

    const leaves_used = { "context" : "leaves used",
                                 "color" : "bg-red-400",
                                 "value" : leaves_used_count,
                                 "units" : "days" }


    return (
        <>
            <div>
                <ValuesDisplayCard data={available_leaves}></ValuesDisplayCard>
            </div>
            <div>
                <ValuesDisplayCard data={leaves_used}></ValuesDisplayCard>
            </div>
            <WorkHoursChart data={workHoursData}></WorkHoursChart>
            <MetricProgressCard title="Interviews" value={no_of_iterviews}></MetricProgressCard>
        </>
    )
      

}

export default DashboardComponent;