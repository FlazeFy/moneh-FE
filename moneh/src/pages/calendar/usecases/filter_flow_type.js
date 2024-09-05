import React from 'react'
import Swal from 'sweetalert2'
import AtomsText from '../../../atoms/atoms_text'
import { cleanSlugToText } from '../../../modules/helpers/converter'
import { storeLocal, getLocal } from '../../../modules/storages/local'

export default function FilterFlowType() {
    function toogle(val) {
        storeLocal("calendar_filter_flow_type_all_flow",val) 
        Swal.fire({ 
            icon: "success", 
            title: "Success", 
            html: `Calendar item has filtered to show <span class='text-primary'>${val == 'all' ? 'all':`${cleanSlugToText(val)}'s category`}</span> item`
        }).then(() => {
            window.location.reload(false)
        })
    }

    const selectedConsumeType = getLocal("calendar_filter_flow_type_all_flow")

    return (
        <div className="form-floating mb-3 ms-3">
            <select className="form-select" id="floatingSelect" style={{minWidth:"150px"}} onChange={(e) => toogle(e.target.value)}>
                <option value="all" selected={selectedConsumeType === 'all' ? true : false}>All</option>
                <option value="spending" selected={selectedConsumeType === 'spending' ? true : false}>Spending</option>
                <option value="income" selected={selectedConsumeType === 'income' ? true : false}>Income</option>
                <option value="total_spending" selected={selectedConsumeType === 'total_spending' ? true : false}>Total Spending</option>
                <option value="total_income" selected={selectedConsumeType === 'total_income' ? true : false}>Total Income</option>
                <option value="final_total" selected={selectedConsumeType === 'final_total' ? true : false}>Final Total</option>
            </select>
            <AtomsText text_type="form_label" body="Filter By Type"/>
        </div>
    )
}
  
