import { useState } from "react";
import WorkHoursChart from "./WorkHoursChat";

function DisplayPreviousTimeSheets(){

    // const [data, setData] = useState([])

    var data = [
        [
            { day: "13 Sa", value: 9 },
            { day: "14 Su", value: 9 },
            { day: "15 Ma", value: 6.6 },
            { day: "16 Tu", value: 8 },
            { day: "17 We", value: 5 },
            { day: "18 Th", value: 3 },
            { day: "19 Fr", value: 6 },
          ],

          [
            { day: "13 Sa", value: 9 },
            { day: "14 Su", value: 9 },
            { day: "15 Ma", value: 6.6 },
            { day: "16 Tu", value: 8 },
            { day: "17 We", value: 5 },
            { day: "18 Th", value: 3 },
            { day: "19 Fr", value: 6 },
          ],

          [
            { day: "13 Sa", value: 9 },
            { day: "14 Su", value: 9 },
            { day: "15 Ma", value: 6.6 },
            { day: "16 Tu", value: 8 },
            { day: "17 We", value: 5 },
            { day: "18 Th", value: 3 },
            { day: "19 Fr", value: 6 },
          ],

          [
            { day: "13 Sa", value: 9 },
            { day: "14 Su", value: 9 },
            { day: "15 Ma", value: 6.6 },
            { day: "16 Tu", value: 8 },
            { day: "17 We", value: 5 },
            { day: "18 Th", value: 3 },
            { day: "19 Fr", value: 6 },
          ],

          [
            { day: "13 Sa", value: 9 },
            { day: "14 Su", value: 9 },
            { day: "15 Ma", value: 6.6 },
            { day: "16 Tu", value: 8 },
            { day: "17 We", value: 5 },
            { day: "18 Th", value: 3 },
            { day: "19 Fr", value: 6 },
          ]
    ]


    // let url="";
    // fetch(url).then(
    //     (response) => response.json
    // ).then(
    //     (responseData) => setData(responseData)
    // )

    return (
        <>
            {data.map((item, index) => (
            <div key={index}>
                < WorkHoursChart data={item}/>
            </div>
            ))}
        </>
    )

}

export default DisplayPreviousTimeSheets;