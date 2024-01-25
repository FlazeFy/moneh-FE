import React, { useEffect, useState } from "react"
import Axios from 'axios'

// Component
import modal from '../../../components/modals/modals.module.css'
import GetFormTemplate from '../../../components/containers/form'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons"

// Modules
import { getBoolCheck, getCleanTitleFromCtx } from '../../../modules/helpers/converter'

export default function PostFlow({ctx}) {
    //Initial variable
    const [flowType, setFlowType] = useState("")
    const [flowCat, setFlowCat] = useState("")
    const [flowName, setFlowName] = useState("")
    const [flowDesc, setFlowDesc] = useState("")
    const [flowAmmount, setFlowAmmount] = useState(0)
    const [flowTag, setFlowTag] = useState(null)
    const [isShared, setIsShared] = useState(false)

    const [resMsgFlowType, setResMsgFlowType] = useState("")
    const [resMsgFlowCat, setResMsgFlowCat] = useState("")
    const [resMsgFlowName, setResMsgFlowName] = useState("")
    const [resMsgFlowDesc, setResMsgFlowDesc] = useState("")
    const [resMsgFlowAmmount, setResMsgFlowAmmount] = useState("")
    const [resMsgFlowTag, setResMsgFlowTag] = useState("")
    const [resMsgIsShared, setResMsgIsShared] = useState("")
    const [resMsgAll, setResMsgAll] = useState("")

    const builder = [
        {
            type: 'select',
            class: 'form-control',
            label: 'Flow Type',
            placeholder: 'Type flow type',
            maxLength: 75,
            handleChange: (event) => {
                setFlowType(event.target.value)
            },
            errorMsg: resMsgFlowType,
            url: [
                {
                    "dictionaries_name": "spending"
                },
                {
                    "dictionaries_name": "income"
                }
            ],
        },
        {
            type: 'select',
            class: 'form-control',
            label: 'Flow Category',
            placeholder: 'Select flow category',
            maxLength: 75,
            handleChange: (event) => {
                setFlowCat(event.target.value)
            },
            errorMsg: resMsgFlowCat,
            url: 'http://127.0.0.1:1323/api/v1/dct/flows_category?page=1'
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'Flow Name',
            placeholder: 'Type flow name',
            is_required: true,
            is_obsecure: false,
            maxLength: 144,
            handleChange: (event) => {
                setFlowName(event.target.value)
            },
            errorMsg: resMsgFlowName
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'Flow Description',
            is_required: true,
            maxLength: 144,
            handleChange: (event) => {
                setFlowDesc(event.target.value)
            },
            errorMsg: resMsgFlowDesc,
        },
        {
            type: 'number',
            class: 'form-control',
            label: 'Flow Ammount',
            placeholder: 'Type flow ammount',
            is_required: true,
            maxLength: 36,
            handleChange: (event) => {
                setFlowAmmount(event.target.value)
            },
            errorMsg: resMsgFlowAmmount,
        },
        {
            type: 'tag',
            class: 'btn btn-tag',
            label: 'Flow Tag',
            handleChange: (event) => {
                setFlowTag(event)
            },
            errorMsg: resMsgFlowTag,
            url: 'http://127.0.0.1:1323/api/v1/tag/desc?page=1'
        },
        {
            type: 'checkbox',
            class: 'form-check-input',
            label: 'Is Shared',
            handleChange: (event) => {
                setIsShared(getBoolCheck(event.target.value))
            },
            errorMsg: resMsgIsShared,
        },
        {
            type: 'submit',
            class: 'btn btn-success rounded-pill',
            label: 'Submit',
            placeholder: null,
            toogle_disabled: false,
            handleClick: (event) => {
                handleSubmit(event)
            },
            errorMsg: resMsgAll
        }
    ]

    // Services
    const handleSubmit = async (e) => {
        try {
            const data = new FormData();
            data.append('flows_type', flowType);
            data.append('flows_category', flowCat);
            data.append('flows_name', flowName);
            data.append('flows_desc', flowDesc);
            data.append('flows_ammount', flowAmmount);
            data.append('flows_tag', flowTag);
            data.append('is_shared', isShared);
            
            const response = await Axios.post("http://127.0.0.1:1323/api/v1/flows", data, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            window.location.reload(false)

            if(response.data.status != 200){
                return response.data.message
            } else {
                return ""
            }
        } catch (error) {
            setResMsgAll(error)
        }
    }

    return (
        <> 
            <button className={modal.manage_btn} data-bs-toggle="modal" data-bs-target={"#addModal"+ctx}><FontAwesomeIcon icon={faAdd}/> {getCleanTitleFromCtx(ctx)}</button>
            <div className="modal fade" id={"addModal"+ctx} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{getCleanTitleFromCtx(ctx)}</h5>
                            <button type="button" className={modal.btn_close_modal} data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                        <div className="modal-body">
                            <GetFormTemplate type={"single-line"} props={builder} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}