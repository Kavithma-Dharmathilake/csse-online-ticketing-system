import React from 'react';
import { useNavigate } from "react-router-dom";
import { appconfigs } from './constant';


const Home = () => {

    const navigation = useNavigate();
    return (
        <div>

            <header id="header" class="fixed-top " style={{backgroundColor:"#37517e"}}>
                <div class="container d-flex align-items-center">

                <h1 class="logo me-auto"><a onPress={(navigation('/'))}>{appconfigs.APPNAME}</a></h1>

                    <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid" /></a>

                    <nav id="navbar" class="navbar">
                        <ul>
                            <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
                            <li><a class="nav-link scrollto" href="#about">About</a></li>
                            <li><a class="nav-link scrollto" href="#services">Services</a></li>
                            <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
                            <li><a class="getstarted scrollto" onClick={() => { navigation("/login"); }}>Get Started</a></li>
                        </ul>
                        <i class="bi bi-list mobile-nav-toggle"></i>
                    </nav>

                </div>
            </header>


            <section id="hero" class="d-flex align-items-center">

                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
                            <h1>Better Solutions For Your Journey</h1>
                            <h2></h2>
                            <div class="d-flex justify-content-center justify-content-lg-start">
                                <a href="#about" class="btn-get-started scrollto">Get Started</a>
                            </div>
                        </div>
                        <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
                            <img src="./assets/img/hero-img.png" class="img-fluid animated" alt="" />
                        </div>
                    </div>
                </div>

            </section>

            <main id="main">


          
   

   
    <section id="about" class="about">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>About Us</h2>
        </div>

        <div class="row content">
          <div class="col-lg-6">
            <p>
            At EASYRIDES, we are driven by a commitment to revolutionize the way you travel. Our online transport ticketing system is the product of innovation and dedication, designed to enhance your journey from the moment you book your ticket to your arrival at your destination..
            </p>
            <ul>
              <li><i class="ri-check-double-line"></i>Real-Time Updates</li>
              <li><i class="ri-check-double-line"></i> Secure Payments</li>
              <li><i class="ri-check-double-line"></i> User-Friendly Experience</li>
            </ul>
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0">
            <p>
            Join us on this exciting journey, and experience travel like never before. 
            We're here to make your every trip a memorable and enjoyable adventure. 
            Thank you for choosing EASY RIDES for all your travel needs
            </p>
            <a href="#" class="btn-learn-more">Learn More</a>
          </div>
        </div>

      </div>
    </section>
    <section id="why-us" class="why-us section-bg">
      <div class="container-fluid" data-aos="fade-up">

        <div class="row">

          <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">

            <div class="content">
              <h3>Why Choose Us <strong>EASY RIDES for your journey?</strong></h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
              </p>
            </div>

            <div class="accordion-list">
              <ul>
                <li>
                  <a data-bs-toggle="collapse" class="collapse" data-bs-target="#accordion-list-1"><span>01</span>  Convenience at Your Fingertips:  <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                  <div id="accordion-list-1" class="collapse show" data-bs-parent=".accordion-list">
                    <p>
                    We bring the ticket counter to your device, allowing you to book tickets anytime, anywhere, with just a few clicks. No more waiting in long lines or rushing to stations.
                    </p>
                  </div>
                </li>

                <li>
                  <a data-bs-toggle="collapse" data-bs-target="#accordion-list-2" class="collapsed"><span>02</span>  Real-Time Updates <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                  <div id="accordion-list-2" class="collapse" data-bs-parent=".accordion-list">
                    <p>
                    Stay ahead of your travel plans with real-time updates on departure and arrival times. Say goodbye to uncertainty and travel stress.                    </p>
                  </div>
                </li>

                <li>
                  <a data-bs-toggle="collapse" data-bs-target="#accordion-list-3" class="collapsed"><span>03</span> User-Centric Experience: <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                  <div id="accordion-list-3" class="collapse" data-bs-parent=".accordion-list">
                    <p>
                    Designed with you in mind, our user-friendly interface ensures that booking tickets is a seamless process, even for those new to online ticketing.                    </p>
                  </div>
                </li>

              </ul>
            </div>

          </div>

          <div class="col-lg-5 align-items-stretch order-1 order-lg-2 img" style={{ backgroundImage:"assets/img/why-us.png"}} data-aos="zoom-in" data-aos-delay="150">&nbsp;</div>
        </div>

      </div>
    </section>
    
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Services</h2>
          <p>we're offering you a gateway to your destination. We're dedicated to making your journey as pleasant, efficient, and memorable as possible. Choose us, and embark on a travel experience like never before</p>
        </div>

        <div class="row">
          <div class="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-box">
              <div class="icon"><i class="bx bxl-dribbble"></i></div>
              <h4><a href="">Extensive Network</a></h4>
              <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-file"></i></div>
              <h4><a href="">Real-Time Updates</a></h4>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-tachometer"></i></div>
              <h4><a href="">User-Centric Experience</a></h4>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="400">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-layer"></i></div>
              <h4><a href="">Convenience at Your Fingertips</a></h4>
              <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
            </div>
          </div>

        </div>

      </div>
    </section>
    <>
  {/* ======= Cta Section ======= */}
  <section id="cta" className="cta">
    <div className="container" data-aos="zoom-in">
      <div className="row">
        <div className="col-lg-9 text-center text-lg-start">
          <h3>Call To Action</h3>
          <p>
            {" "}
            Book your journey today and experience hassle-free travel with us!
          </p>
        </div>
        <div className="col-lg-3 cta-btn-container text-center">
          <a className="cta-btn align-middle" href="#">
            Call To Action
          </a>
        </div>
      </div>
    </div>
  </section>
  {/* End Cta Section */}

</>
<>
  {/* ======= Frequently Asked Questions Section ======= */}
  <section id="faq" className="faq section-bg">
    <div className="container" data-aos="fade-up">
      <div className="section-title">
        <h2>Frequently Asked Questions</h2>
        <p>
          Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex
          aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos
          quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia
          fugiat sit in iste officiis commodi quidem hic quas.
        </p>
      </div>
      <div className="faq-list">
        <ul>
          <li data-aos="fade-up" data-aos-delay={100}>
            <i className="bx bx-help-circle icon-help" />{" "}
            <a
              data-bs-toggle="collapse"
              className="collapse"
              data-bs-target="#faq-list-1"
            >
              Non consectetur a erat nam at lectus urna duis?{" "}
              <i className="bx bx-chevron-down icon-show" />
              <i className="bx bx-chevron-up icon-close" />
            </a>
            <div
              id="faq-list-1"
              className="collapse show"
              data-bs-parent=".faq-list"
            >
              <p>
                Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id
                volutpat lacus laoreet non curabitur gravida. Venenatis lectus
                magna fringilla urna porttitor rhoncus dolor purus non.
              </p>
            </div>
          </li>
          <li data-aos="fade-up" data-aos-delay={200}>
            <i className="bx bx-help-circle icon-help" />{" "}
            <a
              data-bs-toggle="collapse"
              data-bs-target="#faq-list-2"
              className="collapsed"
            >
              Feugiat scelerisque varius morbi enim nunc?{" "}
              <i className="bx bx-chevron-down icon-show" />
              <i className="bx bx-chevron-up icon-close" />
            </a>
            <div
              id="faq-list-2"
              className="collapse"
              data-bs-parent=".faq-list"
            >
              <p>
                Dolor sit amet consectetur adipiscing elit pellentesque habitant
                morbi. Id interdum velit laoreet id donec ultrices. Fringilla
                phasellus faucibus scelerisque eleifend donec pretium. Est
                pellentesque elit ullamcorper dignissim. Mauris ultrices eros in
                cursus turpis massa tincidunt dui.
              </p>
            </div>
          </li>
          <li data-aos="fade-up" data-aos-delay={300}>
            <i className="bx bx-help-circle icon-help" />{" "}
            <a
              data-bs-toggle="collapse"
              data-bs-target="#faq-list-3"
              className="collapsed"
            >
              Dolor sit amet consectetur adipiscing elit?{" "}
              <i className="bx bx-chevron-down icon-show" />
              <i className="bx bx-chevron-up icon-close" />
            </a>
            <div
              id="faq-list-3"
              className="collapse"
              data-bs-parent=".faq-list"
            >
              <p>
                Eleifend mi in nulla posuere sollicitudin aliquam ultrices
                sagittis orci. Faucibus pulvinar elementum integer enim. Sem
                nulla pharetra diam sit amet nisl suscipit. Rutrum tellus
                pellentesque eu tincidunt. Lectus urna duis convallis convallis
                tellus. Urna molestie at elementum eu facilisis sed odio morbi
                quis
              </p>
            </div>
          </li>
          <li data-aos="fade-up" data-aos-delay={400}>
            <i className="bx bx-help-circle icon-help" />{" "}
            <a
              data-bs-toggle="collapse"
              data-bs-target="#faq-list-4"
              className="collapsed"
            >
              Tempus quam pellentesque nec nam aliquam sem et tortor consequat?{" "}
              <i className="bx bx-chevron-down icon-show" />
              <i className="bx bx-chevron-up icon-close" />
            </a>
            <div
              id="faq-list-4"
              className="collapse"
              data-bs-parent=".faq-list"
            >
              <p>
                Molestie a iaculis at erat pellentesque adipiscing commodo.
                Dignissim suspendisse in est ante in. Nunc vel risus commodo
                viverra maecenas accumsan. Sit amet nisl suscipit adipiscing
                bibendum est. Purus gravida quis blandit turpis cursus in.
              </p>
            </div>
          </li>
          <li data-aos="fade-up" data-aos-delay={500}>
            <i className="bx bx-help-circle icon-help" />{" "}
            <a
              data-bs-toggle="collapse"
              data-bs-target="#faq-list-5"
              className="collapsed"
            >
              Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis
              nunc eget lorem dolor?{" "}
              <i className="bx bx-chevron-down icon-show" />
              <i className="bx bx-chevron-up icon-close" />
            </a>
            <div
              id="faq-list-5"
              className="collapse"
              data-bs-parent=".faq-list"
            >
              <p>
                Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris
                vitae ultricies leo integer malesuada nunc vel. Tincidunt eget
                nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed.
                Ut venenatis tellus in metus vulputate eu scelerisque.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
  {/* End Frequently Asked Questions Section */}
  {/* ======= Contact Section ======= */}
  <section id="contact" className="contact">
    <div className="container" data-aos="fade-up">
      <div className="section-title">
        <h2>Contact</h2>
       
      </div>
      <div className="row">
        <div className="col-lg-5 d-flex align-items-stretch">
          <div className="info">
            <div className="address">
              <i className="bi bi-geo-alt" />
              <h4>Location:</h4>
              <p>SLIIT, Malabe, Sri Lanka</p>
            </div>
            <div className="email">
              <i className="bi bi-envelope" />
              <h4>Email:</h4>
              <p>info@example.com</p>
            </div>
            <div className="phone">
              <i className="bi bi-phone" />
              <h4>Call:</h4>
              <p>+1 5589 55488 55s</p>
            </div>
           
          </div>
        </div>
        <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
          <form
            action="forms/contact.php"
            method="post"
            role="form"
            className="php-email-form"
          >
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  required=""
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="name">Your Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  required=""
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Subject</label>
              <input
                type="text"
                className="form-control"
                name="subject"
                id="subject"
                required=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Message</label>
              <textarea
                className="form-control"
                name="message"
                rows={10}
                required=""
                defaultValue={""}
              />
            </div>
            <div className="my-3">
              <div className="loading">Loading</div>
              <div className="error-message" />
              <div className="sent-message">
                Your message has been sent. Thank you!
              </div>
            </div>
            <div className="text-center">
              <button type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  {/* End Contact Section */}
  {/* End #main */}
  {/* ======= Footer ======= */}
  <footer id="footer">
   
    <div className="container footer-bottom clearfix">
      <div className="copyright">
        © Copyright{" "}
        <strong>
          <span>Easy Rides</span>
        </strong>
        . All Rights Reserved
      </div>
      <div className="credits">
      
      </div>
    </div>
  </footer>
  {/* End Footer */}

</>


            </main>
           
          
        </div>
    );
}

export default Home;