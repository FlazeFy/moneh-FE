import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsNavbar from "../../organisms/organisms_navbar";
import GetCreator from "./usecases/get_creator"

const AboutIndex = () => {
    return <>
        <OrganismsNavbar active="about"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <GetCreator/>
            </div>
            <OrganismsFooter/>
        </div>
    </>
}

export default AboutIndex;