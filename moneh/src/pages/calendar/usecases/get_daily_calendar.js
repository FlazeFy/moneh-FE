"use client"
import React from 'react'
import { useState, useEffect } from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

// Modules
import { getCleanTitleFromCtx, ucFirstWord } from '../../../modules/helpers/converter'
import { getTodayDate } from '../../../modules/helpers/generator'
import { getLocal } from '../../../modules/storages/local'

export default function GetDailyCalendar({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [month, setCurrentMonth] = useState(getTodayDate('month'))
    const [year, setCurrentYear] = useState(getTodayDate('year'))
    const event = []

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/stats/ammountflowtype/desc`)
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
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <div>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    events={event}
                    datesSet={handleMonthChange}
                />
            </div>
        )
    }
}
  