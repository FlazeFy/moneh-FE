export default function AtomsText(props){
    if(props.text_type == 'main_heading'){
        return <h2 className='my-4 text-primary'>{props.body}</h2>
    } else if(props.text_type == 'sub_heading'){
        return <h3 className='my-2 text-white'>{props.body}</h3>
    } else if(props.text_type == 'mini_sub_heading'){
        return <h6 className="mb-1 text-white">{props.body}</h6>
    } else if(props.text_type == 'main_content'){
        return <p className="my-0 text-white">{props.body}</p>
    } 
}