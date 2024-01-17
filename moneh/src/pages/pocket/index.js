import GetFooter from "../../components/bars/footer";
import GetNavbar from "../../components/bars/navbar";
import GetAllPocket from "./usecases/getAllPocket";
import PostPocket from "./usecases/postPocket";

const Pocket_Index = () => {
    return (
        <>
            <GetNavbar active="pocket"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <PostPocket ctx="post_pocket"/>
                    <GetAllPocket ctx="get_all_pocket"/>
                </div>
                <GetFooter/>
            </div>
        </>
    );
}

export default Pocket_Index;