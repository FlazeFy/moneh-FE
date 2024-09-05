import React, {  useState } from "react"
import modal from './organisms.module.css'
import Axios from "axios"

// Modules
import MoleculesDropDownDctDynamic from "../molecules/molecules_dropdown_dct_dynamic"

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons"
import AtomsBreakLine from "../atoms/atoms_breakline"
import AtomsText from "../atoms/atoms_text"
import { countHalf } from "../modules/helpers/math"
import Swal from "sweetalert2"

export default function OrganismsManageModal({builder, items, id, funDel, funPut, is_with_btn, onPostSuccess}) {
    const [resMsgAll, setResMsgAll] = useState("")
    const [objectUpdate, setObjectUpdate] = useState([])

    // Services
    const HandlePut = async (e) => {
        e.preventDefault()
        Swal.showLoading()
        try {
            const data = new FormData();
            {
                builder.map((build, j, ins) => {
                    if(build['object_name'] != null && build['object_name'] != "period"){
                        return data.append(build['object_name'], objectUpdate[build['object_name']]);
                    }
                })
            }
            const response = await Axios.put(funPut, data, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })

            Swal.close()
            if(response.data.status == 200){
                Swal.fire({ 
                    icon: "success", 
                    title: "Success", 
                    text: response.data.message 
                })
                if(onPostSuccess) onPostSuccess()
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
            setResMsgAll(error)
        }
    }

    return (
        <>
            {
                is_with_btn ?
                    <button className={modal.manage_btn} data-bs-toggle="modal" data-bs-target={"#manageModal"+id}><FontAwesomeIcon icon={faEdit}/></button>
                :
                    <></>
            }
            <div className="modal fade" id={"manageModal"+id} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <AtomsText text_type="sub_heading" body="Manage"/>
                            <button type="button" className={modal.btn_close_modal} data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                        <div className="modal-body">
                            {
                                builder.map((build, idx) => {
                                    if(build['object_name'] != null && build['object_name'] != "period"){
                                        if (build['type'] === 'text' || build['type'] === 'number' || build['type'] === 'range') {
                                            return (
                                                <div key={idx}>
                                                    <AtomsText text_type="main_content" body={build['column_name']}/>
                                                    {
                                                        build['type'] === 'range' ?
                                                        <input placeholder={build['placeholder']}
                                                            className='form-control mb-2' onChange={(e) => {setObjectUpdate({...objectUpdate, [build['object_name']]: e.target.value})}} 
                                                            defaultValue={countHalf(build['max'])}
                                                            type={build['type']}
                                                            max={build['max']}
                                                            min={build['min']}
                                                        />
                                                    :
                                                        <input className='form-control mb-2' onChange={(e) => {setObjectUpdate({...objectUpdate, [build['object_name']]: e.target.value})}} 
                                                            defaultValue={items[build['object_name']]}
                                                            type={build['type']} placeholder={build['placeholder']}
                                                        ></input>
                                                    }
                                                </div>
                                            )
                                        } else if (build['type'] === 'textarea') {
                                            return (
                                                <div key={idx}>
                                                    <AtomsText text_type="main_content" body={build['column_name']}/>
                                                    <textarea className="form-control w-100" rows={build['line']} onChange={(e) => {setObjectUpdate({...objectUpdate, [build['object_name']]: e.target.value})}} defaultValue={items[build['object_name']]}></textarea>
                                                </div>
                                            )
                                        } else if (build['type'] === 'upload') {
                                            return (
                                                <div key={idx}>
                                                    <AtomsBreakLine length={2}/>
                                                </div>
                                            )
                                        } else if (build['type'] === 'select') {
                                            return (
                                                <div key={idx}>
                                                    <AtomsText text_type="main_content" body={build['column_name']}/>
                                                    <MoleculesDropDownDctDynamic url={build['url']} elmt={build} ctx="dropdown" act={items[build['object_name']]} 
                                                        change={(e) => {setObjectUpdate({...objectUpdate, [build['object_name']]: e.target.value})}}/>
                                                </div>
                                            )
                                        } else if (build['type'] === 'checkbox') {
                                            return (
                                                <div className="form-check ms-3" key={idx}>
                                                    <input className='form-check-input mb-2' type={build['type']} checked={items[build['object_name']] == 1 ? true : false}
                                                        onChange={(e) => {setObjectUpdate({...objectUpdate, [build['object_name']]: e.target.value})}}></input>
                                                    <AtomsText text_type="form_label" body={build['column_name']}/>
                                                </div>
                                            )
                                        } else if (build['type'] === 'tag') {

                                        }
                                    }
                                })
                            }
                        </div>
                        <div className="modal-footer">
                            <button onClick={funDel} className="btn btn-danger">Delete</button>
                            <button onClick={HandlePut} type="button" className="btn btn-success">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
  