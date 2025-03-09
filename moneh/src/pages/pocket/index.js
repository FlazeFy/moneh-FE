import { useState } from "react";
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
                        <GetAllPocket ctx="get_all_pocket" shouldFetch={shouldFetch} onPostSuccess={handlePostSuccess}/>
                    </div>
                    <OrganismsFooter/>
                </div>
            </div>
        </div>
    );
}

export default PocketIndex;