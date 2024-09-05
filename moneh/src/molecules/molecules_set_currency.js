import React from 'react'
import Swal from 'sweetalert2'
import AtomsText from '../atoms/atoms_text'
import MoleculesDropDownDctDynamic from './molecules_dropdown_dct_dynamic'

export default function MoleculesSetCurrency() {
    const keyType = sessionStorage.getItem("currency_type") ?? 'Abbreviated Numeral'

    const builder_flow_type = 
        {
            type: 'select',
            class: 'form-control',
            label: 'Currency Type',
            placeholder: 'Type flow type',
            max: 75,
            handleChange: (event) => {
                sessionStorage.setItem("currency_type", event.target.value)
                Swal.fire({ 
                    icon: "success", 
                    title: "Success", 
                    html: `Currency format has changed to <span class='text-primary'>${event.target.value}</span>`
                }).then(() => {
                    window.location.reload(false)
                })
            },
            url: [
                {
                    "dictionaries_name": "Abbreviated Numeral"
                },
                {
                    "dictionaries_name": "Rupiah"
                },
                {
                    "dictionaries_name": "Rupiah With Zero Sen"
                },
                {
                    "dictionaries_name": "Rupiah Without Format"
                },
            ],
        }

    return <>
        <AtomsText text_type="mini_sub_heading" body="Currency Type"/>
        <MoleculesDropDownDctDynamic url={builder_flow_type['url']} elmt={builder_flow_type} change={builder_flow_type['handleChange']} act={keyType} ctx="dropdown"/>
    </>
}
  