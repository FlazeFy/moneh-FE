import React from 'react'
import { useState, useEffect } from "react"
import AtomsText from '../../../atoms/atoms_text'

// Component
import MoleculesChartPie from '../../../molecules/molecules_chart_pie'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import MoleculesEmptyMsg from '../../../molecules/molecules_empty_msg'
import Swal from 'sweetalert2'

export default function GetTotalPocketByType({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const filter_name = "Pockets_Type"
    const [dataStatus, setDataStatus] = useState(null)
    const keyLimit = sessionStorage.getItem(`Pie_limit_${filter_name}`)
    if(keyLimit == null){
        sessionStorage.setItem(`Pie_limit_${filter_name}`, 5);
    }

    useEffect(() => {
        fetchTotalPocketByType()
    },[])

    const fetchTotalPocketByType = () => {
        fetch(`http://127.0.0.1:1323/api/v1/stats/pockettype/desc`)
        .then(res => {
            if(!res.ok){
                throw new Error(`Something went wrong!`)
            }
            return res.json()
        })
        .then(result => {
            setIsLoaded(true)
            setItems(result.data)
            setDataStatus(null)

            storeLocal(ctx + "_sess", JSON.stringify(result.data))
        })
        .catch(error => {
            setIsLoaded(true)
            if (getLocal(ctx + "_sess")) {
                setError(null)
                setDataStatus(<>This is a <b>local data</b> of <b>{getCleanTitleFromCtx(ctx)}</b>. We will fetch a new data when we succeed in contacting the server</>)
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "Something went wrong! But we still have recovered data to show you",
                });
                setItems(JSON.parse(getLocal(ctx + "_sess")))
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
                setError(error)
            }
        });
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
                {
                    dataStatus && <MoleculesAlertBox message={dataStatus} type='warning' context={ctx}/>
                }
                {
                    items ? 
                        <MoleculesChartPie items={items} filter_name={null} is_currency={true}/>  
                    :
                        <MoleculesEmptyMsg is_with_image={true} body="Not have data to present"/>                        
                }
            </>
        )
    }
}
  