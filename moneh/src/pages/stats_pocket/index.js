import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AtomsBreakLine from "../../atoms/atoms_breakline";
import AtomsButton from "../../atoms/atoms_button";
import AtomsText from "../../atoms/atoms_text";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsSidebar from "../../organisms/organisms_sidebar";
import GetTotalPocketByType from "./usecases/get_total_pocket_by_type";

const StatsPocketIndex = () => {
    return (
        <div className="row">
            <div className="col-lg-3 col-md-1 col-sm-12 col-12 position-relative">
                <OrganismsSidebar active="pocket"/>
            </div>
            <div className="col-lg-9 col-md-11 col-sm-12 col-12">
                <div className='content-grid'>
                    <div style={{minHeight:"100vh"}}>
                        <AtomsBreakLine length={1}/>
                        <AtomsButton title={<><FontAwesomeIcon icon={faArrowLeft}/> Back to Pocket</>} button_type="btn_danger" onclick={(e) => window.location.href = '/pocket'}/>
                        <div className="row mt-5 text-center">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="container">
                                    <AtomsText text_type="sub_heading" body={"Total Pocket By Type"}/>
                                    <GetTotalPocketByType ctx="get_total_pocket_by_type"/>
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

export default StatsPocketIndex;
