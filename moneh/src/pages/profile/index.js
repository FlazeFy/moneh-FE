import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsSidebar from "../../organisms/organisms_sidebar";
import GetMyProfile from "./usecases/getMyProfile";

const ProfileIndex = () => {
    return (
        <div className="row">
            <div className="col-lg-3 col-md-1 col-sm-12 col-12 position-relative">
                <OrganismsSidebar active="profile"/>
            </div>
            <div className="col-lg-9 col-md-11 col-sm-12 col-12">
                <div className='content-grid'>
                    <div style={{minHeight:"100vh"}}>
                        <div className="row">
                            <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                                <GetMyProfile ctx="My Profile"/>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                
                            </div>
                        </div>
                    </div>
                    <OrganismsFooter/>
                </div>
            </div>
        </div>
    );
}

export default ProfileIndex;