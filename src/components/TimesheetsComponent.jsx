

import { Stack, Accordion, Table, Badge  } from "@chakra-ui/react"
import DisplayPreviousTimeSheets from './DisplayPreviousTimeSheetsComponent';
import FileUploadComponent from './FileUploadComponent';
import { useState } from 'react';
import TimesheetApprovalComponent from './TimesheetApprovalComponent';

function TimesheetsComponent(){

    const [role, setRole] = useState("manager")


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
                    
                  <DisplayPreviousTimeSheets></DisplayPreviousTimeSheets>
                  </Stack>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
      
            {/* Manager Section */}
            {(role === "manager" || role==="HR") && (
              <Accordion.Item value="management">
                <Accordion.ItemTrigger>
                  Management / Workflows
                </Accordion.ItemTrigger>
      
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <Stack spacing={4}>
                    {( role == "manager") && (
                <>
                    <TimesheetApprovalComponent></TimesheetApprovalComponent>
                </>
            )}
                    </Stack>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            )}
      
          </Accordion.Root>
        </Stack>
    )

}

export default TimesheetsComponent;