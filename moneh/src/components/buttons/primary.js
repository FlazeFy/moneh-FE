// Modules CSS
import button from './buttons.module.css'

// Modules JS
import { ucFirstWord } from '@/modules/helpers/converter'

export default function GetButtonPrimary({refs, name, bg}) {
    // Convert
    const nameConv = ucFirstWord(name)

    return (
        <button className={button.btn_primary} style={{background: bg}} href={refs}>{nameConv}</button>
    )
}