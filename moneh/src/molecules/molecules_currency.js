import { numberToPrice } from "../modules/helpers/converter"
import { commaThousandFormat } from "../modules/helpers/math"

export default function MoleculesCurrency(props) {
    const currency_type = sessionStorage.getItem("currency_type") ?? 'Abbreviated Numeral'

    if(currency_type === 'Abbreviated Numeral'){
        return <>Rp. {numberToPrice(props.val)}</>
    } else if(currency_type === 'Rupiah' || currency_type === 'Rupiah With Zero Sen'){
        return <>Rp. {commaThousandFormat(props.val)}{currency_type === 'Rupiah With Zero Sen' && '.00'}</>
    } else if(currency_type === 'Rupiah Without Format'){
        return <>Rp. {props.val}</>
    }
}