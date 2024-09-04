import AtomsText from "../atoms/atoms_text";

export default function OrganismsFooter() {
    return  (
        <footer className="footer mt-auto py-3 bg-light">
            <div className="container-fluid pb-2 py-4 px-4">
                <div className="row text-center">
                    <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                        <AtomsText text_type="mini_sub_heading" body="Moneh"/>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                        <AtomsText text_type="mini_sub_heading" body="© 2024 FlazeFy, Leo"/>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                        <AtomsText text_type="mini_sub_heading" body="Parts Of FlazenApps"/>
                    </div>
                </div>
            </div>
        </footer>
    )
}