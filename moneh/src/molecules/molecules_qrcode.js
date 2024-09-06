import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import QRCode from 'qrcode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode, faXmark } from '@fortawesome/free-solid-svg-icons'
import AtomsText from '../atoms/atoms_text'

export default function MoleculesQrCode(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [qrCodeUrl, setQrCodeUrl] = useState('')

    useEffect(() => {
        const generateQR = async text => {
            try {
                const url = await QRCode.toDataURL(text)
                setQrCodeUrl(url)
                setIsLoaded(true)
            } catch (err) {
                console.error('Error generating QR code:', err)
                setError(err)
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong. Call the Admin!',
                    icon: 'error',
                })
                setIsLoaded(true)
            }
        }

        generateQR(props.val)
    }, [props.val])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <>
                <div className="text-center p-4">
                    <img src={qrCodeUrl} style={{width:'250px'}}/>
                    <div className='text-start mt-4'>
                        <AtomsText text_type="mini_sub_heading" body="How to Connect :"/>
                        <ol>
                            <li>Open your <b>Telegram</b> Apps</li>
                            <li>Search and chat with Bot <b>@MonehAppBot</b> or click this link <a href='https://t.me/MonehAppBot'>t.me/MonehAppBot</a></li>
                            <li>Capture and Send this QR to chat box</li>
                        </ol>
                    </div>
                </div>
            </>
        )
    }
}
