import React from 'react'
import { useState, useEffect } from "react"
import AtomsText from '../../../atoms/atoms_text'

// Component
import { getCleanTitleFromCtx, numberToPrice, ucFirstWord } from '../../../modules/helpers/converter'

// Modules
import { getLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import MoleculesCurrency from '../../../molecules/molecules_currency'

export default function GetSummaryWishlist({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/wishlists/summary`)
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
                        items.map((val, idx) => {
                            return (
                                <div key={idx}>
                                    <AtomsText text_type="sub_heading" body="Average Price"/>
                                    <h5 className='text-white'>{<MoleculesCurrency val={val['average']}/>}</h5>
                                    <hr className='text-white'></hr>

                                    <AtomsText text_type="sub_heading" body="Most Expensive"/>
                                    <h5 className='text-white'>{<MoleculesCurrency val={val['most_expensive']}/>} - {ucFirstWord(val['most_expensive_name'])}</h5>
                                    <hr className='text-white'></hr>

                                    <AtomsText text_type="sub_heading" body="The Cheapest"/>
                                    <h5 className='text-white'>{<MoleculesCurrency val={val['cheapest']}/>} - {ucFirstWord(val['cheapest_name'])}</h5>
                                    <hr className='text-white'></hr>

                                    <AtomsText text_type="sub_heading" body="Achieved / Total Item"/>
                                    <h5 className='text-white'>{val['achieved']} / {val['total_item']}</h5>
                                    <hr className='text-white'></hr>

                                    <AtomsText text_type="sub_heading" body="Most Type"/>
                                    <h5 className='text-white'>{ucFirstWord(val['most_type'])}</h5>
                                    <hr className='text-white'></hr>

                                    <AtomsText text_type="sub_heading" body="Total Ammount"/>
                                    <h5 className='text-white'>{<MoleculesCurrency val={val['total_ammount']}/>}</h5>
                                    <hr className='text-white'></hr>
                                </div>
                            );
                        })
                    }
                </div>
            </>
        )
    }
}