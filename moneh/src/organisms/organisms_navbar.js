import AtomsButton from "../atoms/atoms_button";
import TemplateSignOut from "../templates/templates_sign_out";

export default function OrganismsNavbar({active, subactive}) {
    return  (
        <nav id="navbar" className="navbar">
            <ul>
                <li><AtomsButton active={active} state="home" url="" title="Home" text_type="main_nav"/></li>
                <li><AtomsButton active={active} state="dashboard" url="dashboard" title="Dashboard" text_type="main_nav"/></li>
                <li><AtomsButton active={active} state="flow" url="flow" title="Flows" text_type="main_nav"/></li>
                <li><AtomsButton active={active} state="pocket" url="pocket" title="Pocket" text_type="main_nav"/></li>
                <li><AtomsButton active={active} state="calendar" url="calendar" title="Calendar" text_type="main_nav"/></li>
                <li><AtomsButton active={active} state="wishlist" url="wishlist" title="Wishlist" text_type="main_nav"/></li>
                <li>
                    <AtomsButton active={active} state="stats" url="#" title="Stats" text_type="main_nav"/>
                    <div className="collapse" id="collapseStats">
                        <AtomsButton active={subactive} state="stats_flow" url="stats_flow" title="Stats Flows" text_type="sub_nav"/>
                        <AtomsButton active={subactive} state="stats_pocket" url="stats_pocket" title="Stats Pocket" text_type="sub_nav"/>
                        <AtomsButton active={subactive} state="stats_wishlist" url="stats_wishlist" title="Stats Wishlist" text_type="sub_nav"/>
                        <AtomsButton active={subactive} state="stats_others" url="stats_others" title="Stats Others" text_type="sub_nav"/>
                    </div>
                </li>
                <li><AtomsButton active={active} state="about" url="about" title="About" text_type="main_nav"/></li>
                <TemplateSignOut active={active} />
            </ul>
            <i className="fa-solid fa-bars mobile-nav-toggle" title="Open NavBar"></i>
        </nav>
    )
}