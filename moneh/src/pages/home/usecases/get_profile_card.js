import React from 'react'
import { useState, useEffect } from "react"

// Component
import { convertDatetime } from '../../../modules/helpers/converter'

// Components
import { getLocal, storeLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'


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
            <div className="profile-card"> 
                <div className='row'>
                    <div className='col'>
                        <label className='text-white'>Username</label>
                        <h3>{item['username']}</h3>
                        <label className='text-white'>Lastname / Firstname</label>
                        <h3>{ item['last_name'] == "" ? "-" : item['last_name']} / {item['first_name']}</h3>
                        <label className='text-white'>Gmail</label>
                        <h3>{item['email']}</h3>
                        <label className='text-white'>Average Spend / mon</label>
                        <h3>-</h3>
                        <label className='text-white'>Average Income / mon</label>
                        <h3>-</h3>
                        <label className='text-white'>Achievements</label>
                    </div>
                    <div className='col text-end'>
                        {
                            item['image_url'] == "" ? 
                                <img src="/assets/profile.png" className="img img-fluid mb-3"/>
                            :
                                <img src={item['image_url']} className="img img-fluid mb-3"/>
                        }
                        <label className='fst-italic text-white'>Joined since {convertDatetime(item['accepted_at'],"datetime")}</label>
                    </div>
                </div>            
            </div>
        )
    }
}
  