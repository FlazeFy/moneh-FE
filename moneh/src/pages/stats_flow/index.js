import GetNavbar from "../../components/bars/navbar";
import GetTotalFlowByType from "./usecases/getTotalFlowByType";

const StatsFlow_Index = () => {
    return (
        <div className='content-grid'>
            <GetNavbar active="flow"/>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <GetTotalFlowByType ctx="get_total_flow_by_type"/>
                    
                </div>
            </div>
        </div>
    );
}

export default StatsFlow_Index;
