import React from 'react'
import { useState, useEffect } from "react"

// Component
import GetGeneralTable from '../../../components/table/general_table'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetAllFlow({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])

    useEffect(() => {
        //Default config
        const keyPage = sessionStorage.getItem("Table_Flow")
        const keyOrder = sessionStorage.getItem("Table_order_Flow")

        if(keyPage == null){
            sessionStorage.setItem("Table_Flow", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Flow", "asc");
        }

        fetch(`http://127.0.0.1:1323/api/v1/flows/${keyOrder}?page=${keyPage}`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setMaxPage(result.data.last_page)
                setCurrPage(result.data.current_page)
                setItems(result.data.data)        
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

    const builder = [
        {
            column_name: "Type",
            object_name: "flows_type",
            extra_desc: null,
            type: 'select',
            class: 'form-control',
            label: 'Flow Type',
            placeholder: 'Type flow type',
            url: [
                {
                    "dictionaries_name": "spending"
                },
                {
                    "dictionaries_name": "income"
                }
            ],
        },
        {
            column_name: "Category",
            object_name: "flows_category",
            extra_desc: null,
            type: 'select',
            class: 'form-control',
            label: 'Flow Category',
            placeholder: 'Select flow category',
            url: 'http://127.0.0.1:1323/api/v1/dct/flows_category?page=1'
        },
        {
            column_name: "Name",
            object_name: "flows_name",
            extra_desc: null,
            type: 'text',
            class: 'form-control',
            label: 'Flow Name',
            placeholder: 'Type flow name',
            is_required: true,
            is_obsecure: false,
            maxLength: 75,
        },
        {
            column_name: "Description",
            object_name: "flows_desc",
            extra_desc: null,
            type: 'textarea',
            class: 'form-control',
            label: 'Flow Description',
            is_required: true,
            maxLength: 500,
        },
        {
            column_name: "Ammount",
            object_name: "flows_ammount",
            extra_desc: null,
            type: 'number',
            class: 'form-control',
            label: 'Flow Ammount',
            placeholder: 'Type flow ammount',
            is_required: true,
            maxLength: 36,
        },
        {
            column_name: "Tags",
            object_name: "flows_tag",
            extra_desc: null,
            type: 'tag',
            class: 'btn btn-tag',
            label: 'Flow Tag',
            url: 'http://127.0.0.1:1323/api/v1/tag/desc?page=1'
        },
        {
            column_name: "Manage",
            object_name: null,
            extra_desc: null
        }
    ]

    if (error) {
        return <div><h2>{getCleanTitleFromCtx(ctx)}</h2> Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <> 
                <h2 className='mt-4'>{getCleanTitleFromCtx(ctx)}</h2>
                <GetGeneralTable builder={builder} items={items} maxPage={maxPage} currentPage={currPage} ctx={"Flow"} urlDel={"http://127.0.0.1:1323/api/v1/flows/destroy/"}/>  
            </>
        )
    }
}