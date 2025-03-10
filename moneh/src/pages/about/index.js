import AtomsBreakLine from "../../atoms/atoms_breakline";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsNavbar from "../../organisms/organisms_navbar";
import AboutApps from "./usecases/apps";
import AboutCreator from "./usecases/creator";

const AboutIndex = () => {
    return <>
        <OrganismsNavbar active="about"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh", width:"1080px"}} className="mx-auto text-center">
                <AtomsBreakLine length={2}/>
                <div className="container-white">
                    <AboutApps/>
                </div>
                <AtomsBreakLine length={2}/>
                <div className="container-white">
                    <AboutCreator/>
                </div>
            </div>
        </div>
    </>
}

export default AboutIndex;