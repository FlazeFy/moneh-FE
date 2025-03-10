import React from 'react'
import MoleculesButtonCustomIcon from '../../../molecules/molecules_button_custom_icon'
import MoleculesSetCurrency from '../../../molecules/molecules_set_currency'

export default function GetControlPanel() {
    return (
        <div className='row'> 
            <div className='col-lg-3 col-md-4'>
                <div className='bg-danger-light py-3 px-4' style={{borderRadius:"var(--roundedJumbo)"}}>
                    <MoleculesSetCurrency/>
                </div>
            </div>
            <div className='col-lg-4 col-md-8'>
                <MoleculesButtonCustomIcon title="Calendar" content="See Monthly tracking for your cash flow in and out" img_url={'/assets/calendar.png'} url="/calendar"/>
            </div>
        </div>
    )
}
  