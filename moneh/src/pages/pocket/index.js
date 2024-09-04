import { useState } from "react";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsManageDctModal from "../../organisms/organisms_manage_dct";
import OrganismsNavbar from "../../organisms/organisms_navbar";
import GetAllPocket from "./usecases/getAllPocket";
import PostPocket from "./usecases/postPocket";

const Pocket_Index = () => {
    const [shouldFetch, setShouldFetch] = useState(false)
    const handlePostSuccess = () => {
        setShouldFetch(prev => !prev)
    }

    return (
        <>
            <OrganismsNavbar active="pocket"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <PostPocket ctx="post_pocket" onPostSuccess={handlePostSuccess}/>
                    <OrganismsManageDctModal cls="ms-2" ctx="pockets_type" fetchUrl="http://127.0.0.1:1323/api/v1/dct/pockets_type?page=1" postUrl="http://127.0.0.1:1323/api/v1/dct" deleteUrl="http://127.0.0.1:1323/api/v1/dct/destroy/"/>
                    <GetAllPocket ctx="get_all_pocket" shouldFetch={shouldFetch}/>
                </div>
                <OrganismsFooter/>
            </div>
        </>
    );
}

export default Pocket_Index;