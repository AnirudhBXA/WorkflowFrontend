import { useState } from "react";
import CertificationApprovalComponent from "./CertificationApprovalComponent";
import ValuesDisplayCard from "./ValuesDisplayCard";
import FileUploadComponent from "./FileUploadComponent";

function CertificationsComponent(){

    const [role, setRole] = useState("HR");
    const [isUploadActive, setIsUploadActive] = useState(false)

    const refund_amount_left = { "context" : "refund amount left",
                                 "color" : "bg-green-400",
                                 "value" : 20000,
                                 "units" : "rs" }

    const refund_amount_used = { "context" : "refund amount used",
                                 "color" : "bg-red-400",
                                 "value" : 30000,
                                 "units" : "rs" }

    function makeUploadActive(){
        setIsUploadActive(true)
    }

    return (
        <>

            <div>
                <ValuesDisplayCard data={refund_amount_left} ></ValuesDisplayCard>
            </div>
            <div>
                <ValuesDisplayCard data={refund_amount_used} ></ValuesDisplayCard>
            </div>

            { (role === "HR") && (
                <button onClick={makeUploadActive}>Update Certifications</button>
            )}

            {isUploadActive && (
                <FileUploadComponent></FileUploadComponent>
            )}

            { (role==="manager") && (
                <CertificationApprovalComponent></CertificationApprovalComponent>
            )}

        </>
    )

}

export default CertificationsComponent;