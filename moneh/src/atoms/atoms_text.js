import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from './atoms.module.css'

export default function AtomsText(props){
    if(props.text_type === 'main_heading'){
        return <h1 className={props.class}>{props.body}</h1>
    } else if(props.text_type === 'sub_heading'){
        return <h2 className='my-2 text-primary'>{props.body}</h2>
    } else if(props.text_type === 'mini_sub_heading'){
        return <h5 className="mb-2">{props.body}</h5>
    } else if(props.text_type === 'main_content'){
        return <p className="my-0 text-dark">{props.body}</p>
    } else if(props.text_type === 'form_label'){
        return <label className={style.input}>{props.body}</label>
    } else if(props.text_type === 'form_error'){
        return <label className={style.error}><FontAwesomeIcon icon={faTriangleExclamation} width="14px"/> {props.body}</label>
    }
}