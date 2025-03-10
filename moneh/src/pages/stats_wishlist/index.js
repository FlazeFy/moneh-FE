import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AtomsBreakLine from "../../atoms/atoms_breakline";
import AtomsButton from "../../atoms/atoms_button";
import AtomsText from "../../atoms/atoms_text";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsSidebar from "../../organisms/organisms_sidebar";
import GetTotalWishlistByIsAchieved from "./usecases/get_total_wishlist_by_is_achieved";
import GetTotalWishlistByPriority from "./usecases/get_total_wishlist_by_priority";
import GetTotalWishlistByType from "./usecases/get_total_wishlist_by_type";

const StatsWishlistIndex = () => {
    return (
        <div className="row">
            <div className="col-lg-3 col-md-1 col-sm-12 col-12 position-relative">
                <OrganismsSidebar active="wishlist"/>
            </div>
            <div className="col-lg-9 col-md-11 col-sm-12 col-12">
                <div className='content-grid'>
                    <div style={{minHeight:"100vh"}}>
                        <AtomsBreakLine length={1}/>
                        <AtomsButton title={<><FontAwesomeIcon icon={faArrowLeft}/> Back to Wishlist</>} button_type="btn_danger" onclick={(e) => window.location.href = '/wishlist'}/>
                        <div className="row mt-5 text-center">
                            <div className="col-lg-6 col-md-6 col-sm-12 mx-auto pb-3">
                                <div className="container">
                                    <AtomsText text_type="sub_heading" body={"Total Wishlist By Type"}/>
                                    <GetTotalWishlistByType ctx="get_total_wishlist_by_type"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 mx-auto pb-3">
                                <div className="container">
                                    <AtomsText text_type="sub_heading" body={"Total Wishlist By Priority"}/>                                
                                    <GetTotalWishlistByPriority ctx="get_total_wishlist_by_priority"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 mx-auto pb-3">
                                <div className="container">
                                    <AtomsText text_type="sub_heading" body={"Total Wishlist By Achieved Status"}/>
                                    <GetTotalWishlistByIsAchieved ctx="get_total_wishlist_by_is_achieved"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">

                            </div>
                        </div>
                        <OrganismsFooter/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatsWishlistIndex;
