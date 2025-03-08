import React from 'react'
import { useState, useEffect } from "react"

// Component
import MoleculesTable from '../../../molecules/molecules_table'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import Swal from 'sweetalert2'
import { getLocal } from '../../../modules/storages/local'

export default function GetAllFlow({ ctx, shouldFetch, onPostSuccess }) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])
    const keyToken = getLocal("token_key")

    useEffect(() => {
        fetchFlow()
    }, [shouldFetch])

    const fetchFlow = () => {
        //Default config
        const keyPage = sessionStorage.getItem("Table_Flow")
        const keyOrder = sessionStorage.getItem("Table_order_Flow")

        if(keyPage == null){
            sessionStorage.setItem("Table_Flow", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Flow", "asc");
        }

        fetch(`http://127.0.0.1:1323/api/v1/flows/${keyOrder}?page=${keyPage}`, {
            headers: {
                Authorization: `Bearer ${keyToken}`
            }
        })
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setMaxPage(result.data.last_page)
                setCurrPage(result.data.current_page)
                setItems(result.data.data)        
            },
            (error) => {
                setIsLoaded(true)
                Swal.fire({ 
                    icon: "error", 
                    title: "Oops...", 
                    text: "Something went wrong!" 
                })
            }
        )
    }

    const builder = [
        {
            column_name: "Type",
            object_name: "flows_type",
            extra_desc: null,
            type: 'select',
            class: 'form-control',
            label: 'Flow Type',
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
            max: 75,
        },
        {
            column_name: "Description",
            object_name: "flows_desc",
            extra_desc: null,
            type: 'textarea',
            class: 'form-control',
            label: 'Flow Description',
            is_required: true,
            max: 500,
        },
        {
            column_name: "Ammount",
            object_name: "flows_ammount",
            extra_desc: null,
            type: 'number',
            class: 'form-control',
            label: 'Flow Ammount',
            formatter: 'currency',
            is_required: true,
            max: 10,
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
            column_name: "Created At",
            object_name: "created_at",
            extra_desc: null,
            type: 'datetime',
            class: 'form-control',
            label: 'Created At',
            is_required: true,
        },
        {
            column_name: "Manage",
            object_name: null,
            extra_desc: null
        }
    ]

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
                <h2 className='mt-4'>{getCleanTitleFromCtx(ctx)}</h2>
                <MoleculesTable builder={builder} items={items} maxPage={maxPage} currentPage={currPage} ctx={"Flow"} urlDel={"http://127.0.0.1:1323/api/v1/flows/destroy/"} onPostSuccess={onPostSuccess}/>  
            </>
        )
    }
}