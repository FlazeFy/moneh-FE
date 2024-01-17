import React from 'react'

// Components
import GetBreakLine from '../../../components/others/breakLine'

export default function GetWelcoming({ctx}) {
    return (
        <div className='mt-4 text-center row' id={ctx}>
            <div className='col-lgl-6 col-md-6 col-sm-12 py-5'>
                <GetBreakLine length={2}/>
                <h1 style={{fontSize:"var(--textXJumbo)"}}>WELCOME, TO</h1>
                <h1 style={{fontSize:"var(--textHuge)"}} className='fw-bold'>MONEH</h1>
                <h5 style={{fontSize:"var(--textJumbo)"}} className='text-white'>Manage your money, analyze it, and save it!</h5>
                <GetBreakLine length={2}/>
                <button className='btn btn-primary rounded-pill py-3 px-5 fw-bold' style={{fontSize:"var(--textXLG)"}}>Show Me How It Works!</button>
            </div> 
            <div className='col-lgl-6 col-md-6 col-sm-12'>
                <img src="http://localhost:3000/assets/moneh_illust.png" className="img img-fluid"></img>
            </div> 
        </div>
    )
}