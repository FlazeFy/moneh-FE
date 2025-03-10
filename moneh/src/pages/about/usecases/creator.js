import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AboutCreator() {
    return (
        <div className="mx-4">
            <h1 className="mb-3" style={{fontSize:"74px", fontWeight:"800"}}>About <span className="text-main">Creator</span></h1>
            <h5>My Name is <b>Leo</b>, a Bachelor's degree graduate in Software Engineering from Telkom University
            (2023). Focused on Web Development and Mobile Development. Enjoys exploring new knowledge and seeking challenges.
            If you want to do collaboration or do you want to send me feedback? you can find me on :
            <div style={{fontSize:"calc(var(--textLG)*1.5)"}} className="mt-3">
                <a href="https://www.instagram.com/leonardhorante_08/" className="me-3"><FontAwesomeIcon icon={faInstagram}/></a>
                <a href="https://www.linkedin.com/in/leonardho-rante-sitanggang-a5a752202/" className="me-3"><FontAwesomeIcon icon={faLinkedin}/></a>
                <a href="https://github.com/FlazeFy" className="me-3"><FontAwesomeIcon icon={faGithub}/></a>
                <a href="mailto:flazen.edu@gmail.com"><FontAwesomeIcon icon={faEnvelope}/></a>
            </div>
            </h5>
        </div>
    );
}
