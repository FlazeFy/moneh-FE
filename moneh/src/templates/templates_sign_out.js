import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faXmark} from "@fortawesome/free-solid-svg-icons"
import { getLocal } from "../modules/storages/local";
import { isLogged } from "../modules/helpers/auth";
import modal from '../organisms/organisms.module.css'

export default function TemplateSignOut(props) {
    const keyToken = getLocal("token_key")

    const getActive = (val, curr) => {
        if(val === curr){
            return "active";
        } else {
            return "";
        }
    }

    // Services
    const handleSubmit = async (e) => {
        try {
            const response = await Axios.post("http://127.0.0.1:1323/api/v1/logout", null, {
                headers: {
                    Authorization: `Bearer ${keyToken}`
                }
            })
            if(response.status !== 200){
                window.location.reload(false)
                return response.data.message
            } else {
                localStorage.clear()
                window.location.href = '/'
            }
        } catch (error) {
            //
        }
    }

    return (
        <li>
            {
                isLogged(
                    <>
                        <a className={"nav-link " + getActive(props.active,"login")} data-bs-toggle="modal" data-bs-target={"#signoutModal"}>
                            <span className='icon-box bg-danger'><FontAwesomeIcon icon={faXmark} size="xl"/></span> {props.is_side_bar && <>Sign Out</>}
                        </a>
                        <div className="modal fade" id={"signoutModal"} aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Sign Out</h5>
                                        <button type="button" className={modal.btn_close_modal} data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
                                    </div>
                                    <div className="modal-body text-center p-4">
                                        <p className="text-white mt-4">Are you sure want to sign out from this account?</p>
                                        <button className="btn btn-danger w-100 mb-4" onClick={handleSubmit}>Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    ,
                    <a className={"nav-link bg-success text-white" +  getActive(props.active,"login")} href="/login">
                        <FontAwesomeIcon icon={faRightFromBracket} size="xl"/>
                    </a>
                )
            }
        </li>
    )
}