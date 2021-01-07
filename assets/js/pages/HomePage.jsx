import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "../../styles/img/comptabilite.jpg";
AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

const HomePage = (props) => {
  return (
    <div className="jumbotron text-center">
      <div>
        <h1 data-aos="fade-down" data-aos-duration="2000" data-aos-easing="ease-out" className="display-3">EasyFacture</h1>
      </div>
      <div>
        <p data-aos="fade-in" data-aos-duration="400" data-aos-easing="ease-out" data-aos-delay="1700" className="lead">
          Nouvelle application tendance pour gérer facilement vos clients et
          factures
        </p>
        <img data-aos="fade-in" src={Image} alt="Comptabilite" />
      </div>
    </div>
  );
};

export default HomePage;
