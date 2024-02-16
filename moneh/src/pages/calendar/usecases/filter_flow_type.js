import React from 'react'
import { storeLocal, getLocal } from '../../../modules/storages/local'

export default function FilterFlowType() {
    function toogle(val) {
        storeLocal("calendar_filter_flow_type_all_flow",val) 

        window.location.reload(false)
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
            <label for="floatingSelect">Filter By Type</label>
        </div>
    )
}
  
