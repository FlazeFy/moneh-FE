import React from 'react'
import { useState, useEffect } from "react"

import GetDashboardBox from "../../../components/containers/dashboard_box";
import { getCleanTitleFromCtx } from "../../../modules/helpers/converter";
import { getLocal } from "../../../modules/storages/local";

export default function GetDashboardSummary({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/dashboard`)
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
                {
                    items.map((val, i, index) => {
                        return (
                            <div className="row" key={i}>
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <GetDashboardBox ctx="Last Income" value={val['last_income']} subvalue={val['last_income_value']} href="/flow"/>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <GetDashboardBox ctx="Last Spending" value={val['last_spending']} subvalue={val['last_spending_value']} href="/flow"/>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <GetDashboardBox ctx="Most Expensive Spending" value={val['most_expensive_spending']} subvalue={val['most_expensive_spending_value']} href="/flow"/>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <GetDashboardBox ctx="Most Highest Income" value={val['most_highest_income']} subvalue={val['most_highest_income_value']} href="/flow"/>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <GetDashboardBox ctx="Total Item (Income / Spending)" value={val['total_item_income'] + " / " + val['total_item_spending']} href="/flow"/>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <GetDashboardBox ctx="My Balance" value={val['my_balance']} href="/flow"/>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        );
    }
}