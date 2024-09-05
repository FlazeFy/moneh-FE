import AtomsText from "../../atoms/atoms_text";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsNavbar from "../../organisms/organisms_navbar";
import GetTotalDctByType from "./usecases/get_total_dct_by_type";

const StatsOther_Index = () => {
    return (
        <>
            <OrganismsNavbar active="stats" subactive="stats_others"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <div className="row mt-5 text-center">
                        <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                            <AtomsText text_type="main_heading" body={"Total Used Dictionary By Type"}/>
                            <GetTotalDctByType ctx="get_total_dct_by_type"/>
                        </div>
                    </div>
                </div>
                <OrganismsFooter/>
            </div>
        </>
    );
}

export default StatsOther_Index;
