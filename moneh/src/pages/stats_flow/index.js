import GetNavbar from "../../components/bars/navbar";
import GetTotalFlowItemByType from "./usecases/get_total_flow_item_by_type";
import GetTotalFlowByCategory from "./usecases/get_total_flow_by_category";
import GetFooter from "../../components/bars/footer";
import GetTotalFlowAmountByType from "./usecases/get_total_flow_ammount_by_type";

const StatsFlow_Index = () => {
    return (
        <>
            <GetNavbar active="stats" subactive="stats_flow"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <div className="row mt-5">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <GetTotalFlowItemByType ctx="get_total_flow_item_by_type"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <GetTotalFlowAmountByType ctx="get_total_flow_ammount_by_type"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <GetTotalFlowByCategory ctx="get_total_flow_by_category"/>
                        </div>
                    </div>
                </div>
                <GetFooter/>
            </div>
        </>
    );
}

export default StatsFlow_Index;
