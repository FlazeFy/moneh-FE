import React from 'react'
import { useState, useEffect } from "react"
import AtomsText from '../atoms/atoms_text'

// Component
import MoleculesChartPie from '../molecules/molecules_chart_pie'
import { getCleanTitleFromCtx } from '../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../modules/storages/local'
import MoleculesAlertBox from '../molecules/molecules_alert_box'

export default function OrganismsTotalDctUsed({ctx, filter_name, table, column}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        //Default config
        const keyLimit = sessionStorage.getItem(`Pie_limit_${filter_name}`)
        if(keyLimit == null){
            sessionStorage.setItem(`Pie_limit_${filter_name}`, 5);
        }

        fetch(`http://127.0.0.1:1323/api/v1/stats/dctmod/${table}/${column}`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItems(result.data)
                const item = result.data
                storeLocal(ctx + "_sess",JSON.stringify(item))             
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
                <AtomsText text_type="main_heading" body={getCleanTitleFromCtx(ctx)}/>
                <MoleculesChartPie items={items} filter_name={null}/>  
            </>
        )
    }
}
  