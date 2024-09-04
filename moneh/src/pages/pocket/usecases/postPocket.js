import React, { useState } from "react"
import Axios from 'axios'

// Component
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'
import modal from '../../../organisms/organisms.module.css'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons"
import OrganismsForm from "../../../organisms/organisms_form"
import Swal from "sweetalert2"
import AtomsText from "../../../atoms/atoms_text"

export default function PostPocket({ctx,onPostSuccess}) {
    //Initial variable
    const [pocketName, setPocketName] = useState("")
    const [pocketDesc, setPocketDesc] = useState("")
    const [pocketType, setPocketType] = useState("")
    const [pocketLimit, setPocketLimit] = useState(0)

    const [resMsgPocketName, setResMsgPocketName] = useState("")
    const [resMsgPocketDesc, setResMsgPocketDesc] = useState("")
    const [resMsgPocketType, setResMsgPocketType] = useState("")
    const [resMsgPocketLimit, setResMsgPockeLimit] = useState("")
    const [resMsgAll, setResMsgAll] = useState("")

    const builder = [
        {
            type: 'text',
            class: 'form-control',
            label: 'Pocket Name',
            placeholder: 'Type pocket name',
            is_required: true,
            is_obsecure: false,
            max: 144,
            handleChange: (event) => {
                setPocketName(event.target.value)
            },
            errorMsg: resMsgPocketName
        },
        {
            type: 'textarea',
            class: 'form-control',
            label: 'Pocket Description',
            placeholder: 'Type pocket description',
            is_required: true,
            is_obsecure: false,
            line: 4,
            max: 144,
            handleChange: (event) => {
                setPocketDesc(event.target.value)
            },
            errorMsg: resMsgPocketDesc
        },
        {
            type: 'select',
            class: 'form-control',
            label: 'Pocket Type',
            placeholder: 'Select pocket type',
            handleChange: (event) => {
                setPocketType(event.target.value)
            },
            errorMsg: resMsgPocketType,
            url: 'http://127.0.0.1:1323/api/v1/dct/pockets_type?page=1'
        },
        {
            type: 'number',
            class: 'form-control',
            label: 'Pocket Bottom Limit',
            placeholder: 'Type pocket limit',
            is_required: true,
            max: 36,
            handleChange: (event) => {
                setPocketLimit(event.target.value)
            },
            errorMsg: resMsgPocketLimit,
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
            data.append('pockets_name', pocketName);
            data.append('pockets_desc', pocketDesc);
            data.append('pockets_type', pocketType);
            data.append('pockets_limit', pocketLimit);
            
            const response = await Axios.post("http://127.0.0.1:1323/api/v1/pockets", data, {
                headers: {
                  'Content-Type': 'multipart/form-data'
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