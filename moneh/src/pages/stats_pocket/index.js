import AtomsText from "../../atoms/atoms_text";
import OrganismsFooter from "../../organisms/organisms_footer";
import OrganismsNavbar from "../../organisms/organisms_navbar";
import GetTotalPocketByType from "./usecases/get_total_pocket_by_type";

const StatsPocketIndex = () => {
    return (
        <>
            <OrganismsNavbar active="stats" subactive="stats_pocket"/>
            <div className='content-grid'>
                <div style={{minHeight:"100vh"}}>
                    <div className="row mt-5 text-center">
                        <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                            <AtomsText text_type="main_heading" body={"Total Pocket By Type"}/>
                            <GetTotalPocketByType ctx="get_total_pocket_by_type"/>
                        </div>
                    </div>
                </div>
                <OrganismsFooter/>
            </div>
        </>
    );
}

export default StatsPocketIndex;
