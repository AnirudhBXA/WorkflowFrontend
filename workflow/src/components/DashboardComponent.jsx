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

    return (
        <>
            <WorkHoursChart data={workHoursData}></WorkHoursChart>
        </>
    )
      

}

export default DashboardComponent;