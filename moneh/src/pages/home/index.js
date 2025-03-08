import AtomsBreakLine from "../../atoms/atoms_breakline";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsNavbar from "../../organisms/organisms_navbar";
import { isLogged } from "../../modules/helpers/auth";
import GetFeature from "./usecases/feature";
import GetFeedback from "./usecases/feedback";
import GetProfileCard from "./usecases/get_profile_card";
import GetWelcoming from "./usecases/welcoming";

const HomeIndex = () => {
    return <>
        <OrganismsNavbar active="home"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                {
                    isLogged(<><AtomsBreakLine length={2}/><GetProfileCard/></>,<></>)
                }
                <AtomsBreakLine length={2}/>
                <GetWelcoming ctx="welcoming"/>
                <AtomsBreakLine length={2}/>
                <GetFeature ctx="feature"/>
                <AtomsBreakLine length={2}/>
                <GetFeedback ctx="feedback"/>
                <AtomsBreakLine length={2}/>
            </div>
            <OrganismsFooter/>
        </div>
    </>
}

export default HomeIndex;