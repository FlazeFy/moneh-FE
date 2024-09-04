import React from 'react'
import { useState, useEffect } from "react"

// Component
import MoleculesChartLine from '../../../molecules/molecules_chart_line'
import GetDropDownDctDynamic from '../../../components/others/dropdown'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Components
import AtomsBreakLine from '../../../atoms/atoms_breakline'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'
import AtomsText from '../../../atoms/atoms_text'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'

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
        if(keyView == null){
            sessionStorage.setItem("flow_total_ammount_view", "date");
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
            max: 75,
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
            max: 75,
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
                <div className='row'>
                    <div className='col'>
                        <AtomsText text_type="form_label" body="Flow Type"/>
                        <AtomsBreakLine length={1}/>
                        <GetDropDownDctDynamic url={builder_flow_type['url']} elmt={builder_flow_type} change={builder_flow_type['handleChange']} act={keyType} ctx="dropdown"/>
                    </div>
                    <div className='col'>
                        <AtomsText text_type="form_label" body="View"/>
                        <AtomsBreakLine length={1}/>
                        <GetDropDownDctDynamic url={builder_flow_view['url']} elmt={builder_flow_view} change={builder_flow_view['handleChange']} act={keyView} ctx="dropdown"/>
                    </div>
                </div>
                <MoleculesChartLine items={items} filter_name={null}/>  
            </>
        )
    }
}
  