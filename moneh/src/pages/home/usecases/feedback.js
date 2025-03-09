import React, { useState } from "react"
import Axios from 'axios'
import AtomsBreakLine from "../../../atoms/atoms_breakline"
import OrganismsForm from "../../../organisms/organisms_form"
import AtomsText from "../../../atoms/atoms_text"

export default function PostFeedback({ctx}) {
    //Initial variable
    const [feedbackRate, setFeedbackRate] = useState(0)
    const [feedbackDesc, setFeedbackDesc] = useState("")

    const builder = [
        {
            type: 'range',
            class: 'form-control',
            label: 'Rate',
            placeholder: 'Choose feedback rate',
            is_required: true,
            max: 10,
            min: 1,
            handleChange: (event) => {
                setFeedbackRate(event.target.value)
            },
        },
        {
            type: 'textarea',
            class: 'form-control',
            label: 'Description',
            placeholder: 'Type feedback description',
            is_required: true,
            is_obsecure: false,
            line: 4,
            max: 500,
            handleChange: (event) => {
                setFeedbackDesc(event.target.value)
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
            data.append('feedbacks_rate', feedbackRate);
            data.append('feedbacks_desc', feedbackDesc);
            
            const response = await Axios.post("http://127.0.0.1:1323/api/v1/feedbacks", data, {
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

    return (
        <>
            <AtomsBreakLine length={3}/>
            <div className='mt-4 text-center row mx-auto' id={ctx} style={{maxWidth:"1080px"}}>
                <div className='col-lgl-6 col-md-6 col-sm-12 col-12 px-3 d-flex flex-column justify-content-center'>
                    <AtomsBreakLine length={5}/>
                    <AtomsText text_type="main_heading" body="SEND FEEDBACK" class="text-primary"/>
                    <hr></hr>
                    <h6 style={{fontSize:"var(--textJumbo)"}}>This app is still at development, so your feedback will be very helpfull</h6>
                </div> 
                <div className='col-lgl-6 col-md-6 col-sm-12 col-12'>
                    <AtomsBreakLine length={3}/>
                    <div className='container'>
                        <OrganismsForm type={"single-line"} props={builder} />
                    </div>
                </div> 
            </div>
            <AtomsBreakLine length={5}/>
        </>
    )
}