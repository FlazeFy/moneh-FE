import GetFooter from "../../components/bars/footer";
import GetNavbar from "../../components/bars/navbar";
import GetBreakLine from "../../components/others/breakLine";
import GetAllWishlist from "./usecases/getAllWishlist";
import GetSummaryWishlist from "./usecases/getSummary";
import PostWishlist from "./usecases/postWishlist";

const Wishlist_Index = () => {
    return (
        <>
            <GetNavbar active="wishlist"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <div className="row">
                        <div className="col-lg-9 col-md-8 col-sm-12">
                            <GetAllWishlist ctx="get_all_wishlist"/>
                        </div>
                        <div className="col-lg-3 col-md-8 col-sm-12">
                            <GetBreakLine length={1}/>
                            <PostWishlist ctx="post_wishlist"/>
                            <GetSummaryWishlist ctx="summary"/>
                        </div>
                    </div>
                </div>
                <GetFooter/>
            </div>
        </>
    );
}

export default Wishlist_Index;