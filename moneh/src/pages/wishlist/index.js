import GetNavbar from "../../components/bars/navbar";
import GetAllWishlist from "./usecases/getAllWishlist";

const Wishlist_Index = () => {
    return (
        <div className='content-grid'>
            <GetNavbar active="wishlist"/>
            <GetAllWishlist ctx="get_all_wishlist"/>
        </div>
    );
}

export default Wishlist_Index;