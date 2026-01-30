
import { Tabs, SimpleGrid, For } from '@chakra-ui/react'
import DisplayPreviousTimeSheets from './DisplayPreviousTimeSheetsComponent';
import FillTimesheetComponent from './FillTimesheetComponent';

function TimesheetsComponent(){


    return (
        <>

            <SimpleGrid columns={2} gap="14" width="full">
                <Tabs.Root key="outline" defaultValue="members" variant="outline">

                    {/* Tabs display */}
                    <Tabs.List>
                    <Tabs.Trigger value="previous">
                        Previous Time sheets
                    </Tabs.Trigger>
                    <Tabs.Trigger value="fill">
                        Fill Time sheet
                    </Tabs.Trigger>
                    </Tabs.List>


                    {/* Content for the tabs */}
                    <Tabs.Content value="previous">
                        <DisplayPreviousTimeSheets></DisplayPreviousTimeSheets>
                    </Tabs.Content>

                    <Tabs.Content value="fill">
                        <FillTimesheetComponent></FillTimesheetComponent>
                    </Tabs.Content>
                    
                </Tabs.Root>
            </SimpleGrid>
        </>
    )

}

export default TimesheetsComponent;