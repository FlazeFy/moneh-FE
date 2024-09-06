import { faEnvelope, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect } from "react"
import AtomsButton from '../../../atoms/atoms_button'
import AtomsText from '../../../atoms/atoms_text'
import ReactDOM from 'react-dom';

// Component
import { convertDatetime } from '../../../modules/helpers/converter'

// Components
import { getLocal, storeLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import Swal from 'sweetalert2'
import MoleculesQrCode from '../../../molecules/molecules_qrcode'


export default function GetProfileCard({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItem] = useState([])

    const [resMsgFlowType, setResMsgFlowType] = useState("")
    const [resMsgAll, setResMsgAll] = useState("")

    //Default config
    const keyType = sessionStorage.getItem("flow_type")
    const keyView = sessionStorage.getItem("flow_total_ammount_view")
    const keyToken = getLocal("token_key")

    useEffect(() => {
        if(keyType == null){
            sessionStorage.setItem("flow_type", "income");
        }

        fetch(`http://127.0.0.1:1323/api/v1/user/my`,{
            headers: {
                Authorization: `Bearer ${keyToken}`
            }
        })
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItem(result.data)
                const item = result.data
                storeLocal(ctx + "_sess",JSON.stringify(item))             
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setItem(JSON.parse(getLocal(ctx + "_sess")))
                } else {
                    setIsLoaded(true)
                    setError(error)
                }
            }
        )
    },[])


    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <>
                <div className='profile-card'>
                    <AtomsText text_type="main_content" body="Sync to"/>
                    <div className='d-flex justify-content-start mt-2'>
                        <AtomsButton button_type="btn_info" title={<><FontAwesomeIcon icon={faEnvelope}/> {item['email']}</>}/>
                        {
                            item['telegram_is_valid'] == 1 ?
                                <AtomsButton button_type="btn_info" title={<><FontAwesomeIcon icon={faTelegram}/> {item['telegram_user_id']}</>}/>
                            :
                                <AtomsButton button_type="btn_primary" title={<><FontAwesomeIcon icon={faPlusCircle}/> Add Telegram</>} onclick={() => {
                                    Swal.fire({
                                        title: "Telegram Sign In",
                                        html: '<div id="qr-code-container"></div>', 
                                        didOpen: () => {
                                            ReactDOM.render(<MoleculesQrCode val={item['id']} />, document.getElementById('qr-code-container'));
                                        }
                                    });
                                }}/>
                        }
                    </div>
                </div>
                <div className="profile-card"> 
                    <div className='row'>
                        <div className='col'>
                            <AtomsText text_type="main_content" body="Username"/>
                            <h3>{item['username']}</h3>
                            <AtomsText text_type="main_content" body="Lastname / Firstname"/>
                            <h3>{ item['last_name'] == "" ? "-" : item['last_name']} / {item['first_name']}</h3>
                            <AtomsText text_type="main_content" body="Email"/>
                            <h3>{item['email']}</h3>
                            <AtomsText text_type="main_content" body="Average Spend / mon"/>
                            <h3>-</h3>
                            <AtomsText text_type="main_content" body="Average Income / mon"/>
                            <h3>-</h3>
                            <AtomsText text_type="main_content" body="Achievements"/>
                        </div>
                        <div className='col text-end'>
                            {
                                item['image_url'] == "" ? 
                                    <img src="/assets/profile.png" className="img img-fluid mb-3"/>
                                :
                                    <img src={item['image_url']} className="img img-fluid mb-3"/>
                            }
                            <div className='fst-italic'><AtomsText text_type="main_content" body={<>Joined since {convertDatetime(item['accepted_at'],"datetime")}</>}/></div>
                        </div>
                    </div>            
                </div>
            </>
        )
    }
}
  