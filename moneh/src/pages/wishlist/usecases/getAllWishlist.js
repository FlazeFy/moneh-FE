import React from 'react'
import { useState, useEffect } from "react"
import style from './wishlists.module.css'

// Component
import { getCleanTitleFromCtx, numberToPrice, ucFirstWord } from '../../../modules/helpers/converter'

// Modules
import { getLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import OrganismsManageModal from '../../../organisms/organisms_manage'

export default function GetAllWishlist({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])

    useEffect(() => {
        //Default config
        const keyPage = sessionStorage.getItem("Table_Wishlist")
        const keyOrder = sessionStorage.getItem("Table_order_Wishlist")

        if(keyPage == null){
            sessionStorage.setItem("Table_Wishlist", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Wishlist", "asc");
        }

        fetch(`http://127.0.0.1:1323/api/v1/wishlists/headers/${keyOrder}?page=${keyPage}`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setMaxPage(result.data.last_page)
                setCurrPage(result.data.current_page)
                setItems(result.data.data)        
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

    const builder = [
        {
            column_name: "Type",
            object_name: "wishlists_type",
            extra_desc: null,
            type: 'select',
            class: 'form-control',
            label: 'Wishlist Type',
            placeholder: 'Type wishlist type',
            url: 'http://127.0.0.1:1323/api/v1/dct/wishlists_type?page=1'
        },
        {
            column_name: "Name",
            object_name: "wishlists_name",
            extra_desc: null,
            type: 'text',
            class: 'form-control',
            label: 'Wishlist Name',
            placeholder: 'Type wishlist name',
            is_required: true,
            is_obsecure: false,
            max: 75,
        },
        {
            column_name: "Description",
            object_name: "wishlists_desc",
            extra_desc: null,
            type: 'textarea',
            class: 'form-control',
            label: 'Wishlist Description',
            is_required: true,
            max: 500,
        },
        {
            column_name: "Price",
            object_name: "wishlists_price",
            extra_desc: null,
            type: 'number',
            class: 'form-control',
            label: 'Wishlist Price',
            placeholder: 'Type wishlist price',
            is_required: true,
            max: 36,
        },
        {
            column_name: "Priority",
            object_name: "wishlists_priority",
            extra_desc: null,
            type: 'select',
            class: 'form-control',
            label: 'Wishlist Priority',
            placeholder: 'Type wishlist priority',
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
            column_name: "Is Achieved",
            object_name: "is_achieved",
            class: 'form-check-input',
            label: 'Is Achieved',
        },
        {
            column_name: "Manage",
            object_name: null,
            extra_desc: null
        }
    ]

    const getPriorityColor = (val) => {
        if(val == "high"){
            return "text-danger"
        } else if(val == "med"){ 
            return "text-primary"
        } else if(val == "low"){ 
            return "text-success"
        }
    }

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
            <> 
                <h2 className='my-4'>{getCleanTitleFromCtx(ctx)}</h2>
                <div className='row'>
                    {
                        items.map((val, idx) => {
                            return (
                                <div className='col-lg-4 col-md-6 col-sm-12 col-12' key={idx}>
                                    <OrganismsManageModal builder={builder} items={val} id={idx} is_with_btn={false}/>
                                    <div className='col-4'>
                                        <button className={style.wish_box} data-bs-toggle="modal" data-bs-target={"#manageModal"+idx}>
                                            <img className={style.wish_img} src={val['wishlists_img_url']}/>
                                            <h4 className='mt-3'>{val['wishlists_name']}</h4>
                                            <p>{val['wishlists_desc']}</p>
                                            <div className='row'>
                                                <div className='col-4 text-start'>
                                                    <p className='my-0' style={{fontSize:"var(--textMD)"}}>Price</p>
                                                    <h5>{numberToPrice(val['wishlists_price'])}</h5>
                                                </div>
                                                <div className='col-4'>
                                                    <p className='my-0' style={{fontSize:"var(--textMD)"}}>Type</p>
                                                    <h5>{ucFirstWord(val['wishlists_type'])}</h5>
                                                </div>
                                                <div className='col-4'>
                                                    <p className='my-0' style={{fontSize:"var(--textMD)"}}>Priority</p>
                                                    <h5 className={getPriorityColor(val['wishlists_priority'])}>{ucFirstWord(val['wishlists_priority'])}</h5>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </>
        )
    }
}