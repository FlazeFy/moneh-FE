import React from 'react'
import { useState, useEffect } from "react"
import MoleculesTable from '../../../molecules/molecules_table'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'
import Swal from 'sweetalert2'
import { getLocal } from '../../../modules/storages/local'

export default function GetAllPocket({ctx, shouldFetch, onPostSuccess}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])
    const keyToken = getLocal("token_key")

    useEffect(() => {
        fetchPocket()
    }, [shouldFetch])

    const fetchPocket = () => {
        const keyPage = sessionStorage.getItem("Table_Pocket")
        const keyOrder = sessionStorage.getItem("Table_order_Pocket")

        if(keyPage == null){
            sessionStorage.setItem("Table_Pocket", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Pocket", "asc");
        }

        fetch(`http://127.0.0.1:1323/api/v1/pockets/headers/${keyOrder}?page=${keyPage}`, {
            headers: { 
                'Authorization': `Bearer ${keyToken}`
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
            column_name: "Name",
            object_name: "pockets_name",
            extra_desc: null,
            placeholder: 'Type pocket name',
            type: 'text',
            is_required: true,
            max: 144,
        },
        {
            column_name: "Description",
            object_name: "pockets_desc",
            extra_desc: null,
            placeholder: 'Type pocket description',
            type: 'textarea',
            is_required: true,
            line: 4,
            max: 144,
        },
        {
            column_name: "Type",
            object_name: "pockets_type",
            extra_desc: null,
            type: 'select',
            class: "form-control",
            placeholder: 'Select pocket type',
            url: 'http://127.0.0.1:1323/api/v1/dct/pockets_type?page=1'
        },
        {
            column_name: "Bottom Limit",
            object_name: "pockets_limit",
            is_required: true,
            extra_desc: null,
            type: 'number',
            extra_desc: null,
            formatter: 'currency',
            max: 10,
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
                <MoleculesTable builder={builder} items={items} maxPage={maxPage} currentPage={currPage} ctx={"Pocket"} urlPut={"http://127.0.0.1:1323/api/v1/pockets/by/"} urlDel={"http://127.0.0.1:1323/api/v1/pockets/destroy/"} onPostSuccess={onPostSuccess}/>  
            </>
        )
    }
}