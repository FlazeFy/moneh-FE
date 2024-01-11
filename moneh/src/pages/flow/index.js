import GetNavbar from "../../components/bars/navbar";
import GetAllFlow from "./usecases/getAllFlow";
import GetSummary from "./usecases/getSummary";
import PostFlow from "./usecases/postFlow";

const Flow_Index = () => {
    return (
        <div className='content-grid'>
            <GetNavbar active="flow"/>
            <PostFlow ctx="post_flow"/>
            <GetSummary ctx="summary"/>
            <GetAllFlow ctx="get_all_flow"/>
        </div>
    );
}

export default Flow_Index;