import React from 'react'
import { useState, useEffect } from "react"

// Component
import MoleculesChartLine from '../../../molecules/molecules_chart_line'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Components
import AtomsBreakLine from '../../../atoms/atoms_breakline'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'
import AtomsText from '../../../atoms/atoms_text'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import MoleculesDropDownDctDynamic from '../../../molecules/molecules_dropdown_dct_dynamic'
import MoleculesEmptyMsg from '../../../molecules/molecules_empty_msg'
import Swal from 'sweetalert2'

export default function GetTotalAmmountPerDateByType({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [dataStatus, setDataStatus] = useState(null)
    const keyType = sessionStorage.getItem("flow_type")
    const keyView = sessionStorage.getItem("flow_total_ammount_view")
    const keyToken = getLocal("token_key")

    useEffect(() => {
        fetchTotalAmmountPerDateByType()
    },[])

    const fetchTotalAmmountPerDateByType = () => {
        if(keyType == null){
            sessionStorage.setItem("flow_type", "income");
        }
        if(keyView == null){
            sessionStorage.setItem("flow_total_ammount_view", "date");
        }

        fetch(`http://127.0.0.1:1323/api/v1/flows/dateammount/${keyType}/${keyView}`, {
            headers: {
                Authorization: `Bearer ${keyToken}`
            }
        })
        .then(res => {
            if (!res.ok) {
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
                <div className='row'>
                    <div className='col'>
                        <AtomsText text_type="form_label" body="Flow Type"/>
                        <AtomsBreakLine length={1}/>
                        <MoleculesDropDownDctDynamic url={builder_flow_type['url']} elmt={builder_flow_type} change={builder_flow_type['handleChange']} act={keyType} ctx="dropdown"/>
                    </div>
                    <div className='col'>
                        <AtomsText text_type="form_label" body="View"/>
                        <AtomsBreakLine length={1}/>
                        <MoleculesDropDownDctDynamic url={builder_flow_view['url']} elmt={builder_flow_view} change={builder_flow_view['handleChange']} act={keyView} ctx="dropdown"/>
                    </div>
                </div>
                {
                    dataStatus && <MoleculesAlertBox message={dataStatus} type='warning' context={ctx}/>
                }
                {
                    items ? 
                        <MoleculesChartLine items={items} filter_name={null}/>  
                    :
                        <MoleculesEmptyMsg is_with_image={true} body="Not have data to present"/>
                        
                }
            </>
        )
    }
}
  