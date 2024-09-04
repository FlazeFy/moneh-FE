// Components
import AtomsBreakLine from "../../atoms/atoms_breakline";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsNavbar from "../../organisms/organisms_navbar";

// Usecases
import GetDashboardSummary from "./usecases/getDashboardSummary";
import GetTotalAmmountPerDateByType from "./usecases/get_total_ammount_per_date_by_type";

const Dashboard_Index = () => {    
    return (
        <>
            <OrganismsNavbar active="dashboard"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <GetDashboardSummary ctx="get_dashboard_summary"/>
                    <div className="row mt-4">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <AtomsBreakLine length={2}/>
                            <GetTotalAmmountPerDateByType ctx="Total Ammount Per Date By Type"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">

                        </div>
                    </div>
                </div>
                <OrganismsFooter/>
            </div>
        </>
    );
}

export default Dashboard_Index;