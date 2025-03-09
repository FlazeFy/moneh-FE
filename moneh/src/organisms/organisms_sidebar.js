import { faBookBookmark, faChartSimple, faDollarSign, faGear, faInfoCircle, faQuestionCircle, faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AtomsBreakLine from "../atoms/atoms_breakline";
import AtomsButton from "../atoms/atoms_button";
import AtomsText from "../atoms/atoms_text";
import TemplateSignOut from "../templates/templates_sign_out";

export default function OrganismsSidebar(props) {
    return  (
        <nav id="navbar" className="navbar-side">
            <ul>
                <div style={{flexGrow:"1",display:"flex",flexDirection:"column"}}>
                    <AtomsText text_type="sub_heading" body={<div className="text-white">MONEH</div>}/>
                    <hr></hr>
                    <li><AtomsButton active={props.active} state="dashboard" url="dashboard" title={<><span className="icon-box"><FontAwesomeIcon icon={faChartSimple}/></span> Dashboard</>} button_type="main_nav"/></li>
                    <li><AtomsButton active={props.active} state="flow" url="flow" title={<><span className="icon-box"><FontAwesomeIcon icon={faDollarSign} className="mx-1"/></span> Flow</>} button_type="main_nav"/></li>
                    <li><AtomsButton active={props.active} state="pocket" url="pocket" title={<><span className="icon-box"><FontAwesomeIcon icon={faWallet}/></span> Pockets</>} button_type="main_nav"/></li>
                    <li><AtomsButton active={props.active} state="wishlist" url="wishlist" title={<><span className="icon-box"><FontAwesomeIcon icon={faBookBookmark}/></span> Wishlist</>} button_type="main_nav"/></li>
                    <li><AtomsButton active={props.active} state="about" url="about" title={<><span className="icon-box"><FontAwesomeIcon icon={faInfoCircle}/></span> About</>} button_type="main_nav"/></li>
                    <li><AtomsButton active={props.active} state="setting" url="setting" title={<><span className="icon-box"><FontAwesomeIcon icon={faGear}/></span> Setting</>} button_type="main_nav"/></li>
                    <li><AtomsButton active={props.active} state="help" url="help" title={<><span className="icon-box"><FontAwesomeIcon icon={faQuestionCircle}/></span> Help Center</>} button_type="main_nav"/></li>
                </div>
                <hr></hr>
                <div style={{height:"16vh"}}>
                    <li><AtomsButton active={props.active} state="profile" url="profile" title={<><span className="icon-box"><FontAwesomeIcon icon={faUser}/></span> My Profile</>} button_type="main_nav"/></li>
                    <TemplateSignOut active={props.active} is_side_bar={true}/>
                </div>
            </ul>
            <i className="fa-solid fa-bars mobile-nav-toggle" title="Open NavBar"></i>
        </nav>
    )
}