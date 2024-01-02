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
                <li><a className={"nav-link " + getActive(active,"book")} href="/book">Book</a></li>
                <li><a className={"nav-link " + getActive(active,"news")} href="/news">News</a></li>
                <li>
                    <a className={"nav-link mb-2 " + getActive(active,"stats")} data-bs-toggle="collapse" href="#collapseStats">Stats</a>
                    <div className="collapse" id="collapseStats">
                        <a className={"nav-link sub mb-2 " + getActive(subactive,"stats_animals")} href="/stats_animals">Stats Animals</a>
                        <a className={"nav-link sub mb-2 " + getActive(subactive,"stats_news")} href="/stats_news">Stats News</a>
                        <a className={"nav-link sub mb-2 " + getActive(subactive,"stats_others")} href="/stats_others">Stats Others</a>
                    </div>
                </li>
                <li>
                    <a className={"nav-link mb-2 " + getActive(active,"manage")} data-bs-toggle="collapse" href="#collapseManage">Manage</a>
                    <div className="collapse" id="collapseManage">
                        <a className={"nav-link sub mb-2 " + getActive(subactive,"manage_book")} href="/manage_book">Manage Book</a>
                        <a className={"nav-link sub mb-2 " + getActive(subactive,"manage_news")} href="/manage_news">Manage News</a>
                        <a className={"nav-link sub mb-2 " + getActive(subactive,"manage_dct")} href="/manage_dct">Manage Dictionary</a>
                    </div>
                </li>
                <li><a className={"nav-link " + getActive(active,"about")} href="/about">About</a></li>
            </ul>
            <i className="fa-solid fa-bars mobile-nav-toggle" title="Open NavBar"></i>
        </nav>
    )
}