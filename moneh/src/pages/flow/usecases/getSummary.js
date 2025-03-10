import React from 'react'
import { useState, useEffect } from "react"
import AtomsText from '../../../atoms/atoms_text'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'
import { getLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import MoleculesCurrency from '../../../molecules/molecules_currency'

export default function GetSummary({ctx,shouldFetch}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const keyToken = getLocal("token_key")

    useEffect(() => {
        fetchSummary()
    }, [shouldFetch])

    const fetchSummary = () => {
        fetch(`http://127.0.0.1:1323/api/v1/flows/summary/spending`, {
            headers: {
                Authorization: `Bearer ${keyToken}`
            }
        })
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
            <div className='container'>
                <h2 className='mt-4'>{getCleanTitleFromCtx(ctx)}</h2>
                {
                    items.map((val, idx) => {
                        return (
                            <div className='row text-center' key={idx}>
                                <div className='col-lg-4 col-md-4 col-sm-12'>
                                    <AtomsText text_type="sub_heading" body="Average"/>
                                    <AtomsText text_type="mini_sub_heading" body={<MoleculesCurrency val={val['average']}/>}/>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-12'>
                                    <AtomsText text_type="sub_heading" body="Total Item"/>
                                    <AtomsText text_type="mini_sub_heading" body={<MoleculesCurrency val={val['total_item']}/>}/>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-12'>
                                    <AtomsText text_type="sub_heading" body="Total Ammount"/>
                                    <AtomsText text_type="mini_sub_heading" body={<MoleculesCurrency val={val['total_ammount']}/>}/>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}