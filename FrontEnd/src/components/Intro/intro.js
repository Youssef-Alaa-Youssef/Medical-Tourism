
import 'animate.css';
import './intro.css';
import Typed from 'typed.js';
import { useEffect, useRef } from "react";

function Intro() {
  const el = useRef(null);
  useEffect(() => {
    if (el.current) {
      // create a new Typed.js instance
      const typed = new Typed(el.current, {
        strings: ['Tourism', 'Medical'],
        typeSpeed: 200,
        backSpeed: 40,
        loop: true
      });

      // destroy the Typed.js instance when the component unmounts
      return () => {
        typed.destroy();
      };
    }
  }, []);
  return (
    <div className='container mb-5' id="intro" style={{ height: "100vh" }}>
      <div className='row'>
        <div className='text-center col-sm-12 m-auto text-light' style={{ color: "#00334E" }}>
          <h1 className='animate__animated animate__bounceInRight mb-5 fw-bold' style={{ color: "#00334E", fontSize: "63px", fontFamily: "Open Sans" }}>Welcome to our world of <br /> <span ref={el}></span> !</h1>
          <p className='animate__animated animate__bounceInLeft mt-2 fs-4  text-center m-auto' style={{ color: "#00334E", width: "61vw" }}>We're committed to providing you with world-class medical care combined with an unforgettable travel experience,using the latest technologies and techniques to ensure the best possible outcomes</p>
          <button type="button" className="mainBtn btn btn-outline-dark px-5 py-2 mt-5 fs-3 rounded-pill"><a href="#den">Discover Now</a></button>
        </div>
      </div>
    </div>
  )
}
export default Intro;



