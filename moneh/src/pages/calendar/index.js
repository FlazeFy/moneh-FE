"use client"

import OrganismsFooter from "../../organisms/organisms_footer";
// Components
import OrganismsNavbar from "../../organisms/organisms_navbar";
import GetDailyCalendar from "./usecases/get_daily_calendar";

// Usecases

const Calendar_Index = () => {
    return <>
        <OrganismsNavbar active="calendar"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <GetDailyCalendar ctx="all_flow"/>
            </div>
            <OrganismsFooter/>
        </div>
    </>
}

export default Calendar_Index;