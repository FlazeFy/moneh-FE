import GetFooter from "../../components/bars/footer";
import GetNavbar from "../../components/bars/navbar";
import GetAllFlow from "./usecases/getAllFlow";
import GetSummary from "./usecases/getSummary";
import PostFlow from "./usecases/postFlow";

const Flow_Index = () => {
    return (
        <>
            <GetNavbar active="flow"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <PostFlow ctx="post_flow"/>
                    <GetSummary ctx="summary"/>
                    <GetAllFlow ctx="get_all_flow"/>
                </div>
                <GetFooter/>
            </div>
        </>
    );
}

export default Flow_Index;