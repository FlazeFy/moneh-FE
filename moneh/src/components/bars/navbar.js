//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faXmark} from "@fortawesome/free-solid-svg-icons"
import { getLocal } from "../../modules/storages/local";
import { isLogged } from "../../modules/helpers/auth";

export default function GetNavbar({active, subactive}) {
    function getActive(val, curr){
        if(val == curr){
            return "active";
        } else {
            return "";
        }
    }

    return  (
        <nav id="navbar" className="navbar">
            <ul>
                <li><a className={"nav-link " + getActive(active,"home")} href="/">Home</a></li>
                <li><a className={"nav-link " + getActive(active,"dashboard")} href="/dashboard">Dashboard</a></li>
                <li><a className={"nav-link " + getActive(active,"flow")} href="/flow">Flows</a></li>
                <li><a className={"nav-link " + getActive(active,"pocket")} href="/pocket">Pocket</a></li>
                <li><a className={"nav-link " + getActive(active,"calendar")} href="/calendar">Calendar</a></li>
                <li><a className={"nav-link " + getActive(active,"wishlist")} href="/wishlist">Wishlist</a></li>
                <li>
                    <a className={"nav-link mb-2 " + getActive(active,"stats")} data-bs-toggle="collapse" href="#collapseStats">Stats</a>
                    <div className="collapse" id="collapseStats">
                        <a className={"nav-link sub mb-2 " + getActive(subactive,"stats_flow")} href="/stats_flow">Stats Flows</a>
                        <a className={"nav-link sub mb-2 " + getActive(subactive,"stats_pocket")} href="/stats_pocket">Stats Pocket</a>
                        <a className={"nav-link sub mb-2 " + getActive(subactive,"stats_wishlist")} href="/stats_wishlist">Stats Wishlist</a>
                        <a className={"nav-link sub mb-2 " + getActive(subactive,"stats_others")} href="/stats_others">Stats Others</a>
                    </div>
                </li>
                <li><a className={"nav-link " + getActive(active,"about")} href="/about">About</a></li>
                <li>
                    <a className={"nav-link " + isLogged('bg-danger text-white', 'bg-success text-white') + getActive(active,"login")} href="/login">
                        {isLogged(<FontAwesomeIcon icon={faXmark} size="2xl"/>, <FontAwesomeIcon icon={faRightFromBracket} size="xl"/>)}
                    </a>
                </li>
            </ul>
            <i className="fa-solid fa-bars mobile-nav-toggle" title="Open NavBar"></i>
        </nav>
    )
}