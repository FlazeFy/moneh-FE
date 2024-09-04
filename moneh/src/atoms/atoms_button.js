import { ucFirstChar } from "../modules/helpers/converter"
import style from "./atoms.module.css"
export default function AtomsButton(props){
    const getActive = (val, curr) => {
        if(val == curr){
            return "active"
        } else {
            return ""
        }
    }

    if(props.button_type == 'main_nav'){
        return <a className={"nav-link " + getActive(props.active,props.state)} href={`/${props.url}`}>{ucFirstChar(props.title)}</a>
    } else if(props.button_type == 'sub_nav'){
        return <a className={"nav-link sub mb-2 " + getActive(props.active,props.state)} href={`/${props.url}`}>{ucFirstChar(props.title)}</a>
    } else if(props.button_type == 'tag'){
        return <a className={style.btn_tag} href={"/news/tag/"+props.slug} title={"Browse item with tag : " + props.title}>{props.title}</a>
    }
}