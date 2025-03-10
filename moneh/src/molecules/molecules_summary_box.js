import AtomsText from "../atoms/atoms_text";

export default function MoleculesSummaryBox(props) {
    return (
        <div className='container-white'>
            <AtomsText text_type="sub_heading" body={props.title}/>
            <h5>{props.value}</h5>
        </div>
    )
}