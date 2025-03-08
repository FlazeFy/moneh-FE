import AtomsBreakLine from "../../../atoms/atoms_breakline";
import AtomsText from "../../../atoms/atoms_text";

export default function GetFeature({ctx}) {
    return (
        <>
            <AtomsBreakLine length={3}/>
            <div className='mt-4 text-center row mx-auto' id={ctx} style={{maxWidth:"1080px"}}>
                <div className='col-lgl-6 col-md-6 col-sm-12'>
                    <AtomsBreakLine length={3}/>
                    <div id="carouselExampleSlidesOnly" className="carousel slide mt-4" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="/assets/stats.png" style={{maxWidth:"50%", minWidth:"300px"}} className="img img-fluid mb-3"/>
                                <h4 className="text-white">View statistic of your income and outcome</h4>
                            </div>
                            <div className="carousel-item">
                                <img src="/assets/pocket.png" style={{maxWidth:"50%", minWidth:"300px"}} className="img img-fluid mb-3"/>
                                <h4 className="text-white">Watch your saving and we will give your suggestion of your spending</h4>
                            </div>
                            <div className="carousel-item">
                                <img src="/assets/wishlist.png" style={{maxWidth:"50%", minWidth:"300px"}} className="img img-fluid mb-3"/>
                                <h4 className="text-white">Place many stuff you want to buy</h4>
                            </div>
                            <div className="carousel-item">
                                <img src="/assets/dashboard.png" style={{maxWidth:"50%", minWidth:"300px"}} className="img img-fluid mb-3"/>
                                <h4 className="text-white">Easy summary of all things</h4>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className='col-lgl-6 col-md-6 col-sm-12 d-flex flex-column justify-content-center'>
                    <AtomsBreakLine length={5}/>
                    <AtomsText text_type="main_heading" body="OUR FEATURE" style={{fontSize:"var(--textXJumbo)"}}/>
                    <hr></hr>
                    <AtomsBreakLine length={1}/>
                    <h6 className="text-white" style={{fontSize:"var(--textJumbo)"}}>We have many feature to make sure you can manage your money and saving correctly and easy as you want</h6>
                </div> 
            </div>
            <AtomsBreakLine length={5}/>
        </>
    )
}