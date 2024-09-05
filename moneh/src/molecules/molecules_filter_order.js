import { getToast } from '../modules/helpers/generator'
import style from './molecules.module.css'

export default function MoleculesFilterOrder({ctx, onPostSuccess}) {
    function navigate(ctx, ord){
        sessionStorage.setItem(`Table_order_${ctx}`, ord)
        if (onPostSuccess) onPostSuccess()
        getToast(ctx)
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