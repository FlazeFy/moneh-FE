import AtomsButton from "../atoms/atoms_button";
import TemplateSignOut from "../templates/templates_sign_out";

export default function OrganismsNavbar(props) {
    return  (
        <nav id="navbar" className="navbar">
            <ul>
                <li><AtomsButton active={props.active} state="home" url="" title="Home" button_type="main_nav"/></li>
                <li><AtomsButton active={props.active} state="dashboard" url="dashboard" title="Dashboard" button_type="main_nav"/></li>
                <li><AtomsButton active={props.active} state="feature" href="feature" title="Feature" button_type="main_nav"/></li>
                <li><AtomsButton active={props.active} state="visualization" href="visualization" title="Visualization" button_type="main_nav"/></li>
                <li><AtomsButton active={props.active} state="feedback" href="feedback" title="Feedback" button_type="main_nav"/></li>
                <li><AtomsButton active={props.active} state="about" url="about" title="About" button_type="main_nav"/></li>
                <TemplateSignOut active={props.active} />
            </ul>
            <i className="fa-solid fa-bars mobile-nav-toggle" title="Open NavBar"></i>
        </nav>
    )
}