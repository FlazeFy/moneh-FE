import OrganismsFooter from "../../organisms/organisms_footer";
import AtomsBreakLine from "../../atoms/atoms_breakline";
import GetAllWishlist from "./usecases/getAllWishlist";
import GetSummaryWishlist from "./usecases/getSummary";
import PostWishlist from "./usecases/postWishlist";
import OrganismsManageDctModal from "../../organisms/organisms_manage_dct";
import OrganismsSidebar from "../../organisms/organisms_sidebar";

const WishlistIndex = () => {
    return (
        <div className="row">
            <div className="col-lg-3 col-md-1 col-sm-12 col-12 position-relative">
                <OrganismsSidebar active="wishlist"/>
            </div>
            <div className="col-lg-9 col-md-11 col-sm-12 col-12">
                <div className='content-grid'>
                    <div style={{minHeight:"100vh"}}>
                        <div className="row">
                            <div className="col-lg-9 col-md-8 col-sm-12">
                                <GetAllWishlist ctx="get_all_wishlist"/>
                            </div>
                            <div className="col-lg-3 col-md-8 col-sm-12">
                                <AtomsBreakLine length={1}/>
                                <PostWishlist ctx="post_wishlist"/>
                                <OrganismsManageDctModal cls="w-100 mt-2" ctx="wishlists_type" fetchUrl="http://127.0.0.1:1323/api/v1/dct/wishlists_type?page=1" postUrl="http://127.0.0.1:1323/api/v1/dct" deleteUrl="http://127.0.0.1:1323/api/v1/dct/destroy/"/>
                                <GetSummaryWishlist ctx="summary"/>
                            </div>
                        </div>
                    </div>
                    <OrganismsFooter/>
                </div>
            </div>
        </div>
    );
}

export default WishlistIndex;