import React from 'react'
import { useState, useEffect } from "react"
import AtomsText from '../../../atoms/atoms_text'
import { getCleanTitleFromCtx, ucFirstWord } from '../../../modules/helpers/converter'
import { getLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import MoleculesButtonCustomIcon from '../../../molecules/molecules_button_custom_icon'
import MoleculesCurrency from '../../../molecules/molecules_currency'
import MoleculesSummaryBox from '../../../molecules/molecules_summary_box'

export default function GetSummaryWishlist({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const keyToken = getLocal("token_key")

    useEffect(() => {
        fetchSummary()
    },[])

    const fetchSummary = () => {
        fetch(`http://127.0.0.1:1323/api/v1/wishlists/summary`, {
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
            <> 
                <h2 className='my-4'>{getCleanTitleFromCtx(ctx)}</h2>
                <div className='row'>
                    {
                        items.map((val, idx) => {
                            return (
                                <>
                                    <div className='col-lg-4 col-md-4 col-sm-12 pb-4'>
                                        <MoleculesSummaryBox title="Average Price" value={<MoleculesCurrency val={val['average']}/>}/>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-12 pb-4'>
                                        <MoleculesSummaryBox title="Most Expensive" value={<>{<MoleculesCurrency val={val['most_expensive']}/>} - {ucFirstWord(val['most_expensive_name'])}</>}/>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-12 pb-4'>
                                        <MoleculesSummaryBox title="The Cheapest" value={<>{<MoleculesCurrency val={val['cheapest']}/>} - {ucFirstWord(val['cheapest_name'])}</>}/>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-12 pb-4'>
                                        <MoleculesSummaryBox title="Achieved / Total Item" value={<>{val['achieved']} / {val['total_item']}</>}/>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-12 pb-4'>
                                        <MoleculesSummaryBox title="Most Type" value={ucFirstWord(val['most_type'])}/>
                                    </div>
                                    <div className='col-lg-4 col-md-4 col-sm-12 pb-4'>
                                        <MoleculesSummaryBox title="Total Ammount" value={<MoleculesCurrency val={val['total_ammount']}/>}/>
                                    </div>
                                    <div className='col-lgl-4 col-md-4 col-sm-12'>
                                        <MoleculesButtonCustomIcon title="Wishlist" content="See Stats about your wishlist" img_url={'/assets/stats2.png'} url="/stats_wishlist"/>
                                    </div>
                                </>
                            );
                        })
                    }
                </div>
            </>
        )
    }
}