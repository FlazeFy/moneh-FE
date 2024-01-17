import GetFooter from "../../components/bars/footer";
import GetNavbar from "../../components/bars/navbar";
import GetTotalWishlistByIsAchieved from "./usecases/get_total_wishlist_by_is_achieved";
import GetTotalWishlistByPriority from "./usecases/get_total_wishlist_by_priority";
import GetTotalWishlistByType from "./usecases/get_total_wishlist_by_type";

const StatsWishlist_Index = () => {
    return (
        <>
            <GetNavbar active="stats" subactive="stats_wishlist"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <div className="row mt-5">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <GetTotalWishlistByType ctx="get_total_wishlist_by_type"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <GetTotalWishlistByPriority ctx="get_total_wishlist_by_priority"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <GetTotalWishlistByIsAchieved ctx="get_total_wishlist_by_is_achieved"/>
                        </div>
                    </div>
                </div>
                <GetFooter/>
            </div>
        </>
    );
}

export default StatsWishlist_Index;
