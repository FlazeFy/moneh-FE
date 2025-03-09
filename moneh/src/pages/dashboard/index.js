import AtomsBreakLine from "../../atoms/atoms_breakline";
import AtomsText from "../../atoms/atoms_text";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsSidebar from "../../organisms/organisms_sidebar";
import GetControlPanel from "./usecases/getControlPanel";
import GetDashboardSummary from "./usecases/getDashboardSummary";
import GetTotalAmmountPerDateByType from "./usecases/getTotalAmmountPerDateByType";

const DashboardIndex = () => {    
    return (
        <div className="row">
            <div className="col-lg-3 col-md-1 col-sm-12 col-12 position-relative">
                <OrganismsSidebar active="dashboard"/>
            </div>
            <div className="col-lg-9 col-md-11 col-sm-12 col-12">
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
            </div>
        </div>
    );
}

export default DashboardIndex;