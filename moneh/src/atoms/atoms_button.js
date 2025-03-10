import { ucFirstChar } from "../modules/helpers/converter"
export default function AtomsButton(props){
    const getActive = (val, curr) => {
        if(val === curr){
            return "active"
        } else {
            return ""
        }
    }

    if(props.button_type === 'main_nav'){
        return <a className={"nav-link " + getActive(props.active,props.state)} href={props.url || props.state === "home" ? `/${props.url}` : `#${props.href}` }>{props.title}</a>
    } else if(props.button_type === 'sub_nav'){
        return <a className={"nav-link sub mb-2 " + getActive(props.active,props.state)} href={`/${props.url}`}>{ucFirstChar(props.title)}</a>
    } else if(props.button_type === 'tag'){
        return <a className='btn-tag' href={"/news/tag/"+props.slug} title={"Browse item with tag : " + props.title}>{props.title}</a>
    } else if(props.button_type === 'btn_info'){
        return <a className='btn-info' onClick={props.onclick} title={props.title}>{props.title}</a>
    } else if(props.button_type === 'btn_primary'){
        return <a className='btn-primary' onClick={props.onclick} title={props.title}>{props.title}</a>
    } else if(props.button_type === 'btn_link'){
        return <a className='btn-link' onClick={props.onclick} title={props.title}>{props.title}</a>
    } else if(props.button_type === 'btn_danger'){
        return <a className='btn-danger' onClick={props.onclick} title={props.title}>{props.title}</a>
    }
}