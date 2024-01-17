import { useState } from 'react'

// Components
import GetLabel from '../../components/labels/label'
import GetBreakLine from '../others/breakLine'
import GetDropDownDctDynamic from '../others/dropdown'
import GetAllTag from '../others/getAllTag'

//Modules
import { countHalf } from '../../modules/helpers/math'
import { getLocal } from '../../modules/storages/local'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

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
                    {
                        props.map((elmt, idx) => {
                            if (elmt.type === 'text' || elmt.type === 'number' || elmt.type === 'range') {
                                return (
                                    <div className='col-lg-12 col-md-12 col-sm-12 text-start mb-3' key={idx}>
                                        <GetLabel title={elmt.label} type="input"/>
                                        {
                                            elmt.type === 'range' ? 
                                                <>
                                                    <GetBreakLine length={1}/>
                                                    <div className='d-flex justify-content-between my-1'>
                                                        <div>
                                                            <lable className='text-white'>{elmt.min}</lable>
                                                        </div>
                                                        <div>
                                                            <lable className='text-white'>{countHalf(elmt.max)}</lable>
                                                        </div>
                                                        <div>
                                                            <lable className='text-white'>{elmt.max}</lable>
                                                        </div>
                                                    </div>
                                                    <input placeholder={elmt.placeholder}
                                                        className={elmt.class + " w-100"} 
                                                        onChange={elmt.handleChange}
                                                        type={elmt.type}
                                                        max={elmt.max}
                                                        min={elmt.min}
                                                        defaultValue={countHalf(elmt.max)}
                                                    />
                                                </>
                                            :
                                                <input placeholder={elmt.placeholder}
                                                    className={elmt.class + " w-100"} 
                                                    onChange={elmt.handleChange}
                                                    type={elmt.type}
                                                />
                                        }
                                        <GetLabel title={elmt.errorMsg} type="error"/>
                                    </div>
                                )
                            } else if (elmt.type === 'textarea') {
                                return (
                                    <div className='col-lg-12 col-md-12 col-sm-12 text-start mb-3' key={idx}>
                                        <GetLabel title={elmt.label} type="input"/>
                                        <textarea className={elmt.class + " w-100"} rows={elmt.line} type="file" onChange={elmt.handleChange}></textarea>
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
                                        <button className={elmt.class + " w-100 h-75 mt-2 pb-3 pt-2"} 
                                            onClick={elmt.handleClick}>
                                            <FontAwesomeIcon icon={faPaperPlane} color="var(--secondaryBG)"/> {elmt.label}
                                        </button>
                                    </div>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                </div>
            </div>
        )
    } else {
        return null
    }
}