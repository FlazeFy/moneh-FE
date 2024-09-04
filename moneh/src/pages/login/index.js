"use client"
import '../../design_tokens/loginregis.css'

import PostLogin from "./usecases/postLogin";

const Login_Index = () => {
    return <>
        <div className="content-grid">
            <PostLogin/>
        </div>
    </>
}

export default Login_Index;