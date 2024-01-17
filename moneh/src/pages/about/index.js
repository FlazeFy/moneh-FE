"use client"

import GetFooter from "../../components/bars/footer";
// Components
import GetNavbar from "../../components/bars/navbar";
import GetCreator from "./usecases/get_creator"

// Usecases

const About_Index = () => {
    return <>
        <GetNavbar active="about"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <GetCreator/>
            </div>
            <GetFooter/>
        </div>
    </>
}

export default About_Index;