import Axios from 'axios'
import { useState } from 'react'
import { storeLocal } from '../../../modules/storages/local'
import OrganismsForm from '../../../organisms/organisms_form'

export default function PostLogin() {
    //Initial variable
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const builder = [
        {
            type: 'text',
            class: 'form-control',
            label: 'Username',
            placeholder: 'Type username',
            is_required: true,
            is_obsecure: false,
            max: 36,
            handleChange: (event) => {
                setUsername(event.target.value)
            },
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'Password',
            placeholder: 'Type password',
            is_required: true,
            is_obsecure: true,
            max: 36,
            handleChange: (event) => {
                setPassword(event.target.value)
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
            data.append('username', username);
            data.append('password', password);
            
            const response = await Axios.post("http://127.0.0.1:1323/api/v1/login", data, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            if(response.status !== 200){
                window.location.reload(false)
                return response.data.message
            } else {
                const data = response.data.data
                storeLocal('username_key', username)
                storeLocal('token_key', data.token)
                window.location.href = '/'
            }
        } catch (error) {
            //
        }
    }

    return (
        <div className='login-box grid-border' style={{width:"720px"}}> 
            <img src="/assets/pocket.png" style={{maxWidth:"50%", minWidth:"300px"}} className="img img-fluid mb-3"/>
            <h3 className='text-white'>Start Saving Money, Join <b style={{color:"var(--primaryColor)"}}>MONEH</b></h3>
            <OrganismsForm type={"single-line"} props={builder} />
        </div>
    )
}