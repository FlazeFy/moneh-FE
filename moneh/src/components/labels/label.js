import label from './label.module.css'

// Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

export default function GetLabel({type, title}) {
    if(title.trim() != ""){
        if (type == "input"){
            return <label className={label.input}>{title}</label>
        } else if (type == "error"){
            return <label className={label.error}><FontAwesomeIcon icon={faTriangleExclamation} width="14px"/> {title}</label>
        } else {
            return null
        }
    } else {
        return null
    }
}