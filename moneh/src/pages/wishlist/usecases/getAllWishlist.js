import React from 'react'
import { useState, useEffect } from "react"
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'
import { getLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import OrganismsWishlistBox from '../../../organisms/organisms_wishlist_box'

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
        const keyToken = getLocal("token_key")

        if(keyPage == null){
            sessionStorage.setItem("Table_Wishlist", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Wishlist", "asc");
        }

        fetch(`http://127.0.0.1:1323/api/v1/wishlists/headers/${keyOrder}?page=${keyPage}`, {
            headers: {
                Authorization: `Bearer ${keyToken}`
            }
        })
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
                        items.map((dt, idx) => {
                            return (
                                <div className='col-lg-3 col-md-4 col-sm-6 col-12' key={idx}>
                                    <OrganismsWishlistBox idx={idx} val={dt}/>
                                </div>
                            );
                        })
                    }
                </div>
            </>
        )
    }
}