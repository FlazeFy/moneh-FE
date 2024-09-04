import { ucFirstChar } from "../modules/helpers/converter"

export default function AtomsButton(props){
    const getActive = (val, curr) => {
        if(val == curr){
            return "active"
        } else {
            return ""
        }
    }

    if(props.text_type == 'main_nav'){
        return <a className={"nav-link " + getActive(props.active,props.state)} href={`/${props.url}`}>{ucFirstChar(props.title)}</a>
    } else if(props.text_type == 'sub_nav'){
        return <a className={"nav-link sub mb-2 " + getActive(props.active,props.state)} href={`/${props.url}`}>{ucFirstChar(props.title)}</a>
    } 
}