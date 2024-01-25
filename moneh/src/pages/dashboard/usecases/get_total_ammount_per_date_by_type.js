import React from 'react'
import { useState, useEffect } from "react"

// Component
import GetLineChart from '../../../components/charts/line_chart'
import GetLabel from '../../../components/labels/label'
import GetDropDownDctDynamic from '../../../components/others/dropdown'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Components
import GetBreakLine from '../../../components/others/breakLine'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetTotalAmmountPerDateByType({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    const [resMsgFlowType, setResMsgFlowType] = useState("")
    const [resMsgAll, setResMsgAll] = useState("")

    //Default config
    const keyType = sessionStorage.getItem("flow_type")
    const keyView = sessionStorage.getItem("flow_total_ammount_view")

    useEffect(() => {
        if(keyType == null){
            sessionStorage.setItem("flow_type", "income");
        }
        fetch(`http://127.0.0.1:1323/api/v1/flows/dateammount/${keyType}/${keyView}`)
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

    const builder_flow_type = 
        {
            type: 'select',
            class: 'form-control',
            label: 'Flow Type',
            placeholder: 'Type flow type',
            maxLength: 75,
            handleChange: (event) => {
                sessionStorage.setItem("flow_type", event.target.value)
                window.location.reload(false)
            },
            errorMsg: resMsgFlowType,
            url: [
                {
                    "dictionaries_name": "spending"
                },
                {
                    "dictionaries_name": "income"
                }
            ],
            active: keyType
        }

        const builder_flow_view = 
        {
            type: 'select',
            class: 'form-control',
            label: 'Flow View',
            placeholder: 'Type flow view',
            maxLength: 75,
            handleChange: (event) => {
                sessionStorage.setItem("flow_total_ammount_view", event.target.value)
                window.location.reload(false)
            },
            errorMsg: resMsgFlowType,
            url: [
                {
                    "dictionaries_name": "Date"
                },
                {
                    "dictionaries_name": "Month"
                },
                {
                    "dictionaries_name": "Year"
                }
            ],
            active: keyType
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
                <h2>{getCleanTitleFromCtx(ctx)}</h2>
                <div className='row'>
                    <div className='col'>
                        <GetLabel type="input" title="Flow Type"/>
                        <GetBreakLine length={1}/>
                        <GetDropDownDctDynamic url={builder_flow_type['url']} elmt={builder_flow_type} change={builder_flow_type['handleChange']} act={keyType} ctx="dropdown"/>
                    </div>
                    <div className='col'>
                        <GetLabel type="input" title="View"/>
                        <GetBreakLine length={1}/>
                        <GetDropDownDctDynamic url={builder_flow_view['url']} elmt={builder_flow_view} change={builder_flow_view['handleChange']} act={keyView} ctx="dropdown"/>
                    </div>
                </div>
                <GetLineChart items={items} filter_name={null}/>  
            </>
        )
    }
}
  