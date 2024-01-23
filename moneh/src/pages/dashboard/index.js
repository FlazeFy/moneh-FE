// Components
import GetFooter from "../../components/bars/footer";
import GetNavbar from "../../components/bars/navbar";

// Usecases
import GetDashboardSummary from "./usecases/getDashboardSummary";

const Dashboard_Index = () => {    
    return (
        <>
            <GetNavbar active="dashboard"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <GetDashboardSummary ctx="get_dashboard_summary"/>
                </div>
                <GetFooter/>
            </div>
        </>
    );
}

export default Dashboard_Index;