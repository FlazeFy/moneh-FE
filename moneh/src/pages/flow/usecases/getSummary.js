import React from 'react'
import { useState, useEffect } from "react"

// Component
import GetGeneralTable from '../../../components/table/general_table'
import { getCleanTitleFromCtx, numberToPrice } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetSummary({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/flows/summary/spending`)
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
                <h2 className='mt-4'>{getCleanTitleFromCtx(ctx)}</h2>
                {
                    items.map((val, i, index) => {
                        return (
                            <div className='row text-center'>
                                <div className='col-lg-4 col-md-4 col-sm-12'>
                                    <h4> Average</h4>
                                    <h5 className='text-white'>{numberToPrice(val['average'])}</h5>
                                    <hr className='text-white'></hr>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-12'>
                                    <h4>Total Item</h4>
                                    <h5 className='text-white'>{numberToPrice(val['total_item'])}</h5>
                                    <hr className='text-white'></hr>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-12'>
                                    <h4>Total Ammount</h4>
                                    <h5 className='text-white'>{numberToPrice(val['total_ammount'])}</h5>
                                    <hr className='text-white'></hr>
                                </div>
                            </div>
                        );
                    })
                }
            </>
        )
    }
}