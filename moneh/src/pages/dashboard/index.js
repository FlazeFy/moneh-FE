// Components
import AtomsBreakLine from "../../atoms/atoms_breakline";
import AtomsText from "../../atoms/atoms_text";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsNavbar from "../../organisms/organisms_navbar";
import GetControlPanel from "./usecases/getControlPanel";

// Usecases
import GetDashboardSummary from "./usecases/getDashboardSummary";
import GetTotalAmmountPerDateByType from "./usecases/getTotalAmmountPerDateByType";

const Dashboard_Index = () => {    
    return (
        <>
            <OrganismsNavbar active="dashboard"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <GetControlPanel/>
                    <GetDashboardSummary ctx="get_dashboard_summary"/>
                    <div className="row mt-4">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <AtomsBreakLine length={2}/>
                            <AtomsText text_type="main_heading" body={"Total Ammount Per Date By Type"}/>
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