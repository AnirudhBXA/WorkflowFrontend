import { useState } from "react";
import CertificationApprovalComponent from "./CertificationApprovalComponent";
import ValuesDisplayCard from "./ValuesDisplayCard";
import FileUploadComponent from "./FileUploadComponent";
import { Stack, Accordion, Table, Badge  } from "@chakra-ui/react"

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
        <Stack width="full" maxW="100%" spacing={4}>
      
          <Accordion.Root collapsible defaultValue={["personal"]}>
      
            {/* Personal Info */}
            <Accordion.Item value="personal">
              <Accordion.ItemTrigger>
                My Personal Info
              </Accordion.ItemTrigger>
      
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <Stack spacing={4}>
                    
                  <div>
                    <ValuesDisplayCard data={refund_amount_left} ></ValuesDisplayCard>
                </div>
                <div>
                    <ValuesDisplayCard data={refund_amount_used} ></ValuesDisplayCard>
                </div>
                  </Stack>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
      
            {/* Manager Section */}
            {role === "manager" || role==="HR" && (
              <Accordion.Item value="management">
                <Accordion.ItemTrigger>
                  Management / Workflows
                </Accordion.ItemTrigger>
      
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <Stack spacing={4}>
                    { (role === "HR") && (
                        <button  className=" bg-blue-800 text-white px-10 py-4 rounded-sm text-sm font-medium hover:bg-blue-1000 transition shadow-sm " onClick={makeUploadActive}>Update Certifications</button>
                    )}

                    {isUploadActive && (
                        <FileUploadComponent></FileUploadComponent>
                    )}

                    { (role==="manager") && (
                        <CertificationApprovalComponent></CertificationApprovalComponent>
                    )}
                    </Stack>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            )}
      
          </Accordion.Root>
        </Stack>
      );

}

export default CertificationsComponent;