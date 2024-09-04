import React from 'react'
import { useState, useEffect } from "react"

// Component
import { ucFirstWord } from '../modules/helpers/converter'

// Modules
import { getLocal } from '../modules/storages/local'
import MoleculesAlertBox from './molecules_alert_box'

export default function MoleculesDropDownDctDynamic({elmt, url, ctx, act, change}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        if(Array.isArray(url)){
            setItems(url)
            setIsLoaded(true)
        } else {
            fetch(url)
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
            <select
                placeholder={elmt.placeholder}
                className={elmt.class + " w-100"} 
                onChange={change}
            >
                {
                    items.map((val, i, index) => {
                        return (
                            <option key={i}
                            selected={
                                act === val['dictionaries_name'] ?
                                    true
                                :
                                    false

                            }
                            defaultValue={val['dictionaries_name']}>{ucFirstWord(val['dictionaries_name'])}</option>
                        );
                    })
                }
            </select>
        )
    }
}