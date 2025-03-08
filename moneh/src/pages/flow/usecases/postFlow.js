import React, { useState } from "react"
import Axios from 'axios'
import Swal from 'sweetalert2'

// Component
import modal from '../../../organisms/organisms.module.css'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons"

// Modules
import { getBoolCheck, getCleanTitleFromCtx } from '../../../modules/helpers/converter'
import OrganismsForm from "../../../organisms/organisms_form"
import AtomsText from "../../../atoms/atoms_text"
import { getLocal } from "../../../modules/storages/local"

export default function PostFlow({ ctx, onPostSuccess }) {
    const optionFlowType = [
        { "dictionaries_name": "spending" },
        { "dictionaries_name": "income" }
    ]

    //Initial variable
    const [flowType, setFlowType] = useState(optionFlowType[0].dictionaries_name)
    const [flowCat, setFlowCat] = useState("")
    const [flowName, setFlowName] = useState("")
    const [flowDesc, setFlowDesc] = useState("")
    const [flowAmmount, setFlowAmmount] = useState(0)
    const [flowTag, setFlowTag] = useState(null)
    const [createdAt, setCreatedAt] = useState(null)
    const [isShared, setIsShared] = useState(false)

    const builder = [
        {
            type: 'select',
            class: 'form-control',
            label: 'Flow Type',
            placeholder: 'Type flow type',
            handleChange: (event) => {
                setFlowType(event.target.value)
            },
            url: optionFlowType,
        },
        {
            type: 'select',
            class: 'form-control',
            label: 'Flow Category',
            placeholder: 'Select flow category',
            handleChange: (event) => {
                setFlowCat(event.target.value)
            },            
            url: 'http://127.0.0.1:1323/api/v1/dct/flows_category?page=1'
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'Flow Name',
            placeholder: 'Type flow name',
            is_required: true,
            is_obsecure: false,
            max: 144,
            handleChange: (event) => {
                setFlowName(event.target.value)
            },
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'Flow Description',
            is_required: true,
            max: 144,
            handleChange: (event) => {
                setFlowDesc(event.target.value)
            },
        },
        {
            type: 'number',
            class: 'form-control',
            label: 'Flow Ammount',
            placeholder: 'Type flow ammount',
            is_required: true,
            max: 36,
            handleChange: (event) => {
                setFlowAmmount(event.target.value)
            },
        },
        {
            type: 'datetime-local',
            class: 'form-control',
            label: 'Created At',
            is_required: false,
            handleChange: (event) => {
                setCreatedAt(event.target.value)
            },
        },
        {
            type: 'tag',
            class: 'btn btn-tag',
            label: 'Flow Tag',
            handleChange: (event) => {
                setFlowTag(event)
            },
            url: 'http://127.0.0.1:1323/api/v1/tag/desc?page=1'
        },
        {
            type: 'checkbox',
            class: 'form-check-input',
            label: 'Is Shared',
            handleChange: (event) => {
                setIsShared(getBoolCheck(event.target.value))
            },
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
        }
    ]

    // Services
    const handleSubmit = async (e) => {
        e.preventDefault()
        Swal.showLoading()

        try {
            const data = new FormData()
            const keyToken = getLocal("token_key")

            data.append('flows_type', flowType)
            data.append('flows_category', flowCat)
            data.append('flows_name', flowName)
            data.append('flows_desc', flowDesc)
            data.append('flows_ammount', flowAmmount)
            data.append('flows_tag', flowTag)
            data.append('created_at', createdAt ?? "")
            data.append('is_shared', isShared)

            const response = await Axios.post("http://127.0.0.1:1323/api/v1/flows", data, {
                headers: { 
                    'Content-Type': 'multipart/form-data', 
                    'Authorization': `Bearer ${keyToken}`
                }
            })
            Swal.close()
            if (response.data.status === 200) {
                Swal.fire({ 
                    icon: "success", 
                    title: "Success", 
                    text: response.data.message 
                })
                if (onPostSuccess) onPostSuccess()
            } else {
                Swal.fire({ 
                    icon: "error", 
                    title: "Oops...", 
                    text: response.data.message 
                })
            }
        } catch (error) {
            Swal.close()
            Swal.fire({ 
                icon: "error", 
                title: "Oops...", 
                text: "Something went wrong!" 
            })
        }
    }

    return (
        <> 
            <button className={modal.manage_btn} data-bs-toggle="modal" data-bs-target={"#addModal"+ctx}><FontAwesomeIcon icon={faAdd}/> {getCleanTitleFromCtx(ctx)}</button>
            <div className="modal fade" id={"addModal"+ctx} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <AtomsText text_type="sub_heading" body={getCleanTitleFromCtx(ctx)}/>
                            <button type="button" className={modal.btn_close_modal} data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                        <div className="modal-body">
                            <OrganismsForm type={"single-line"} props={builder} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}