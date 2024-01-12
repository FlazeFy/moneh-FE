import GetNavbar from "../../components/bars/navbar";
import GetAllPocket from "./usecases/getAllPocket";
import PostPocket from "./usecases/postPocket";

const Pocket_Index = () => {
    return (
        <div className='content-grid'>
            <GetNavbar active="pocket"/>
            <GetAllPocket ctx="get_all_pocket"/>
            <PostPocket ctx="post_pocket"/>
        </div>
    );
}

export default Pocket_Index;