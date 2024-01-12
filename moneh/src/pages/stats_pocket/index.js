import GetNavbar from "../../components/bars/navbar";
import GetTotalPocketByType from "./usecases/get_total_pocket_by_type";

const StatsPocket_Index = () => {
    return (
        <div className='content-grid'>
            <GetNavbar active="stats" subactive="stats_flow"/>
            <div className="row mt-5">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <GetTotalPocketByType ctx="get_total_pocket_by_type"/>
                </div>
            </div>
        </div>
    );
}

export default StatsPocket_Index;
