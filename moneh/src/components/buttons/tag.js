// Modules CSS
import button from './buttons.module.css'

// Modules JS
import { ucFirstWord } from '@/modules/helpers/converter'

export default function GetButtonTag({slug, name}) {
    // Convert
    const nameConv = ucFirstWord(name)

    return (
        <a className={button.btn_tag} href={"/news/tag/"+slug} title={"Open news with tag : " + nameConv}>{nameConv}</a>
    )
}
  