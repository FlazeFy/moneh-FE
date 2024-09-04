import React from 'react'
import AtomsText from '../../../atoms/atoms_text'
import MoleculesDropDownDctDynamic from '../../../molecules/molecules_dropdown_dct_dynamic'

export default function GetControlPanel() {
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
                window.location.reload(false)
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

    return (
        <div className='d-flex justify-content-start'> 
            <div>
                <AtomsText text_type="mini_sub_heading" body="Currency Type"/>
                <MoleculesDropDownDctDynamic url={builder_flow_type['url']} elmt={builder_flow_type} change={builder_flow_type['handleChange']} act={keyType} ctx="dropdown"/>
            </div>
        </div>
    )
}
  