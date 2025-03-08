import style from './organisms.module.css'
import AtomsBreakLine from '../atoms/atoms_breakline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompress } from "@fortawesome/free-solid-svg-icons"
import { ucFirstWord } from '../modules/helpers/converter'

export default function OrganismsDashboardBox({ctx, value, subvalue, ref}) {
    return (
        <div className={style.dashbox}>
            <h4 className="text-dark mb-0">{ctx}</h4>
            <AtomsBreakLine length={1}/>
            <h2 className="text-dark fw-bold mb-1">
            {
                typeof value == 'object' ? value : ucFirstWord(value)
            }
            </h2>
            {
                subvalue != null ? <b style={{fontSize:"var(--textXLG)"}}>{subvalue}</b> : <AtomsBreakLine length={1}/>
            }
            <div className='text-end'>
                <a style={{cursor:"pointer"}} href={ref}><FontAwesomeIcon icon={faCompress} size="xl"/></a>
            </div>
        </div>
    )
}