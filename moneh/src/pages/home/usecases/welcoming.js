import React from 'react'
import AtomsBreakLine from '../../../atoms/atoms_breakline'
import AtomsText from '../../../atoms/atoms_text'

export default function GetWelcoming({ctx}) {
    return (
        <div className='mt-4 text-center row' id={ctx}>
            <div className='col-lgl-6 col-md-6 col-sm-12 py-5'>
                <AtomsBreakLine length={2}/>
                <AtomsText text_type="main_heading" body="WELCOME, TO" style={{fontSize:"var(--textXJumbo)"}}/>
                <AtomsText text_type="main_heading" body="MONEH" style={{fontSize:"var(--textXJumbo)"}}/>
                <h5 style={{fontSize:"var(--textJumbo)"}} className='text-white'>Manage your money, analyze it, and save it!</h5>
                <AtomsBreakLine length={2}/>
                <button className='btn btn-primary rounded-pill py-3 px-5 fw-bold' style={{fontSize:"var(--textXLG)"}}>Show Me How It Works!</button>
            </div> 
            <div className='col-lgl-6 col-md-6 col-sm-12'>
                <img src="http://localhost:3000/assets/moneh_illust.png" className="img img-fluid"></img>
            </div> 
        </div>
    )
}