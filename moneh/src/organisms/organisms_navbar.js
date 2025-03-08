import AtomsButton from "../atoms/atoms_button";
import TemplateSignOut from "../templates/templates_sign_out";

export default function OrganismsNavbar({active, subactive}) {
    const getActive = (val, curr) => {
        if(val === curr){
            return "active"
        } else {
            return ""
        }
    }
    
    return  (
        <nav id="navbar" className="navbar">
            <ul>
                <li><AtomsButton active={active} state="home" url="" title="Home" button_type="main_nav"/></li>
                <li><AtomsButton active={active} state="dashboard" url="dashboard" title="Dashboard" button_type="main_nav"/></li>
                <li><AtomsButton active={active} state="flow" url="flow" title="Flows" button_type="main_nav"/></li>
                <li><AtomsButton active={active} state="pocket" url="pocket" title="Pocket" button_type="main_nav"/></li>
                <li><AtomsButton active={active} state="calendar" url="calendar" title="Calendar" button_type="main_nav"/></li>
                <li><AtomsButton active={active} state="wishlist" url="wishlist" title="Wishlist" button_type="main_nav"/></li>
                <li>
                    <a className={"nav-link mb-2 " + getActive(active,"stats")} data-bs-toggle="collapse" href="#collapseStats">Stats</a>
                    <div className="collapse" id="collapseStats">
                        <AtomsButton active={subactive} state="stats_flow" url="stats_flow" title="Stats Flows" button_type="sub_nav"/>
                        <AtomsButton active={subactive} state="stats_pocket" url="stats_pocket" title="Stats Pocket" button_type="sub_nav"/>
                        <AtomsButton active={subactive} state="stats_wishlist" url="stats_wishlist" title="Stats Wishlist" button_type="sub_nav"/>
                        <AtomsButton active={subactive} state="stats_others" url="stats_others" title="Stats Others" button_type="sub_nav"/>
                    </div>
                </li>
                <li><AtomsButton active={active} state="about" url="about" title="About" button_type="main_nav"/></li>
                <TemplateSignOut active={active} />
            </ul>
            <i className="fa-solid fa-bars mobile-nav-toggle" title="Open NavBar"></i>
        </nav>
    )
}