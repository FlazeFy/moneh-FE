import GetNavbar from "../../components/bars/navbar";
import GetTotalWishlistByType from "./usecases/get_total_wishlist_by_type";

const StatsWishlist_Index = () => {
    return (
        <div className='content-grid'>
            <GetNavbar active="stats" subactive="stats_wishlist"/>
            <div className="row mt-5">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <GetTotalWishlistByType ctx="get_total_wishlist_by_type"/>
                </div>
            </div>
        </div>
    );
}

export default StatsWishlist_Index;
