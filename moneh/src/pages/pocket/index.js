import { useState } from "react";
import AtomsBreakLine from "../../atoms/atoms_breakline";
import MoleculesButtonCustomIcon from "../../molecules/molecules_button_custom_icon";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsManageDctModal from "../../organisms/organisms_manage_dct";
import OrganismsSidebar from "../../organisms/organisms_sidebar";
import GetAllPocket from "./usecases/getAllPocket";
import PostPocket from "./usecases/postPocket";

const PocketIndex = () => {
    const [shouldFetch, setShouldFetch] = useState(false)
    const handlePostSuccess = () => {
        setShouldFetch(prev => !prev)
    }

    return (
        <div className="row">
            <div className="col-lg-3 col-md-1 col-sm-12 col-12 position-relative">
                <OrganismsSidebar active="pocket"/>
            </div>
            <div className="col-lg-9 col-md-11 col-sm-12 col-12">
                <div className='content-grid'>
                    <div style={{minHeight:"100vh"}}>
                        <PostPocket ctx="post_pocket" onPostSuccess={handlePostSuccess}/>
                        <OrganismsManageDctModal cls="ms-2" ctx="pockets_type" fetchUrl="http://127.0.0.1:1323/api/v1/dct/pockets_type?page=1" postUrl="http://127.0.0.1:1323/api/v1/dct" deleteUrl="http://127.0.0.1:1323/api/v1/dct/destroy/"/>
                        <AtomsBreakLine length={2}/>
                        <div className="row">
                            <div className="col-lg-8 col-md-7 col-sm-12 col-12">

                            </div>
                            <div className="col-lg-4 col-md-5 col-sm-12 col-12">
                                <MoleculesButtonCustomIcon title="Stats" content="See Stats about your wallet" img_url={'/assets/stats2.png'} url="/stats_pocket"/>
                            </div>
                        </div>
                        <AtomsBreakLine length={1}/>                        
                        <GetAllPocket ctx="all_pocket" shouldFetch={shouldFetch} onPostSuccess={handlePostSuccess}/>
                        <OrganismsFooter/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PocketIndex;