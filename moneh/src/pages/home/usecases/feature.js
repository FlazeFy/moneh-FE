import GetBreakLine from "../../../components/others/breakLine";

export default function GetFeature({ctx}) {
    return (
        <>
            <GetBreakLine length={3}/>
            <div className='mt-4 text-center row' id={ctx}>
                <div className='col-lgl-6 col-md-6 col-sm-12'>
                    <GetBreakLine length={3}/>
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
                <div className='col-lgl-6 col-md-6 col-sm-12'>
                    <GetBreakLine length={5}/>
                    <h1 style={{fontSize:"var(--textXJumbo)"}}>OUR FEATURE</h1>
                    <GetBreakLine length={1}/>
                    <h6 className="text-white" style={{fontSize:"var(--textJumbo)"}}>We have many feature to make sure you can manage your money and saving correctly and easy as you want</h6>
                </div> 
            </div>
            <GetBreakLine length={5}/>
        </>
    )
}