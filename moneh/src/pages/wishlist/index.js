import GetNavbar from "../../components/bars/navbar";
import GetAllWishlist from "./usecases/getAllWishlist";
import GetSummaryWishlist from "./usecases/getSummary";

const Wishlist_Index = () => {
    return (
        <div className='content-grid'>
            <GetNavbar active="wishlist"/>
            <div className="row">
                <div className="col-lg-9 col-md-8 col-sm-12">
                    <GetAllWishlist ctx="get_all_wishlist"/>
                </div>
                <div className="col-lg-3 col-md-8 col-sm-12">
                    <GetSummaryWishlist ctx="summary"/>
                </div>
            </div>
        </div>
    );
}

export default Wishlist_Index;