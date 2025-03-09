import React, { useEffect, useState } from 'react'
import AtomsBreakLine from '../../../atoms/atoms_breakline'
import AtomsButton from '../../../atoms/atoms_button'
import AtomsText from '../../../atoms/atoms_text'
import MoleculesAlertBox from '../../../molecules/molecules_alert_box'

export default function GetTotalUser(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItem] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/stats/summary/apps`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItem(result.data)        
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            }
        )
    },[])
    
    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <div className='text-center mx-auto' style={{maxWidth:"1080px"}} id="visualization">
                <AtomsBreakLine length={5}/>
                <AtomsText text_type="main_heading" body={<>About <b className='text-primary'>{item.total_user}</b> User Use Ours Apps</>}/>
                <hr></hr>
                <AtomsText text_type="sub_heading" body={<p className='text-dark'>We've managed about <b className='text-primary'>{item.total_flows}</b> money flow, <b className='text-primary'>{item.total_pockets}</b> wallet, and <b className='text-primary'>{item.total_wishlist}</b> wishlist stored in our apps</p>}/>
                <AtomsBreakLine length={1}/>
                <AtomsText text_type="main_content" body={<p className='text-dark'>Wanna see Moneh Chart Playground?</p>}/>
                <AtomsBreakLine length={1}/>
                <AtomsButton button_type="btn_link" title="See Our Data Visualization"/>
            </div>
        )
    }
}