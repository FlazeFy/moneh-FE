import Axios from 'axios'
import React, { useState } from "react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"

// Component
import { getBoolCheck, getCleanTitleFromCtx } from '../../../modules/helpers/converter'
import modal from '../../../organisms/organisms.module.css'
import { storage } from "../../../modules/configs/firebase"

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons"
import OrganismsForm from '../../../organisms/organisms_form'

export default function PostWishlist({ctx}) {
    //Initial variable
    const [wishlistName, setWishlistName] = useState("")
    const [wishlistDesc, setWishlistDesc] = useState("")
    const [wishlistImgUrl, setWishlistImgUrl] = useState("")
    const [wishlistType, setWishlistType] = useState("")
    const [wishlistPriority, setWishlistPriority] = useState("")
    const [wishlistPrice, setWishlistPrice] = useState(0)
    const [isAchieved, setIsAchieved] = useState(false)

    const [resMsgWishlistName, setResMsgWishlistName] = useState("")
    const [resMsgWishlistDesc, setResMsgWishlistDesc] = useState("")
    const [resMsgWishlistImgUrl, setResMsgWishlistImgUrl] = useState("")
    const [resMsgWishlistType, setResMsgWishlistType] = useState("")
    const [resMsgWishlistPriority, setResMsgWishlistPriority] = useState("")
    const [resMsgWishlistPrice, setResMsgWishlistPrice] = useState("")
    const [resMsgIsAchieved, setResMsgIsAchieved] = useState("")
    const [resMsgAll, setResMsgAll] = useState("")

    const builder = [
        {
            type: 'upload',
            class: 'form-control',
            label: 'Wishlist Image',
            placeholder: 'Type wishlist image',
            is_required: true,
            is_obsecure: false,
            max: 75,
            handleChange: (event) => {
                event = event.target.files[0]

                if (event == null) return;
                    const imageRef = ref(storage, `${event.name + v4()}`);
                    uploadBytes(imageRef, event).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((url) => {
                            setWishlistImgUrl(url);
                        }
                    );
                });
            },
            errorMsg: resMsgWishlistImgUrl,
            // url: galUrl
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'Wishlist Name',
            placeholder: 'Type wishlist name',
            is_required: true,
            is_obsecure: false,
            max: 75,
            handleChange: (event) => {
                setWishlistName(event.target.value)
            },
            errorMsg: resMsgWishlistName
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'Wishlist Description',
            is_required: true,
            max: 144,
            handleChange: (event) => {
                setWishlistDesc(event.target.value)
            },
            errorMsg: resMsgWishlistDesc,
        },
        {
            type: 'number',
            class: 'form-control',
            label: 'Wishlist Price',
            placeholder: 'Type wishlist price',
            is_required: true,
            max: 12,
            handleChange: (event) => {
                setWishlistPrice(event.target.value)
            },
            errorMsg: resMsgWishlistPrice,
        },
        {
            type: 'select',
            class: 'form-control',
            label: 'Wishlist Type',
            placeholder: 'Type wishlist type',
            is_required: true,
            is_obsecure: false,
            max: 75,
            handleChange: (event) => {
                setWishlistType(event.target.value)
            },
            errorMsg: resMsgWishlistType,
            url: "http://127.0.0.1:1323/api/v1/dct/wishlists_type?page=1"
        },
        {
            type: 'select',
            class: 'form-control',
            label: 'Wishlist Priority',
            placeholder: 'Type wishlist priority',
            is_required: true,
            is_obsecure: false,
            max: 75,
            handleChange: (event) => {
                setWishlistPriority(event.target.value)
            },
            errorMsg: resMsgWishlistPriority,
            url: [
                {
                    "dictionaries_name": "high"
                },
                {
                    "dictionaries_name": "medium"
                },
                {
                    "dictionaries_name": "low"
                }
            ],
        },
        {
            type: 'checkbox',
            class: 'form-check-input',
            label: 'Is Achieved',
            handleChange: (event) => {
                setIsAchieved(getBoolCheck(event.target.value))
            },
            errorMsg: resMsgIsAchieved,
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
            data.append('wishlists_name', wishlistName);
            data.append('wishlists_desc', wishlistDesc);
            data.append('wishlists_img_url', wishlistImgUrl);
            data.append('wishlists_type', wishlistType);
            data.append('wishlists_priority', wishlistPriority);
            data.append('wishlists_price', wishlistPrice);
            data.append('is_achieved', isAchieved);
            
            const response = await Axios.post("http://127.0.0.1:1323/api/v1/wishlists", data, {
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
            <button className={modal.manage_btn + " w-100"} data-bs-toggle="modal" data-bs-target={"#addModal"+ctx}><FontAwesomeIcon icon={faAdd}/> {getCleanTitleFromCtx(ctx)}</button>
            <div className="modal fade" id={"addModal"+ctx} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{getCleanTitleFromCtx(ctx)}</h5>
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