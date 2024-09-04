import style from './molecules.module.css'
import { toast } from 'react-toastify'
import MoleculesToast from './molecules_toast'

export default function MoleculesFilterOrder({ctx}) {
    function navigate(ctx, ord){
        sessionStorage.setItem(`Table_order_${ctx}`, ord)
        toast.success(<MoleculesToast msg={ctx + " filtered"} />)
    }

    return (
        <>       
            {
                sessionStorage.getItem(`Table_order_${ctx}`) === "desc" ? 
                    <button className={style.control_box} onClick={(e) => navigate(ctx,"asc")}>Order By Descending</button>
                :
                    <button className={style.control_box} onClick={(e) => navigate(ctx,"desc")}>Order By Ascending</button>
            }
        </>
    )
}