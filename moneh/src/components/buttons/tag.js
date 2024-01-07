// Modules CSS
import { ucFirstWord } from '../../modules/helpers/converter'
import button from './buttons.module.css'

// Modules JS

export default function GetButtonTag({slug, name}) {
    // Convert
    const nameConv = ucFirstWord(name)

    return (
        <a className={button.btn_tag} href={"/news/tag/"+slug} title={"Open news with tag : " + nameConv}>{nameConv}</a>
    )
}
  