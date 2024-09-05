import OrganismsNavbar from "../../organisms/organisms_navbar";
import GetTotalFlowItemByType from "./usecases/get_total_flow_item_by_type";
import GetTotalFlowByCategory from "./usecases/get_total_flow_by_category";
import OrganismsFooter from "../../organisms/organisms_footer";
import GetTotalFlowAmountByType from "./usecases/get_total_flow_ammount_by_type";
import AtomsText from "../../atoms/atoms_text";

const StatsFlow_Index = () => {
    return (
        <>
            <OrganismsNavbar active="stats" subactive="stats_flow"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <div className="row mt-5 text-center">
                        <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                            <AtomsText text_type="main_heading" body={"Total Flow Item By Type"}/>
                            <GetTotalFlowItemByType ctx="get_total_flow_item_by_type"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                            <AtomsText text_type="main_heading" body={"Total Ammount Per Date By Type"}/>
                            <GetTotalFlowAmountByType ctx="get_total_flow_ammount_by_type"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                            <AtomsText text_type="main_heading" body={"Total Flow By Category"}/>
                            <GetTotalFlowByCategory ctx="get_total_flow_by_category"/>
                        </div>
                    </div>
                </div>
                <OrganismsFooter/>
            </div>
        </>
    );
}

export default StatsFlow_Index;
