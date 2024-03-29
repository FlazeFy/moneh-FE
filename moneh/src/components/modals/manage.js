import React, { useEffect, useState } from "react"
import modal from './modals.module.css'
import Axios from "axios"

// Modules
import GetDropDownDctDynamic from "../others/dropdown"
import { countHalf } from "../../modules/helpers/math"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons"
import GetBreakLine from "../others/breakLine"
import GetLabel from "../labels/label"

export default function GetManageModal({builder, items, id, funDel, funPut, is_with_btn}) {
    const [resMsgAll, setResMsgAll] = useState("")
    const [objectUpdate, setObjectUpdate] = useState([])

    // Services
    const HandlePut = async (e) => {

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
                            <h5 className="modal-title" id="exampleModalLabel">Manage</h5>
                            <button type="button" className={modal.btn_close_modal} data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                        <div className="modal-body">
                            {
                                builder.map((build, j, ins) => {
                                    if(build['object_name'] != null && build['object_name'] != "period"){
                                        if (build['type'] === 'text' || build['type'] === 'number' || build['type'] === 'range') {
                                            return (
                                                <div key={j}>
                                                    <label className='form-lable'>{build['column_name']}</label>
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
                                                <>
                                                    <label className='form-lable'>{build['column_name']}</label>
                                                    <textarea className="form-control w-100" rows={build['line']} onChange={(e) => {setObjectUpdate({...objectUpdate, [build['object_name']]: e.target.value})}} >{items[build['object_name']]}</textarea>
                                                </>
                                            )
                                        } else if (build['type'] === 'upload') {
                                            return (
                                                <>
                                                    <GetBreakLine length={2}/>

                                                </>
                                            )
                                        } else if (build['type'] === 'select') {
                                            return (
                                                <>
                                                    <label className='form-lable'>{build['column_name']}</label>
                                                    <GetDropDownDctDynamic url={build['url']} elmt={build} ctx="dropdown" act={items[build['object_name']]} 
                                                        change={(e) => {setObjectUpdate({...objectUpdate, [build['object_name']]: e.target.value})}}/>
                                                </>
                                            )
                                        } else if (build['type'] === 'checkbox') {
                                            return (
                                                <div class="form-check ms-3">
                                                    <input className='form-check-input mb-2' type={build['type']} checked={items[build['object_name']] == 1 ? true : false}
                                                        onChange={(e) => {setObjectUpdate({...objectUpdate, [build['object_name']]: e.target.value})}}></input>
                                                    {/* <label className='form-lable'>{build['column_name']}</label> */}
                                                    <GetLabel title={build['column_name']} type="input"/>
                                                </div>
                                            )
                                        } else if (build['type'] === 'tag') {

                                        }
                                    }
                                })
                            }
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-dismiss="modal" data-bs-target={"#deleteModal"+id}>Delete</button>
                            <div className="modal fade" id={"deleteModal"+id}  aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Delete data</h5>
                                            <button type="button" className="btn-close-modal" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure want to delete this data?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button onClick={deleteAnimal} className="btn btn-danger">Delete</button>
                                            <button type="button" className="btn btn-primary">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <button onClick={funDel} className="btn btn-danger">Delete</button>
                            <button onClick={HandlePut} type="button" className="btn btn-success">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
  