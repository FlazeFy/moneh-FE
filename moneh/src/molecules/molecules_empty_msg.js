//Font awesome classicon
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AtomsBreakLine from '../atoms/atoms_breakline'
import AtomsText from '../atoms/atoms_text'
import { ucFirstChar} from '../modules/helpers/converter'

export default function MoleculesEmptyMsg(props) {
    return (
        <div className="alert-warning-empty" role="alert">
            {
                props.is_with_image && <img src="/assets/empty.png" style={{width:"200px", width:"200px"}} className="img img-fluid mb-3"/>

            }
            <AtomsBreakLine length={1}/>
            <AtomsText body={<><FontAwesomeIcon icon={faExclamationTriangle}/> Error</>} text_type="mini_sub_heading"/>
            <AtomsText text_type="main_content" body={ucFirstChar(props.body)}/>
        </div>
    )
}