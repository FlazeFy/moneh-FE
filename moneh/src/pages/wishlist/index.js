import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsNavbar from "../../organisms/organisms_navbar";
import AtomsBreakLine from "../../atoms/atoms_breakline";
import GetAllWishlist from "./usecases/getAllWishlist";
import GetSummaryWishlist from "./usecases/getSummary";
import PostWishlist from "./usecases/postWishlist";
import OrganismsManageDctModal from "../../organisms/organisms_manage_dct";

const WishlistIndex = () => {
    return (
        <>
            <OrganismsNavbar active="wishlist"/>
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
        </>
    );
}

export default WishlistIndex;