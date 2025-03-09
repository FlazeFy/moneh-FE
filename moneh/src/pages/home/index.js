import AtomsBreakLine from "../../atoms/atoms_breakline";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsNavbar from "../../organisms/organisms_navbar";
import GetFeature from "./usecases/feature";
import PostFeedback from "./usecases/feedback";
import GetMultiEnv from "./usecases/multi_env";
import GetTotalUser from "./usecases/total_user";
import GetWelcoming from "./usecases/welcoming";

const HomeIndex = () => {
    return <>
        <OrganismsNavbar active="home"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <div className="bg-main-landing">
                    <GetWelcoming ctx="welcoming"/>
                </div>
                <div style={{height:"82vh"}}/>
                <div className="bg-second-landing">
                    <AtomsBreakLine length={6}/>
                    <GetFeature ctx="feature"/>
                </div>
                <div className="bg-third-landing">
                    <AtomsBreakLine length={2}/>
                    <GetMultiEnv/>
                    <GetTotalUser ctx="Summary Apps"/>
                </div>
                <div className="bg-fourth-landing">
                    <PostFeedback ctx="feedback"/>
                    <AtomsBreakLine length={2}/>
                </div>
            </div>
            <OrganismsFooter/>
        </div>
    </>
}

export default HomeIndex;