import AtomsText from "../atoms/atoms_text";

export default function MoleculesButtonCustomIcon(props) {
    const navigate = (url) => {
        window.location.href = url
    }

    return (
        <div className="btn-custom-icon" onClick={(e) => navigate(props.url)}>
            <img src={props.img_url}/>
            <div className="ps-3">
                <AtomsText text_type="mini_sub_heading" body={props.title}/>
                <AtomsText text_type="main_content" body={props.content}/>
            </div>
        </div>
    )
}