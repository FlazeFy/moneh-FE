import React from 'react'
import { useState, useEffect } from "react"
// Modules
import { getLocal } from '../modules/storages/local'
import MoleculesAlertBox from '../molecules/molecules_alert_box'
import AtomsBreakLine from '../atoms/atoms_breakline'
import AtomsText from '../atoms/atoms_text'

export default function OrganismsAllTag({url, cls, func}) {
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

    const removeTag = (slug) => {        
        let updatedTags = selectedTag.filter((val, i) => val.props.value !== slug)

        setSelectedTag(updatedTags)
    }

    const selectTag = (i, slug, name) => {
        setSelectedTag(selectedTag.concat(
            <button key={i} className={cls} value={slug} title="Unselect this tag" onClick={(e) => removeTag(slug)}>{name}</button>
        ))
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={'All Tag'}/>
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
                            <button key={i} title="Select this tag" className={cls} onClick={() => {
                                if(selectedTag.length === 0){
                                    func(val['tags_slug'])
                                    selectTag(i, val['tags_slug'], val['tags_name'])
                                } else {
                                    let found = false
                                    selectedTag.map((slct, j, index) => {
                                        if(slct.props.value === val['tags_slug']){
                                            found = true
                                        }
                                    })

                                    if(!found){
                                        selectTag(i, val['tags_slug'], val['tags_name'])
                                    }
                                }
                            }} >{val['tags_name']}</button>
                        );
                    })
                }
                <AtomsBreakLine length={2}/>
                <AtomsText text_type="form_label" body="Selected Tag"/>
                <AtomsBreakLine length={1}/>
                <div className="mt-2"/>
                {selectedTag}
            </>
        )
    }
}