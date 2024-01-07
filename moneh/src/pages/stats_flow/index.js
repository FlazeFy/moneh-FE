import GetNavbar from "../../components/bars/navbar";
import GetTotalFlowByType from "./usecases/get_total_flow_by_type";
import GetTotalFlowByCategory from "./usecases/get_total_flow_by_category";

const StatsFlow_Index = () => {
    return (
        <div className='content-grid'>
            <GetNavbar active="stats" subactive="stats_flow"/>
            <div className="row mt-5">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <GetTotalFlowByType ctx="get_total_flow_by_type"/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <GetTotalFlowByCategory ctx="get_total_flow_by_category"/>
                </div>
            </div>
        </div>
    );
}

export default StatsFlow_Index;
