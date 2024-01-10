import React from 'react'
import { useState, useEffect } from "react"

// Component
import { getCleanTitleFromCtx } from '../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../modules/storages/local'

export default function GetAllTag({url, cls, func}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])
    const [selectedTag, setSelectedTag] = useState([])

    useEffect(() => {
        //Default config
        const keyPage = sessionStorage.getItem("List_Tag")

        if(keyPage == null){
            sessionStorage.setItem("List_Tag", "1");
        }

        fetch(url)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setMaxPage(result.data.last_page)
                setCurrPage(result.data.current_page)
                setItems(result.data.data)        
            },
            (error) => {
                if(getLocal("List_Tag_sess") !== undefined){
                    setIsLoaded(true)
                    setItems(JSON.parse(getLocal("List_Tag_sess")))
                } else {
                    setIsLoaded(true)
                    setError(error)
                }
            }
        )
    },[])

    const selectTag = (i, slug, name) => {
        setSelectedTag(selectedTag.concat(
            <button key={i} className={cls}>{name}</button>
        ))
    }

    if (error) {
        return <div><h2>Failed to fetch</h2> Error: {error.message}</div>
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
                    items.map((val, i, index) => {
                        return (
                            <button key={i} className={cls} onClick={(e) => {
                                func(val['tags_slug'])
                                selectTag(i, val['tags_slug'], val['tags_name'])
                            }} >{val['tags_name']}</button>
                        );
                    })
                }
                {selectedTag}
            </>
        )
    }
}