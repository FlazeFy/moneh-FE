"use client"

import GetFooter from "../../components/bars/footer";
// Components
import GetNavbar from "../../components/bars/navbar";
import GetBreakLine from "../../components/others/breakLine";

// Usecases
import GetFeature from "./usecases/feature";
import GetWelcoming from "./usecases/welcoming";

const Home_Index = () => {
    return <>
        <GetNavbar active="home"/>
        <div className="content-grid">
            <GetWelcoming ctx="welcoming"/>
            <GetBreakLine length={2}/>
            <GetFeature ctx="feature"/>
            <GetFooter/>
        </div>
    </>
}

export default Home_Index;