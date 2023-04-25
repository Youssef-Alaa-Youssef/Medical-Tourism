
import tourism from '../../images/tourism.jpg';
import tourism4 from '../../images/tourism4.jpg';
import tourism6 from '../../images/tourism6.jpg';
import '../../components/PopularSlider/PopularSlider.css'
import React from 'react';

function PopularSlider(props){
   return(
    <>
          <div id="carouselExampleSlidesOnly" className="carousel slide mt-5 centerrr" data-bs-ride="carousel">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
              <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner border rounded " >
                    <div class="carousel-item active">
                    <img src={tourism} class="d-block w-100" style={{  backgroundSize:'cover'}} alt="..."/>
                    </div>
                    <div class="carousel-item">
                    <img src={tourism4} class="d-block w-100"  alt="..."/>
                    </div>
                    <div class="carousel-item">
                    <img src={tourism6} class="d-block w-100"  alt="..."/>
                    </div>
                </div>
             </div>
            </div>
    </>
   )
}
export default PopularSlider
