"use client"

import OrganismsFooter from "../../organisms/organisms_footer";
// Components
import OrganismsNavbar from "../../organisms/organisms_navbar";
import GetCreator from "./usecases/get_creator"

// Usecases

const About_Index = () => {
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

export default About_Index;