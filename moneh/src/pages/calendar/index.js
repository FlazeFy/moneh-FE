"use client"

import GetFooter from "../../components/bars/footer";
// Components
import GetNavbar from "../../components/bars/navbar";
import GetDailyCalendar from "./usecases/get_daily_calendar";

// Usecases

const Calendar_Index = () => {
    return <>
        <GetNavbar active="calendar"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <GetDailyCalendar ctx="all_flow"/>
            </div>
            <GetFooter/>
        </div>
    </>
}

export default Calendar_Index;