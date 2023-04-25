import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../images/tooth.svg";
import Pagination from 'react-bootstrap/Pagination';
import Search from "../Search/Search";

export default function Dentistry() {


  const [Dentistry, setDentistry] = useState([]);

  useEffect(() => {
    Render_Treatments()
  }, []);


  //////////////// Search
  const Render_Treatments = () => {
    axios.get('http://127.0.0.1:8000/treatments?specilization=Dental')
      .then(response => {
        const hairTreatments = response.data;
        setDentistry(hairTreatments);
      })
      .catch(err => { console.log(err) });;
  }

  const ChangeInfo = async (e) => {
    if (e.target.value) {
      axios.post("http://localhost:8000/searchtreatments", { 'name': e.target.value, 'speicilization': 'Dental' })
        .then(response => setDentistry(response.data.treatments)).catch(err => console.log(err))
    } else {
      Render_Treatments()
    }
  }



  return (
    <>
      <div className="container">
      <div className='shadow my-5' style={{ height: "8.7vh", background: "#72d5ca8a", display: "flex", alignItems: "center", justifyContent: "center" }}>
  <h1 style={{ color: "#fff", fontSize: "3rem" }}><i class="fa-solid fa-stethoscope  me-2 ms-4"></i> Dentistry</h1>
</div>
        <form role="search">
        {/* <label for="staticEmail" class="col-sm-2 col-form-label">Dentistry</label> */}
          <input
            style={{ width: "35vw" }}
            className="mx-auto  p-2 form-control rounded-pill"
            type="search"
            placeholder={`Search About  Dental Treatment Centers`}
            aria-label="Search"
            onChange={(e) => ChangeInfo(e)}
          />
        </form>        <div className="row g-4 my-3" >
          <div className="col-md-3 text-center">
            {/* <h1 className="mt-3 animate__flash">Dentistry</h1> */}
            <img src={Image} alt="Logo" />
            <p className="text-muted mt-5">
              We have the best doctors all over the world
            </p>
          </div>
          {Dentistry.length > 0 ? (
            Dentistry.map((item, index) => {
              return (
                <div className="col-lg-3 shadow" key={index} movie={item}>
                  <Link
                    className="btn btn-outline-light mb-2"
                    to={`/detail/${item.id}`}
                  >
                    <div className="position-relative overflow-hidden">
                      <div className="row">
                        {item.picture ? (
                          <img
                            src={`http://127.0.0.1:8000/${item.picture}`}
                            alt="Movie"
                            className="w-100"
                            style={{ borderRadius: "30px", height: "420px" }}
                          />
                        ) : (
                          <img src="https://image.tmdb.org/t/p/w500//sv1xJUazXeYqALzczSZ3O6nkH75.jpg" alt="Alternative" />
                        )}
                      </div>
                      <h1></h1>
                      <p
                        className="position-absolute top-0 p-2 text-black"
                        style={{ backgroundColor: "#D0E8F2" }}
                      >
                        {parseFloat(item.rating).toFixed(1)}
                      </p>
                      <h1 className="h6 text-black">{item.name}</h1>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            < div className="col-6 container d-flex justify-content-center align-items-center mt-5" style={{color:"#72d5ca8a"}}>
    <h2 className="animate__flash">No dental treatments found</h2>
</div>
          )}

         
        </div>
      </div>
    </>
  );
}