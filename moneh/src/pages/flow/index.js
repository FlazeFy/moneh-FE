import GetNavbar from "../../components/bars/navbar";
import GetAllFlow from "./usecases/getAllFlow";

const Flow_Index = () => {
    return (
        <div className='content-grid'>
            <GetNavbar active="flow"/>
            <GetAllFlow ctx="get_all_flow"/>
        </div>
    );
}

export default Flow_Index;