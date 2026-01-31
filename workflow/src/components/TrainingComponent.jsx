import { useState } from "react";
import TrainingCard from "./TrainingDisplayCard";
import FileUploadComponent from "./FileUploadComponent";

function TrainingsComponent(){

    const [role, setRole] = useState("manager")
    const [isUploadActive, setIsUploadActive] = useState(false)

    const items = [
        {"trainingName": "java", "trainerName": "anirudh", "startDate": "3-2-2026", "endDate":"6-2-2026"},
        {"trainingName": "python", "trainerName": "krishna", "startDate": "3-2-2026", "endDate":"6-2-2026"},
        {"trainingName": "english", "trainerName": "anirudh", "startDate": "3-2-2026", "endDate":"6-2-2026"},
        {"trainingName": "java 2.0", "trainerName": "prakash", "startDate": "3-2-2026", "endDate":"6-2-2026"},
    ]

    function openUploadComponent(){
        setIsUploadActive(true)
    }

    return (
        <>

            {(role === "manager") && (
                <>
                    <button onClick={openUploadComponent}>Assign Trainings</button>
                    { isUploadActive && (
                        <FileUploadComponent></FileUploadComponent>
                    )}
                </>
            )}


            {items.map((item, index) => 
            ( < TrainingCard data={item} key={index} /> )
            )}

        </>
    )

}

export default TrainingsComponent;