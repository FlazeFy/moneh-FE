import OrganismsFooter from "../../organisms/organisms_footer";
import GetDailyCalendar from "./usecases/get_daily_calendar";

const CalendarIndex = () => {
    return <>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <GetDailyCalendar ctx="all_flow"/>
            </div>
            <OrganismsFooter/>
        </div>
    </>
}

export default CalendarIndex;