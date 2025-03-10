import React from 'react'
import AtomsBreakLine from '../../../atoms/atoms_breakline'
import AtomsButton from '../../../atoms/atoms_button'
import AtomsText from '../../../atoms/atoms_text'

export default function GetWelcoming() {
    return (
        <div className='text-center mx-auto' style={{maxWidth:"1080px"}}>
            <AtomsBreakLine length={5}/>
            <img src="http://localhost:3000/assets/moneh_illust.png" className="img img-fluid" style={{maxWidth:"300px"}}></img>
            <AtomsBreakLine length={2}/>
            <AtomsText class='text-white' text_type="main_heading" body={<>Manage your money, analyze it,<br></br> and save it!</>}/>
            <hr></hr>
            <AtomsText text_type="main_content" body={<p className='text-white'>Moneh helps you track, analyze, and manage your daily or monthly spending and income. Save your wishlist to align with your financial goals, ensuring your money and time are well spent. Enjoy a superior experience with insightful charts that go beyond regular expense tracking.</p>}/>
            <AtomsBreakLine length={1}/>
            <AtomsButton button_type="btn_link" title="Show Me How It Works!"/>
        </div>
    )
}