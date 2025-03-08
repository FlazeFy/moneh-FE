import '../../design_tokens/loginregis.css'
import PostLogin from "./usecases/postLogin";

const LoginIndex = () => {
    return <>
        <div className="content-grid">
            <PostLogin/>
        </div>
    </>
}

export default LoginIndex;