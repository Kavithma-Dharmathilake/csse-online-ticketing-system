import { appconfigs } from "./constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigate('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("login");
        navigation('/dashboard')
    }


    return (
        <div>
            <header id="header" class="fixed-top ">
                <div class="container d-flex align-items-center">

                    <h1 class="logo me-auto"><a href="">{appconfigs.APPNAME}</a></h1>

                    <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid" /></a>

                    <nav id="navbar" class="navbar">
                        <ul>
                            <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
                            <li><a class="nav-link scrollto" href="#about">About</a></li>
                            <li><a class="nav-link scrollto" href="#services">Services</a></li>
                            <li><a class="nav-link   scrollto" href="#portfolio">Portfolio</a></li>
                            <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
                            <li><a class="getstarted scrollto" href="#about">Get Started</a></li>
                        </ul>
                        <i class="bi bi-list mobile-nav-toggle"></i>
                    </nav>

                </div>
            </header>


            <section id="hero2" class="d-flex align-items-center" >

                <div class="container">

                    <section id="contact" className="contact">
                        <div className="container" data-aos="fade-up">
                            <div className="section-title">
                                <h1>LOGIN</h1>
                            </div>
                            <div className="row">
                                <div className="col-lg-5 d-flex align-items-stretch">
                                    <div className="info">
                                        <div className="address">
                                            <i className="bi bi-geo-alt" />
                                            <h4>Location:</h4>
                                            <p>SLIIT Shuttle Service, Malabe, Sri Lanka</p>
                                        </div>
                                        <div className="email">
                                            <i className="bi bi-envelope" />
                                            <h4>Email:</h4>
                                            <p>info@example.com</p>
                                        </div>
                                        <div className="phone">
                                            <i className="bi bi-phone" />
                                            <h4>Call:</h4>
                                            <p>+941235678</p>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                                    <form
                                        onSubmit={handleSubmit}
                                        method="post"
                                        role="form"
                                        className="php-email-form"
                                    >

                                        <div className="form-group">
                                            <label htmlFor="name">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="subject"
                                                id="subject"
                                                required="true"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="subject"
                                                id="subject"
                                                required="true"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                            />
                                        </div>

                                        <div className="text-center">
                                            <button type="submit">Login</button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </section>


                </div>



            </section>

        </div>
    );
}

export default Login;