import AtomsBreakLine from "../../../atoms/atoms_breakline";
import AtomsText from "../../../atoms/atoms_text";

export default function GetMultiEnv({ctx}) {
    return (
        <>
            <AtomsBreakLine length={3}/>
            <div className='mt-4 text-center row mx-auto' id={ctx} style={{maxWidth:"1080px"}}>
                <div className='col-lgl-6 col-md-6 col-sm-12'>
                    <AtomsBreakLine length={8}/>
                    <AtomsText text_type="main_heading" body="We're Available At Any Device" style={{fontSize:"var(--textXJumbo)"}}/>
                    <hr></hr>
                    <AtomsBreakLine length={1}/>
                    <h6 className="text-white" style={{fontSize:"var(--textJumbo)"}}>Moneh is available for web version, mobile version, apps version, and Telegram Bot</h6>
                </div> 
                <div className='col-lgl-6 col-md-6 col-sm-12 d-flex flex-column justify-content-center'>
                    <AtomsBreakLine length={6}/>
                    <img src="/assets/multiplatform.jpg" style={{minWidth:"300px"}} className="img img-fluid mb-3 image-custom"/>
                </div> 
            </div>
            <AtomsBreakLine length={5}/>
        </>
    )
}