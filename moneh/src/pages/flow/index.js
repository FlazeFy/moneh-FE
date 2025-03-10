import { useState } from "react";
import AtomsBreakLine from "../../atoms/atoms_breakline";
import MoleculesButtonCustomIcon from "../../molecules/molecules_button_custom_icon";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsManageDctModal from "../../organisms/organisms_manage_dct";
import OrganismsSidebar from "../../organisms/organisms_sidebar";
import GetAllFlow from "./usecases/getAllFlow";
import GetSummary from "./usecases/getSummary";
import PostFlow from "./usecases/postFlow";

const FlowIndex = () => {
    const [shouldFetch, setShouldFetch] = useState(false)
    const handlePostSuccess = () => {
        setShouldFetch(prev => !prev)
    }

    return (
        <div className="row">
            <div className="col-lg-3 col-md-1 col-sm-12 col-12 position-relative">
                <OrganismsSidebar active="flow"/>
            </div>
            <div className="col-lg-9 col-md-11 col-sm-12 col-12">
                <div className='content-grid'>
                    <div style={{minHeight:"100vh"}}>
                        <PostFlow ctx="add_flow" onPostSuccess={handlePostSuccess}/>
                        <OrganismsManageDctModal cls="ms-2" ctx="flows_category" fetchUrl="http://127.0.0.1:1323/api/v1/dct/flows_category?page=1" postUrl="http://127.0.0.1:1323/api/v1/dct" deleteUrl="http://127.0.0.1:1323/api/v1/dct/destroy/" table="flows" column={"flows_category"}/>
                        <AtomsBreakLine length={2}/>
                        <div className="row">
                            <div className="col-lg-8 col-md-7 col-sm-12 col-12">
                                <GetSummary ctx="summary" shouldFetch={shouldFetch}/>
                            </div>
                            <div className="col-lg-4 col-md-5 col-sm-12 col-12">
                                <MoleculesButtonCustomIcon title="Stats" content="See Stats about your cash flow" img_url={'/assets/stats2.png'} url="/stats_flow"/>
                            </div>
                        </div>
                        <AtomsBreakLine length={1}/>
                        <GetAllFlow ctx="all_flow" shouldFetch={shouldFetch} onPostSuccess={handlePostSuccess}/>
                    </div>
                    <OrganismsFooter/>
                </div>
            </div>
        </div>
    );
}

export default FlowIndex;