import React from "react";
import Image3 from "../../images/dentist.jpg";
import Image2 from "../../images/doctor.jpg";


export default function SliderTreatment() {
  return (
    <>
      <div
        id="carouselExampleCaptions"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
        style={{ height: "100vh" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
      
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={Image2}
              className="d-block w-100"
              style={{ height: "100vh" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={Image3}
              className="d-block w-100"
              style={{ height: "100vh" }}
              alt="..."
            />
          </div>

        </div>
        <button
          className="carousel-control-prev "
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon text-dark"
            aria-hidden="true"
          />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}