import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from './atoms.module.css'

export default function AtomsText(props){
    if(props.text_type == 'main_heading'){
        return <h2 className='my-4 text-primary'>{props.body}</h2>
    } else if(props.text_type == 'sub_heading'){
        return <h3 className='my-2 text-white'>{props.body}</h3>
    } else if(props.text_type == 'mini_sub_heading'){
        return <h6 className="mb-1 text-white">{props.body}</h6>
    } else if(props.text_type == 'main_content'){
        return <p className="my-0 text-white">{props.body}</p>
    } else if(props.text_type == 'form_label'){
        return <label className={style.input}>{props.body}</label>
    } else if(props.text_type == 'form_error'){
        return <label className={style.error}><FontAwesomeIcon icon={faTriangleExclamation} width="14px"/> {props.body}</label>
    }
}