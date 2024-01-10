// Components
import { useState } from 'react'
import GetLabel from '../../components/labels/label'
import { getLocal } from '../../modules/storages/local'
import GetBreakLine from '../others/breakLine'
import GetDropDownDctDynamic from '../others/dropdown'
import GetAllTag from '../others/getAllTag'

export default function GetFormTemplate({type, props}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])
    
    if (type == "single-line"){
        return (
            <div key={type}>
                <div className='row'>
                    {props.map((elmt, idx) => {
                        if (elmt.type === 'text' || elmt.type === 'number') {
                            return (
                                <div className='col-lg-12 col-md-12 col-sm-12 text-start mb-3' key={idx}>
                                    <GetLabel title={elmt.label} type="input"/>
                                    <input placeholder={elmt.placeholder}
                                        className={elmt.class + " w-100"} 
                                        onChange={elmt.handleChange}
                                        type={elmt.type}
                                    />
                                    <GetLabel title={elmt.errorMsg} type="error"/>
                                </div>
                            )
                        } else if (elmt.type === 'upload') {
                            return (
                                <div className='col-lg-12 col-md-12 col-sm-12 text-start mb-3' key={idx}>
                                    <GetLabel title={elmt.label} type="input"/>
                                    <GetBreakLine length={2}/>
                                    <input className="form-control" type="file" onChange={elmt.handleChange} /> 
                                    <GetLabel title={elmt.errorMsg} type="error"/>
                                </div>
                            )
                        } else if (elmt.type === 'select') {
                            return (
                                <div className='col-lg-12 col-md-12 col-sm-12 text-start mb-3' key={idx}>
                                    <GetLabel title={elmt.label} type="input"/>
                                    <GetDropDownDctDynamic url={elmt.url} elmt={elmt} ctx="dropdown"/>
                                    <GetLabel title={elmt.errorMsg} type="error"/>
                                </div>
                            )
                        } else if (elmt.type === 'checkbox') {
                            return (
                                <div class="form-check ms-3">
                                    <input className={elmt.class} type={elmt.type} id="disabledFieldsetCheck" onChange={elmt.handleChange}></input>
                                    <GetLabel title={elmt.label} type="input"/>
                                </div>
                            )
                        } else if (elmt.type === 'tag') {
                            return (
                                <div class="form-check" style={{marginLeft:"-10px"}}>
                                    <GetLabel title={elmt.label} type="input"/>
                                    <GetBreakLine length={1}/>
                                    <div className='mt-2'/>
                                    <GetAllTag url={elmt.url} cls={elmt.class} func={elmt.handleChange}/>
                                    <GetBreakLine length={2}/>
                                </div>
                            )
                        } else if (elmt.type === 'submit') {
                            return (
                                <div className='col-lg-4 col-md-6 col-sm-12 mx-auto mt-3' key={idx}>
                                    <button className={elmt.class + " w-100 h-75 mt-2"} 
                                        onClick={elmt.handleClick}>{elmt.label}</button>
                                </div>
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
            </div>
        )
    } else {
        return null
    }
}