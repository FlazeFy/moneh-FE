import { useState } from "react";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsManageDctModal from "../../organisms/organisms_manage_dct";
import OrganismsNavbar from "../../organisms/organisms_navbar";
import GetAllFlow from "./usecases/getAllFlow";
import GetSummary from "./usecases/getSummary";
import PostFlow from "./usecases/postFlow";

const Flow_Index = () => {
    const [shouldFetch, setShouldFetch] = useState(false)
    const handlePostSuccess = () => {
        setShouldFetch(prev => !prev)
    }

    return (
        <>
            <OrganismsNavbar active="flow"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <PostFlow ctx="post_flow" onPostSuccess={handlePostSuccess}/>
                    <OrganismsManageDctModal cls="ms-2" ctx="flows_category" fetchUrl="http://127.0.0.1:1323/api/v1/dct/flows_category?page=1" postUrl="http://127.0.0.1:1323/api/v1/dct" deleteUrl="http://127.0.0.1:1323/api/v1/dct/destroy/" table="flows" column={"flows_category"}/>
                    <GetSummary ctx="summary" shouldFetch={shouldFetch}/>
                    <GetAllFlow ctx="get_all_flow" shouldFetch={shouldFetch}/>
                </div>
                <OrganismsFooter/>
            </div>
        </>
    );
}

export default Flow_Index;