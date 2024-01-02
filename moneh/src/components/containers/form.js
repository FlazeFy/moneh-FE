// Components
import GetLabel from '@/components/labels/label'
import GetBreakLine from '../others/breakLine'
import GetDropDownDctDynamic from '../others/dropdown'

export default function GetFormTemplate({type, props}) {
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
                                    <GetDropDownDctDynamic url={elmt.url} elmt={elmt}/>
                                    <GetLabel title={elmt.errorMsg} type="error"/>
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