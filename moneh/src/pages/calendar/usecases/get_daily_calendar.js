import React from 'react'
import { useState, useEffect } from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { getTodayDate } from '../../../modules/helpers/generator'
import { getLocal, storeLocal } from '../../../modules/storages/local'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'

export default function GetDailyCalendar({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [month, setCurrentMonth] = useState(getTodayDate('month'))
    const [year, setCurrentYear] = useState(getTodayDate('year'))
    const event = []
    let url = ''

    useEffect(() => {
        const keyType = getLocal("calendar_filter_flow_type_"+ctx)
        const keyToken = getLocal("token_key")

        if(keyType === null){
            storeLocal("calendar_filter_flow_type_"+ctx, "all")
        }

        if(keyType === 'all' || keyType === 'spending' || keyType === 'income'){
            url = `http://127.0.0.1:1323/api/v1/flows/month_item/${month}/${year}/${keyType}`
        } else {
            let fixType = keyType
            if(fixType !== 'final_total'){
                fixType = fixType.replace('total_','')
            } 
            url = `http://127.0.0.1:1323/api/v1/flows/month_total/${month}/${year}/${fixType}`
        }

        fetch(url, {
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
    }, [month, year])

    const handleMonthChange = (info) => {
        setCurrentMonth(info.view.currentStart.getMonth() + 1)
        setCurrentYear(info.view.currentStart.getFullYear())
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
        if(items != null){
            items.forEach((el)=> {
                event.push(
                    { 
                        title: el['type'] === 'spending' ? '+ '+el['title'] : '- '+el['title'], 
                        date: el['context'] 
                    }
                )
            })
        }

        return (
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={event}
                datesSet={handleMonthChange}
            />
        )
    }
}
  