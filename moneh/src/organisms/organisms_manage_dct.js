import React from 'react'
import { useState, useEffect } from "react"
import modal from './organisms.module.css'
import Axios from "axios"
import { getCleanTitleFromCtx, ucFirstWord } from '../modules/helpers/converter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPaperPlane, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import { getLocal } from '../modules/storages/local'
import AtomsText from '../atoms/atoms_text'
import AtomsBreakLine from '../atoms/atoms_breakline'

export default function OrganismsManageDctModal({cls, ctx, fetchUrl, postUrl, deleteUrl, table, column}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [dctName, setDctName] = useState("")

    useEffect(() => {
        fetch(fetchUrl)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItems(result.data)        
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setItems(JSON.parse(getLocal(ctx + "_sess")))
                } else {
                    setIsLoaded(true)
                    setError(error)
                }
            }
        )
    },[])

    // Post dct
    const handleSubmit = async (e) => {
        try {
            const data = new FormData();
            data.append('dictionaries_type', ctx);
            data.append('dictionaries_name', dctName);
            
            const response = await Axios.post(postUrl, data, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            window.location.reload(false)

            if(response.data.status !== 200){
                return response.data.message
            } else {
                return ""
            }
        } catch (error) {
            //
        }
    }

     // Delete dct
     const handleDelete = async (e,id) => {
        try {
            const data = new FormData();
            
            const response = await Axios.delete(deleteUrl+id, data)
            window.location.reload(false)

            if(response.data.status !== 200){
                return response.data.message
            } else {
                return ""
            }
        } catch (error) {
            //
        }
    }

    return (
        <>
            <button className={modal.manage_btn + " " + cls} data-bs-toggle="modal" data-bs-target={"#manageModalDct"+ctx}><FontAwesomeIcon icon={faEdit}/> {getCleanTitleFromCtx(ctx)}</button>
            <div className="modal fade" id={"manageModalDct"+ctx} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <AtomsText text_type="sub_heading" body={<>Manage {getCleanTitleFromCtx(ctx)}</>}/>
                            <button type="button" className='btn btn-danger' data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col-lg-6 col-md-6 col-sm-12'>
                                    <AtomsText text_type="main_content" body="Dictionary Name"/>
                                    <input className='form-control my-2' onChange={(e) => setDctName(e.target.value)} type="text"></input>
                                    <button className={"btn btn-success rounded-pill mt-2 py-2 px-3"} 
                                        onClick={handleSubmit}>
                                        <FontAwesomeIcon icon={faPaperPlane} color="var(--secondaryBG)" onClick={handleSubmit}/> Submit
                                    </button>
                                    <AtomsBreakLine length={4}/>
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12'>
                                    <AtomsText text_type="main_content" body="List Dictionary"/>
                                    <ul>
                                    {
                                        items.map((val, idx) => {
                                            return (
                                                <div className='d-flex justify-content-between text-white mb-3' key={idx}>
                                                    <div className='pt-2'>
                                                        {ucFirstWord(val['dictionaries_name'])}
                                                    </div>
                                                    <div className=''>
                                                        <button className="btn btn-danger" onClick={(e) => handleDelete(e,val['id'])}><FontAwesomeIcon icon={faTrash} color="var(--secondaryBG)"/> </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    </ul>
                                </div>
                                <AtomsText text_type="form_error" body={ctx}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}