import GetFooter from "../../components/bars/footer";
import GetNavbar from "../../components/bars/navbar";
import GetManageDctModal from "../../components/modals/manage_dct";
import GetAllPocket from "./usecases/getAllPocket";
import PostPocket from "./usecases/postPocket";

const Pocket_Index = () => {
    return (
        <>
            <GetNavbar active="pocket"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <PostPocket ctx="post_pocket"/>
                    <GetManageDctModal cls="ms-2" ctx="pockets_type" fetchUrl="http://127.0.0.1:1323/api/v1/dct/pockets_type?page=1" postUrl="http://127.0.0.1:1323/api/v1/dct" deleteUrl="http://127.0.0.1:1323/api/v1/dct/destroy/"/>
                    <GetAllPocket ctx="get_all_pocket"/>
                </div>
                <GetFooter/>
            </div>
        </>
    );
}

export default Pocket_Index;