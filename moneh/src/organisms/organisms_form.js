// Components
import AtomsBreakLine from '../atoms/atoms_breakline'

//Modules
import { countHalf } from '../modules/helpers/math'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import AtomsText from '../atoms/atoms_text'
import MoleculesDropDownDctDynamic from '../molecules/molecules_dropdown_dct_dynamic'
import OrganismsAllTag from './organisms_tag'

export default function OrganismsForm({type, props}) {
    if (type == "single-line"){
        return (
            <div key={type}>
                <div className='row'>
                    {
                        props.map((elmt, idx) => {
                            if (elmt.type === 'text' || elmt.type === 'number' || elmt.type === 'range') {
                                return (
                                    <div className='col-lg-12 col-md-12 col-sm-12 text-start mb-3' key={idx}>
                                        <AtomsText text_type="form_label" body={elmt.label}/>
                                        {
                                            elmt.type === 'range' ? 
                                                <>
                                                    <AtomsBreakLine length={1}/>
                                                    <div className='d-flex justify-content-between my-1'>
                                                        <div>
                                                            <AtomsText text_type="main_content" body={elmt.min}/>
                                                        </div>
                                                        <div>
                                                            <AtomsText text_type="main_content" body={countHalf(elmt.max)}/>
                                                        </div>
                                                        <div>
                                                            <AtomsText text_type="main_content" body={elmt.max}/>
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
                                                    type={elmt.is_obsecure == true ? 'password' : elmt.type}
                                                    maxLength={elmt.max}
                                                />
                                        }
                                        <AtomsText text_type="form_error" body={elmt.errorMsg}/>
                                    </div>
                                )
                            } else if (elmt.type === 'textarea') {
                                return (
                                    <div className='col-lg-12 col-md-12 col-sm-12 text-start mb-3' key={idx}>
                                        <AtomsText text_type="form_label" body={elmt.label}/>
                                        <textarea className={elmt.class + " w-100"} rows={elmt.line} onChange={elmt.handleChange}></textarea>
                                        <AtomsText text_type="form_error" body={elmt.errorMsg}/>
                                    </div>
                                )
                            } else if (elmt.type === 'upload') {
                                return (
                                    <div className='col-lg-12 col-md-12 col-sm-12 text-start mb-3' key={idx}>
                                        <AtomsText text_type="form_label" body={elmt.label}/>
                                        <AtomsBreakLine length={2}/>
                                        <input className="form-control" type="file" onChange={elmt.handleChange} /> 
                                        <AtomsText text_type="form_error" body={elmt.errorMsg}/>
                                    </div>
                                )
                            } else if (elmt.type === 'select') {
                                return (
                                    <div className='col-lg-12 col-md-12 col-sm-12 text-start mb-3' key={idx}>
                                        <AtomsText text_type="form_label" body={elmt.label}/>
                                        <MoleculesDropDownDctDynamic url={elmt.url} elmt={elmt} ctx="dropdown"/>
                                        <AtomsText text_type="form_error" body={elmt.errorMsg}/>
                                    </div>
                                )
                            } else if (elmt.type === 'checkbox') {
                                return (
                                    <div className="form-check ms-3" key={idx}>
                                        <input className={elmt.class} type={elmt.type} id="disabledFieldsetCheck" onChange={elmt.handleChange}></input>
                                        <AtomsText text_type="form_label" body={elmt.label}/>
                                    </div>
                                )
                            } else if (elmt.type === 'tag') {
                                return (
                                    <div className="form-check" style={{marginLeft:"-10px"}} key={idx}>
                                        <AtomsText text_type="form_label" body={elmt.label}/>
                                        <AtomsBreakLine length={1}/>
                                        <div className='mt-2'/>
                                        <OrganismsAllTag url={elmt.url} cls={elmt.class} func={elmt.handleChange}/>
                                        <AtomsBreakLine length={2}/>
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