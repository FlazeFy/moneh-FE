import AtomsText from "../../atoms/atoms_text";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsNavbar from "../../organisms/organisms_navbar";
import GetTotalWishlistByIsAchieved from "./usecases/get_total_wishlist_by_is_achieved";
import GetTotalWishlistByPriority from "./usecases/get_total_wishlist_by_priority";
import GetTotalWishlistByType from "./usecases/get_total_wishlist_by_type";

const StatsWishlist_Index = () => {
    return (
        <>
            <OrganismsNavbar active="stats" subactive="stats_wishlist"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <div className="row mt-5 text-center">
                        <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                            <AtomsText text_type="main_heading" body={"Total Wishlist By Type"}/>
                            <GetTotalWishlistByType ctx="get_total_wishlist_by_type"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                            <AtomsText text_type="main_heading" body={"Total Wishlist By Priority"}/>
                            <GetTotalWishlistByPriority ctx="get_total_wishlist_by_priority"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                            <AtomsText text_type="main_heading" body={"Total Wishlist By Achieved Status"}/>
                            <GetTotalWishlistByIsAchieved ctx="get_total_wishlist_by_is_achieved"/>
                        </div>
                    </div>
                </div>
                <OrganismsFooter/>
            </div>
        </>
    );
}

export default StatsWishlist_Index;
