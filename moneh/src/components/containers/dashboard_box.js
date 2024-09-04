// Modules CSS
import style from './containers.module.css'

// Components
import AtomsBreakLine from '../../atoms/atoms_breakline'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompress } from "@fortawesome/free-solid-svg-icons"
import { numberToPrice, ucFirstWord } from '../../modules/helpers/converter'

export default function GetDashboardBox({ctx, value, subvalue, ref}) {
    return (
        <div className={style.dashbox}>
            <h4 className="text-dark mb-0">{ctx}</h4>
            <AtomsBreakLine length={1}/>
            <h2 className="text-dark fw-bold mb-1">
            {
                typeof value === 'number' ?
                    numberToPrice(value.toString())
                :
                    ucFirstWord(value)
            }
            </h2>
            {
                subvalue != null ?
                    <b style={{fontSize:"var(--textXLG)"}}>{numberToPrice(subvalue)}</b>
                :
                    <AtomsBreakLine length={1}/>
            }
            <div className='text-end'>
                <a style={{cursor:"pointer"}} href={ref}><FontAwesomeIcon icon={faCompress} size="xl"/></a>
            </div>
        </div>
    )
}