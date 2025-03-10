import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsSidebar from "../../organisms/organisms_sidebar";
import GetDailyCalendar from "./usecases/get_daily_calendar";
import FilterFlowType from "./usecases/filter_flow_type";
import AtomsBreakLine from "../../atoms/atoms_breakline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AtomsButton from "../../atoms/atoms_button";

const CalendarIndex = () => {
    return ( 
        <div className="row">
            <div className="col-lg-3 col-md-1 col-sm-12 col-12 position-relative">
                <OrganismsSidebar active="dashboard"/>
            </div>
            <div className="col-lg-9 col-md-11 col-sm-12 col-12">
                <div className='content-grid'>
                    <div style={{minHeight:"100vh"}}>
                        <AtomsBreakLine length={1}/>
                        <AtomsButton title={<><FontAwesomeIcon icon={faArrowLeft}/> Back to Dashboard</>} button_type="btn_danger" onclick={(e) => window.location.href = '/dashboard'}/>
                        <AtomsBreakLine length={3}/>
                        <div className="d-flex justify-content-start">
                            <FilterFlowType/>
                        </div>
                        <AtomsBreakLine length={1}/>
                        <GetDailyCalendar ctx="calendar"/>
                        <OrganismsFooter/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarIndex;