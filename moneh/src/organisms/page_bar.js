import { isNumInRange } from "../modules/helpers/math";
import style from "./organisms.module.css"

export default function OrganismsPageBar({curr, max, ctx}) {
    function navigate(idx, ctx){
        sessionStorage.setItem(`Table_${ctx}`, idx);
        window.location.reload(false)
    }

    return (
        <>       
            <h5 className="text-white">Page</h5>
            {
                Array.from({ length: max }).map((_, index) => (
                    curr !== index && index != 0 && isNumInRange(curr, index, 20) ?
                        <button className={style.page_bar} onClick={(e) => navigate(index, ctx)} key={index}>{ index }</button>
                    : curr === index && index != 0 && isNumInRange(curr, index, 20) ?
                        <button className={style.page_bar_active} onClick={(e) => navigate(index, ctx)} key={index}>{ index }</button>
                    :
                    <div key={index}></div>
                ))
            }
        </>
    )
}