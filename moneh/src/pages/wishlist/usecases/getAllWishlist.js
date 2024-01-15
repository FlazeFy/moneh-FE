import React from 'react'
import { useState, useEffect } from "react"
import style from './wishlists.module.css'

// Component
import { getCleanTitleFromCtx, numberToPrice, ucFirstWord } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

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
        return <div><h2>{getCleanTitleFromCtx(ctx)}</h2> Error: {error.message}</div>
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
                        items.map((val, i, index) => {
                            return (
                                <div className='col-4'>
                                    <div className={style.wish_box}>
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