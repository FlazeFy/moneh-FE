import React from 'react'
import { useState, useEffect } from "react"
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import Swal from 'sweetalert2'
import { getLocal } from '../../../modules/storages/local'
import OrganismsForm from '../../../organisms/organisms_form'

export default function GetMyProfile({ ctx, shouldFetch, onPostSuccess }) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItem] = useState([])
    const keyToken = getLocal("token_key")

    // State variables
    const [username, setUsername] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [telegramID, setTelegramID] = useState("")

    useEffect(() => {
        fetchProfile()
    }, [shouldFetch])

    const fetchProfile = () => {
        fetch(`http://127.0.0.1:1323/api/v1/user/my`, {
            headers: {
                Authorization: `Bearer ${keyToken}`
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true)
                if (result.status === 200 && result.data) {
                    setUsername(result.data.username || "")
                    setFname(result.data.first_name || "")
                    setLname(result.data.last_name || "")
                    setEmail(result.data.email || "")
                    setTelegramID(result.data.telegram_user_id || "")
                }
            },
            (error) => {
                setIsLoaded(true)
                Swal.fire({ 
                    icon: "error", 
                    title: "Oops...", 
                    text: "Something went wrong!" 
                })
            }
        )
    }

    const builder = [
        {
            type: 'text',
            class: 'form-control',
            label: 'Username',
            placeholder: 'Type username',
            is_required: true,
            is_obsecure: false,
            defaultValue: username,
            max: 36,
            handleChange: (event) => {
                setUsername(event.target.value)
            },
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'First Name',
            placeholder: 'Type first name',
            is_required: true,
            max: 75,
            defaultValue: fname,
            handleChange: (event) => {
                setFname(event.target.value)
            },
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'Last Name',
            placeholder: 'Type last name',
            is_required: true,
            max: 75,
            defaultValue: lname,
            handleChange: (event) => {
                setLname(event.target.value)
            },
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'Email',
            placeholder: 'Type email',
            is_required: true,
            max: 255,
            defaultValue: email,
            handleChange: (event) => {
                setEmail(event.target.value)
            },
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'Telegram ID',
            placeholder: 'Type telegram ID',
            is_required: true,
            max: 16,
            defaultValue: telegramID,
            handleChange: (event) => {
                setTelegramID(event.target.value)
            },
        },
        {
            type: 'submit',
            class: 'btn btn-success rounded-pill',
            label: 'Submit',
            placeholder: null,
            toogle_disabled: false,
            handleClick: (event) => {
                // handleSubmit(event)
            },
        }
    ]

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
            <div className='container'> 
                <h2 className='mt-4'>{getCleanTitleFromCtx(ctx)}</h2>
                <OrganismsForm type={"single-line"} props={builder} />
            </div>
        )
    }
}
