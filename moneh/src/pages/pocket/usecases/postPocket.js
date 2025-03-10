import React, { useState } from "react"
import Axios from 'axios'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'
import modal from '../../../organisms/organisms.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons"
import OrganismsForm from "../../../organisms/organisms_form"
import Swal from "sweetalert2"
import AtomsText from "../../../atoms/atoms_text"
import { getLocal } from "../../../modules/storages/local"

export default function PostPocket({ctx,onPostSuccess}) {
    //Initial variable
    const [pocketName, setPocketName] = useState("")
    const [pocketDesc, setPocketDesc] = useState("")
    const [pocketType, setPocketType] = useState("")
    const [pocketLimit, setPocketLimit] = useState(0)

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
        },
        {
            type: 'select',
            class: 'form-control',
            label: 'Pocket Type',
            placeholder: 'Select pocket type',
            handleChange: (event) => {
                setPocketType(event.target.value)
            },
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
        try {
            const data = new FormData();
            const keyToken = getLocal("token_key")

            data.append('pockets_name', pocketName);
            data.append('pockets_desc', pocketDesc);
            data.append('pockets_type', pocketType);
            data.append('pockets_limit', pocketLimit);
            
            const response = await Axios.post("http://127.0.0.1:1323/api/v1/pockets", data, {
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
                        <div className="modal-header d-flex justify-content-between">
                            <AtomsText text_type="sub_heading" body={getCleanTitleFromCtx(ctx)}/>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
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