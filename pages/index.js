// pages/index.js
import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Contact from '../components/Contact';
import '../styles/main.css';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('*');
  const [isoInstance, setIsoInstance] = useState(null);

  useEffect(() => {
    // Vérifier que l'on est bien côté client
    if (typeof window !== 'undefined') {
      // Initialiser Swiper
      const swiper = new Swiper('.swiper-container', {
        speed: 1100,
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 5000,
        },
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        },
      });

      // Charger Isotope dynamiquement
      import('isotope-layout').then((Isotope) => {
        const grid = document.querySelector('.grid');
        if (grid) {
          const iso = new Isotope.default(grid, {
            itemSelector: '.grid-item',
            layoutMode: 'fitRows',
            transitionDuration: '0.6s',
          });
          setIsoInstance(iso);
        }
      });

      // Gestion des filtres
      const filterBtns = document.querySelectorAll('.filter-btn');
      const handleFilterClick = (event) => {
        const filterValue = event.target.dataset.filter;
        setActiveFilter(filterValue);
        isoInstance?.arrange({ filter: filterValue });

        filterBtns.forEach((btn) => btn.classList.remove('active'));
        event.target.classList.add('active');
      };

      filterBtns.forEach((btn) => btn.addEventListener('click', handleFilterClick));

      return () => {
        // Cleanup Swiper
        swiper.destroy();
        // Cleanup Isotope
        isoInstance?.destroy();
        // Nettoyage des événements
        filterBtns.forEach((btn) => btn.removeEventListener('click', handleFilterClick));
      };
    }
  }, [isoInstance]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('stop-scrolling', isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('stop-scrolling');
  };

  return (
    <div className="App">
      <header id="header">
        <div className="overlay overlay-lg">
          <img src="./img/shapes/square.png" className="shape square" alt="" />
          <img src="./img/shapes/circle.png" className="shape circle" alt="" />
          <img src="./img/shapes/half-circle.png" className="shape half-circle1" alt="" />
          <img src="./img/shapes/half-circle.png" className="shape half-circle2" alt="" />
          <img src="./img/shapes/x.png" className="shape xshape" alt="" />
          <img src="./img/shapes/wave.png" className="shape wave wave1" alt="" />
          <img src="./img/shapes/wave.png" className="shape wave wave2" alt="" />
          <img src="./img/shapes/triangle.png" className="shape triangle" alt="" />
          {/* <img src="./img/shapes/letters.png" className="letters" alt="" /> */}
          <img src="./img/shapes/points1.png" className="points points1" alt="" />
        </div>

        <nav>
          <div className="container">
            <div className="logo">
              <img src="./img/logoilyas.png" alt="" />
            </div>

            <div className={`links ${isMenuOpen ? 'open' : ''}`}>
              <ul>
                <li><a href="#header">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#hireme" className="active">Hire me</a></li>
              </ul>
            </div>

            <div className="hamburger-menu" onClick={toggleMenu}>
              <div className="bar"></div>
            </div>
          </div>
        </nav>

        <div className="header-content">
          <div className="container grid-2">
            <div className="column-1">
              <h1 className="header-title">EL BAKKALI ILYAS</h1>
              <p className="text">
                Bonjour, je suis Étudiant de 24 ans passionné par les nouvelles technologies et tout ce qui touche à la programmation.
                Je souhaite mettre à profit mes connaissances et acquérir de nouvelles compétences.
              </p>
              <a href="/assets/CV.pdf" className="btn" download="CV.pdf">Download CV</a>
            </div>

            <div className="column-2 image">
              <img src="./img/shapes/points2.png" className="points points2" alt="" />
              <img src="./img/profil1.webp" className="img-element z-index" alt="" />
            </div>
          </div>
        </div>
      </header>

      <section className="services section" id="services">
        <div className="container">
          <div className="section-header">
            <h3 className="title" data-title="What I Do">Services</h3>
            <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, vero?
            </p>
          </div>

          <div className="cards">
            <div className="card-wrap">
              <img src="./img/shapes/points3.png" className="points points1 points-sq" alt="" />
              <div className="card" data-card="UI/UX">
                <div className="card-content z-index">
                  <img src="./img/design-icon.png" className="icon" alt="" />
                  <h3 className="title-sm">Web Design</h3>
                  <p className="text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam est suscipit itaque?
                  </p>
                  <a href="#" className="btn small">Read more</a>
                </div>
              </div>
            </div>
            <div className="card-wrap">
              <div className="card" data-card="Code">
                <div className="card-content z-index">
                  <img src="./img/code-icon.png" className="icon" alt="" />
                  <h3 className="title-sm">Web Development</h3>
                  <p className="text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores suscipit nobis dolore?
                  </p>
                  <a href="#" className="btn small">Read more</a>
                </div>
              </div>
            </div>
            <div className="card-wrap">
              <img src="./img/shapes/points3.png" className="points points2 points-sq" alt="" />
              <div className="card" data-card="App">
                <div className="card-content z-index">
                  <img src="./img/app-icon.png" className="icon" alt="" />
                  <h3 className="title-sm">App Development</h3>
                  <p className="text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum hic veniam nihil.
                  </p>
                  <a href="#" className="btn small">Read more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio section" id="portfolio">
        <div className="background-bg">
          <div className="overlay overlay-sm">
            <img src="./img/shapes/half-circle.png" className="shape half-circle1" alt="" />
            <img src="./img/shapes/half-circle.png" className="shape half-circle2" alt="" />
            <img src="./img/shapes/square.png" className="shape square" alt="" />
            <img src="./img/shapes/wave.png" className="shape wave" alt="" />
            <img src="./img/shapes/circle.png" className="shape circle" alt="" />
            <img src="./img/shapes/triangle.png" className="shape triangle" alt="" />
            <img src="./img/shapes/x.png" className="shape xshape" alt="" />
          </div>
        </div>

        <div className="container">
          <div className="section-header">
            <h3 className="title" data-title="My works">Portfolio</h3>
          </div>

          <div className="section-body">
            <div className="filter">
              <button className={`filter-btn ${activeFilter === '*' ? 'active' : ''}`} data-filter="*">All</button>
              <button className={`filter-btn ${activeFilter === '.ui' ? 'active' : ''}`} data-filter=".ui">UI/UX</button>
              <button className={`filter-btn ${activeFilter === '.webdev' ? 'active' : ''}`} data-filter=".webdev">Web Dev</button>
              <button className={`filter-btn ${activeFilter === '.appdev' ? 'active' : ''}`} data-filter=".appdev">Mobile App</button>
              <button className={`filter-btn ${activeFilter === '.logo-design' ? 'active' : ''}`} data-filter=".logo-design">Logo Design</button>
            </div>

            <div className="grid">
              <div className="grid-item logo-design">
                <div className="gallery-image">
                  <img src="./img/portfolio/port1.jpg" alt="" />
                  <div className="img-overlay">
                    <div className="plus"></div>
                    <div className="img-description">
                      <h3>Logo Design</h3>
                      <h5>View Demo</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid-item webdev">
                <div className="gallery-image">
                  <img src="./img/portfolio/port2.png" alt="" />
                  <div className="img-overlay">
                    <div className="plus"></div>
                    <div className="img-description">
                      <h3>Web Development</h3>
                      <h5>View Demo</h5>
                    </div>
                  </div>
                </div>
              </div>
              {/* Add more portfolio items */}
            </div>
            <div className="more-folio">
              <a href="#" className="btn">More Folio</a>
            </div>
          </div>
        </div>
      </section>
      <section className="about section" id="about">
        <div className="container">
          <div className="section-header">
            <h3 className="title" data-title="Who Am I">About me</h3>
          </div>

          <div className="section-body grid-2">
            <div className="column-1">
              <h3 className="title-sm">Hello, I'm</h3>
              <p className="text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Praesentium distinctio doloribus quam? Ut, laudantium a dolore,
                minima repudiandae iure iste molestiae exercitationem earum
                neque tempora?
              </p>
              <div className="skills">
                <div className="skill html">
                  <h3 className="skill-title">HTML</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="90%"></div>
                  </div>
                </div>
                <div className="skill css">
                  <h3 className="skill-title">CSS</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="70%"></div>
                  </div>
                </div>
                <div className="skill js">
                  <h3 className="skill-title">JavaScript</h3>
                  <div className="skill-bar">
                    <div className="skill-progress" data-progress="80%"></div>
                  </div>
                </div>
              </div>
              <a href="#" className="btn">Read more</a>
            </div>

            <div className="column-2 image">
              <img src="./img/shapes/points4.png" className="points" alt="" />
              <img src="./img/about.png" className="z-index" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section class="records">
        <div class="overlay overlay-sm">
          <img src="./img/shapes/square.png" alt="" class="shape square1" />
          <img src="./img/shapes/square.png" alt="" class="shape square2" />
          <img src="./img/shapes/circle.png" alt="" class="shape circle" />
          <img
            src="./img/shapes/half-circle.png"
            alt=""
            class="shape half-circle"
          />
          <img src="./img/shapes/wave.png" alt="" class="shape wave wave1" />
          <img src="./img/shapes/wave.png" alt="" class="shape wave wave2" />
          <img src="./img/shapes/x.png" alt="" class="shape xshape" />
          <img src="./img/shapes/triangle.png" alt="" class="shape triangle" />
        </div>

        <div className="container">
          <div className="wrap">
            <div className="record-circle">
              <h2 className="number" data-num="235">0</h2>
              <h4 className="sub-title">Projects</h4>
            </div>
          </div>

          <div className="wrap">
            <div className="record-circle active">
              <h2 className="number" data-num="174">0</h2>
              <h4 className="sub-title">Happy Clients</h4>
            </div>
          </div>

          <div className="wrap">
            <div className="record-circle">
              <h2 className="number" data-num="892">0</h2>
              <h4 className="sub-title">Work Hour</h4>
            </div>
          </div>

          <div className="wrap">
            <div className="record-circle">
              <h2 className="number" data-num="368">0</h2>
              <h4 className="sub-title">Awards</h4>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="blog section">
        <div className="container">
          <div className="section-header">
            <h3 className="title" data-title="Last News">My blog</h3>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo,
              deserunt?
            </p>
          </div>

          <div className="blog-wrapper">
            <div className="blog-wrap">
              <img
                src="./img/shapes/points3.png"
                alt=""
                className="points points-sq"
              />

              <div className="blog-card">
                <div className="blog-image">
                  <img src="./img/blog1.png" alt="" />
                </div>

                <div className="blog-content">
                  <div className="blog-info">
                    <h5 className="blog-date">March, 19 2020</h5>
                    <h5 className="blog-user"><i className="fas fa-user"></i>Admin</h5>
                  </div>
                  <h3 className="title-sm">This is a short title</h3>
                  <p className="blog-text">
                    Lorem ipsum, dolor sit amet elit. rem poimus? Tempora
                    expedita eos autem! Lorem ipsum, dolor sit met.
                  </p>
                  <a href="#" className="btn small">Read more</a>
                </div>
              </div>
            </div>

            <div className="blog-wrap">
              <div className="blog-card">
                <div className="blog-image">
                  <img src="./img/blog2.png" alt="" />
                </div>

                <div className="blog-content">
                  <div className="blog-info">
                    <h5 className="blog-date">August, 02 2020</h5>
                    <h5 className="blog-user"><i className="fas fa-user"></i>Admin</h5>
                  </div>
                  <h3 className="title-sm">This is a short title</h3>
                  <p className="blog-text">
                    Lorem ipsum, dolor sit amet elit. Sint atque culpa repellat
                    sunt sit amet nobis! Lorem ipsum dolor sit amet.
                  </p>
                  <a href="#" className="btn small">Read more</a>
                </div>
              </div>
            </div>

            <div className="blog-wrap">
              <div className="blog-card">
                <div className="blog-image">
                  <img src="./img/blog3.png" alt="" />
                </div>

                <div className="blog-content">
                  <div className="blog-info">
                    <h5 className="blog-date">December, 12 2020</h5>
                    <h5 className="blog-user"><i className="fas fa-user"></i>Admin</h5>
                  </div>
                  <h3 className="title-sm">This is a short title</h3>
                  <p className="blog-text">
                    Lorem ipsum dolor sit, amet elit. enim numquam, laborum
                    earum? Lorem ipsum dolor sit amet.
                  </p>
                  <a href="#" className="btn small">Read more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="testimonials section" id="testimonials">
        <div className="container">
          <div className="section-header">
            <h3 className="title" data-title="What People Say">Testimonials</h3>
          </div>

          <div className="testi-content grid-2">
            <div className="column-1 reviews">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide review">
                    <i className="fas fa-quote-left quote"></i>
                    <div className="rate">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>

                    <p className="review-text">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Laudantium adipisci veniam debitis quas, sapiente
                      repellendus mollitia. Laboriosam labore voluptate quos?
                    </p>

                    <div className="review-info">
                      <h3 className="review-name">Matias Butt</h3>
                      <h5 className="review-job">Photographer, Paris</h5>
                    </div>
                  </div>

                  <div className="swiper-slide review">
                    <i className="fas fa-quote-left quote"></i>
                    <div className="rate">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>

                    <p className="review-text">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Fugiat voluptate consequatur aut tenetur fugit error
                      molestiae quaerat ex odio rem?
                    </p>

                    <div className="review-info">
                      <h3 className="review-name">Romeo Herbert</h3>
                      <h5 className="review-job">CEO, Munich</h5>
                    </div>
                  </div>

                  <div className="swiper-slide review">
                    <i className="fas fa-quote-left quote"></i>
                    <div className="rate">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>

                    <p className="review-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cupiditate voluptatum enim nemo quod amet dolorum aliquam,
                      sapiente omnis eaque consectetur.
                    </p>

                    <div className="review-info">
                      <h3 className="review-name">Jack Costa</h3>
                      <h5 className="review-job">Director of THR, London</h5>
                    </div>
                  </div>

                  <div className="swiper-slide review">
                    <i className="fas fa-quote-left quote"></i>
                    <div className="rate">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>

                    <p className="review-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Perspiciatis ab incidunt, dicta quam inventore ipsum
                      dolor. Consectetur nam incidunt error!
                    </p>

                    <div className="review-info">
                      <h3 className="review-name">Reiss Mccartney</h3>
                      <h5 className="review-job">Engineer, San Francisco</h5>
                    </div>
                  </div>
                </div>

                <div className="review-nav swiper-button-prev">
                  <i className="fas fa-long-arrow-alt-left"></i>
                </div>
                <div className="review-nav swiper-button-next">
                  <i className="fas fa-long-arrow-alt-right"></i>
                </div>
              </div>
            </div>

            <div className="column-2 image">
              <img src="./img/testi.png" alt="" className="img-element" />
            </div>
          </div>
        </div>
      </section>

      <Contact />

      <section className="hireme" id="hireme">
        <div className="container">
          <h3 className="title">Let's talk about a project</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio,
            culpa. Commodi suscipit animi officia dignissimos unde, ipsum fugiat
            consequuntur, fugit ratione vel aperiam, similique distinctio
            mollitia repellendus quasi rem vero!
          </p>
          <a href="#" className="btn">Hire me</a>
        </div>
      </section>
      <footer className="footer">
  <div className="container">
    <div className="footer-content">
      <ul className="footer-links">
        <li>
          <a href="https://www.linkedin.com/in/ilyas-el-bakkali/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i> LinkedIn
          </a>
        </li>
        <li>
          <a href="mailto:ilyas.elbakkali101@gmail.com">
            <i className="fas fa-envelope"></i> ilyas.elbakkali101@gmail.com
          </a>
        </li>
        <li>
        <a href="tel:+2126XXXXXXXX">
          <i className="fas fa-phone"></i> +33753691867
        </a>
      </li>
      </ul>
    </div>
    <div className="bottom-footer">
      <p>© 2025 Tous droits réservés | Fait par <span>El Bakkali Ilyas</span></p>
    </div>
  </div>
</footer>

    </div>
  );
};