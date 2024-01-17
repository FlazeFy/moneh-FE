"use client"

import GetFooter from "../../components/bars/footer";
// Components
import GetNavbar from "../../components/bars/navbar";
import GetBreakLine from "../../components/others/breakLine";

// Usecases
import GetFeature from "./usecases/feature";
import GetFeedback from "./usecases/feedback";
import GetWelcoming from "./usecases/welcoming";

const Home_Index = () => {
    return <>
        <GetNavbar active="home"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <GetBreakLine length={2}/>
                <GetWelcoming ctx="welcoming"/>
                <GetBreakLine length={2}/>
                <GetFeature ctx="feature"/>
                <GetBreakLine length={2}/>
                <GetFeedback ctx="feedback"/>
                <GetBreakLine length={2}/>
            </div>
            <GetFooter/>
        </div>
    </>
}

export default Home_Index;