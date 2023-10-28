import { appconfigs } from "../constant";
import { Navigate, useNavigate } from "react-router-dom";

const Header = () => {

    const navigation = useNavigate('');
    return ( 
        <div>
               <header id="header" class="fixed-top " style={{backgroundColor:"#37517e"}}>
                <div class="container d-flex align-items-center">

                <h1 class="logo me-auto"><a href="">{appconfigs.APPNAME}</a></h1>

                    <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid" /></a>

                    <nav id="navbar" class="navbar">
                        <ul>
                            <li><a class="nav-link scrollto" href="#hero">Bus</a></li>
                            <li><a class="nav-link scrollto" href="#about">Drivers</a></li>
                            <li><a class="nav-link scrollto" href="#services">Routes</a></li>
                            <li><a class="nav-link scrollto" href="#portfolio">Time Schedule</a></li>
                            <li><a class="nav-link scrollto" href="#contact">Total Trips</a></li>
                            <li><a class="nav-link scrollto" href="#about">Complaints</a></li>
                        </ul>
                        <i class="bi bi-list mobile-nav-toggle"></i>
                    </nav>

                </div>
            </header>

        </div>
     );
}
 
export default Header;