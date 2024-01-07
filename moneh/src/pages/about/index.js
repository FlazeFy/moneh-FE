"use client"

// Components
import GetNavbar from "../../components/bars/navbar";
import GetCreator from "./usecases/get_creator"

// Usecases

const About_Index = () => {
    return <>
        <GetNavbar active="about"/>
        <div className="content-grid">
            <GetCreator/>
        </div>
    </>
}

export default About_Index;