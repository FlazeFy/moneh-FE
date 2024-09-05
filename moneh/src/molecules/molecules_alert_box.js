//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcons, faWarning } from "@fortawesome/free-solid-svg-icons"
import { getCleanTitleFromCtx, ucFirstChar } from '../modules/helpers/converter'
import AtomsText from '../atoms/atoms_text'

export default function MoleculesAlertBox(props) {
    return (
        <div>
            {
                props.type == 'error' && <AtomsText body={getCleanTitleFromCtx(props.context)} text_type="sub_heading"/>
            }
            <div className={`alert my-3 alert-${props.type}`} role='alert'>
                <h4><FontAwesomeIcon icon={props.type == 'warning' || props.type == 'danger' ? faWarning : faIcons}/> {ucFirstChar(props.type == 'danger' ? 'error':props.type)}</h4>
                {props.message}
            </div>
        </div>
    )
}