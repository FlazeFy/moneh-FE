import GetNavbar from "../../components/bars/navbar";
import GetTotalDctByType from "./usecases/get_total_dct_by_type";

const StatsOther_Index = () => {
    return (
        <div className='content-grid'>
            <GetNavbar active="stats" subactive="stats_others"/>
            <div className="row mt-5">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <GetTotalDctByType ctx="get_total_dct_by_type"/>
                </div>
            </div>
        </div>
    );
}

export default StatsOther_Index;
