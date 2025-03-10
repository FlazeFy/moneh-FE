import GetTotalFlowItemByType from "./usecases/get_total_flow_item_by_type";
import GetTotalFlowByCategory from "./usecases/get_total_flow_by_category";
import OrganismsFooter from "../../organisms/organisms_footer";
import GetTotalFlowAmountByType from "./usecases/get_total_flow_ammount_by_type";
import AtomsText from "../../atoms/atoms_text";
import OrganismsSidebar from "../../organisms/organisms_sidebar";
import AtomsButton from "../../atoms/atoms_button";
import AtomsBreakLine from "../../atoms/atoms_breakline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const StatsFlowIndex = () => {
    return (
        <div className="row">
            <div className="col-lg-3 col-md-1 col-sm-12 col-12 position-relative">
                <OrganismsSidebar active="flow"/>
            </div>
            <div className="col-lg-9 col-md-11 col-sm-12 col-12">
                <div className='content-grid'>
                    <div style={{minHeight:"100vh"}}>
                        <AtomsBreakLine length={1}/>
                        <AtomsButton title={<><FontAwesomeIcon icon={faArrowLeft}/> Back to Flow</>} button_type="btn_danger" onclick={(e) => window.location.href = '/flow'}/>
                        <div className="row mt-5 text-center">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 mx-auto pb-3">
                                <div className="container">
                                    <AtomsText text_type="sub_heading" body={"Total Flow Item By Type"}/>
                                    <GetTotalFlowItemByType ctx="get_total_flow_item_by_type"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 mx-auto pb-3">
                                <div className="container">
                                    <AtomsText text_type="sub_heading" body={"Total Ammount Per Date By Type"}/>
                                    <GetTotalFlowAmountByType ctx="get_total_flow_ammount_by_type"/>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12 mx-auto pb-3">
                                <div className="container">
                                    <AtomsText text_type="sub_heading" body={"Total Flow By Category"}/>
                                    <GetTotalFlowByCategory ctx="get_total_flow_by_category"/>
                                </div>
                            </div>
                        </div>
                        <OrganismsFooter/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatsFlowIndex;
