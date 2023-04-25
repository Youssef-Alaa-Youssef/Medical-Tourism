import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import { useRef } from "react";

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTourismPlaces({ onAdd }) {


  ///////////////////////////////
const [info, setInfo] = useState({
    name: "",
    location: "",
    rating: "",
    start_time: "",
    end_time: "",
    price: "",
    image: "",
    tourismCompany: ""
})
  

  //////////////////////////////////
  const navigate = useNavigate(); // create navigate function

  const [error, setErr] = useState({
    nameErr: "",
    locationErr: "",
    ratingErr: "",
    start_timeErr: "",
    end_timeErr: "",
    priceErr: "",
    imageErr: "",
    tourismCompanyErr: "",
    empty:""
  })
  ///////////////////////////////////
    const ValidateDoctor = (e) => {
        if (e.target.name === "name") {
            if (e.target.value.length === 0) {
                setErr({
                    ...error,
                    nameErr: "Name is required"
                })
                e.target.style.border = "2px solid red"
                e.target.style.outline = "none"
            }
            else if (!/([a-zA-Z])\w+/i.test(e.target.value)) {
                setErr({
                    ...error,
                    nameErr: "Please enter character only"
                })
                e.target.style.border = "2px solid red"
                e.target.style.outline = "none"
            } else {
                setErr({
                    ...error,
                    nameErr: ""
                })
                setInfo({
                    ...info,
                    name: e.target.value,
                })
                e.target.style.border = "2px solid green"
            }
        }
        else if (e.target.name === "location") {
            if (e.target.value.length === 0) {
                setErr({
                    ...error,
                    locationErr: "location is required"
                })
                e.target.style.border = "2px solid red"
                e.target.style.outline = "none"

            }
            else {
                setErr({
                    ...error,
                    locationErr: ""
                })
                setInfo({
                    ...info,
                    location: e.target.value
                })
                e.target.style.border = "2px solid green"


            }
        }
     else if (e.target.name === "rating") {
      if (e.target.value.length === 0) {

        setErr({
          ...error,
          ratingErr: "Rating is required"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      } else if (!/^[1-5]$/.test(e.target.value)) {
        setErr({
          ...error,
          ratingErr: "Rating must be an integer between 1 and 5"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      } else {
        setErr({
          ...error,
          ratingErr: ""
        })
        setInfo({
          ...info,
          rating: e.target.value,
        })
        e.target.style.border = "2px solid green"
      }
    } else if (e.target.name === "start_time") {
      setInfo({
        ...info,
        start_time: e.target.value,
      })
      e.target.style.border = "2px solid green"

    } else if (e.target.name === "end_time") {

      if (new Date(e.target.value).getTime() < new Date(info.start_time).getTime()) {
        setErr({
          ...error,
          end_timeErr: "End date must be after Start date"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      } else {
        setErr({
          ...error,
          end_timeErr: ""
        })
        setInfo({
          ...info,
          end_time: e.target.value,
        })
        e.target.style.border = "2px solid green"
      }
    } else if (e.target.name === "price") {
      if (e.target.value.length === 0) {
        setErr({
          ...error,
          priceErr: "Price is required",
        });
        e.target.style.border = "2px solid red";
        e.target.style.outline = "none";
      } else if (!/^[1-9][0-9]*$/.test(e.target.value)) {
        setErr({
          ...error,
          priceErr: "price must be an integer  > 0",
        });
        e.target.style.border = "2px solid red";
        e.target.style.outline = "none";
      } else {
        setErr({
          ...error,
          priceErr: "",
        });
        setInfo({
          ...info,
          price: e.target.value,
        });
        e.target.style.border = "2px solid green";

      }
    }
    else if (e.target.name === "image") {


     setInfo({
          ...info,
          image: e.target.files[0],
        })
      

      e.target.style.border = "2px solid green"
    }
  }

  const addUser = async(e) => {

    const name = nameRef.current.value
    const location = locRef.current.value
    const rate = rateRef.current.value
    const price = priceRef.current.value
    const start = startRef.current.value
    const end = endRef.current.value
    const image = imgRef.current.value
    if (name.length === 0 || location.length === 0 || rate.length === 0 || price.length === 0 || image.length === 0 || start.length === 0 || end.length === 0) {
      e.preventDefault()
      toast.error('PLease fill all fields');

      
    } else {
      setErr({
        ...error,
        empty:""
      })
      if (error.nameErr || error.locationErr || error.start_timeErr || error.ratingErr || error.end_timeErr || error.priceErr) {
        e.preventDefault();
      } else {
        const GetUserData = jwtDecode(localStorage.getItem('token'));
        /////////////////////////////////////////////////////////////////
        axios.get(`http://127.0.0.1:8000/tourism/${GetUserData.email}`)
          .then(response => {
            const userId = response.data.id;

            const UserData = {
              name: info.name,
              location: info.location,
              rating: info.rating,
              start_time: info.start_time,
              end_time: info.end_time,
              price: info.price,
              image: info.image,
              tourismCompany: userId,
          
            }

            // Now you can use the UserData object to make your axios POST request
            axios.post("http://127.0.0.1:8000/api_tourism_places", UserData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(response => {
              console.log(response.data)
            }).catch(error => { console.log(error) })

          })
          .catch(error => {
            console.log(error);
          });
        ////////////////////////////////////////////////////////////
        toast.success('Place added successfully');


        navigate("/tourismCompany");


      }
    }
  }
  const nameRef = useRef(null);
  const locRef = useRef(null);
  const imgRef = useRef(null);
  const rateRef = useRef(null);
  const priceRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  const handleSubmit = (event) => {
  
    event.preventDefault();
   
  };
  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center mt-5"
        id="Register"
      >
        <div
          className="form w-50 m-auto shadow px-5 pt-5 pb-4"
          style={{ backgroundColor: "rgb(151 215 208 / 25%)" }}
          id="forms"
        >
          <h1
            style={{ fontFamily: "Lucida Calligraphy" }}
            className=" animate__animated animate__swing"
          >
            Add New TourismPlace
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="fname text-start">
              <label
                htmlFor="first_name"
                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
              >
                Name
              </label>
              <input
                type="text"
                ref={nameRef}
                name="name"
                id="name"
                className="form-control"
                onChange={(e) => ValidateDoctor(e)}
              />
                      </div>
 
            {error.nameErr.length>1&& <div className="alert alert-danger mt-3 w-75 mx-auto">{error.nameErr}</div>}
            <div className="Location text-start">
              <label
                htmlFor="location"
                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
              >
                Location
              </label>
              <input
                type="number"
                ref={locRef}

                name="location"
                id="location"
                className="form-control"
                onChange={(e) => ValidateDoctor(e)}
              />
            </div>
            {error.locationErr !==""&& <div className="alert alert-danger mt-3 w-75 mx-auto">{error.locationErr}</div> } 

            <div className="rating text-start">
              <label
                htmlFor="RATING"
                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
              >
                Rating
              </label>
              <input
                type="number"
                ref={rateRef}

                name="rating"
                id="RATING"
                className="form-control"
                onChange={(e) => ValidateDoctor(e)}
              />
            </div>
            {error.ratingErr.length>1 && <div className="alert alert-danger mt-3 w-75 mx-auto">{error.ratingErr}</div>}

           
            <div className=" text-start">
              <label
                htmlFor="start_time"
                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
              >
                start_time
              </label>
              <input
                type="date"
                ref={startRef}

                name="start_time"
                id="start_time"
                className="form-control"
                onChange={(e) => ValidateDoctor(e)}
              />
            </div>
            <div className=" text-start">
              <label
                htmlFor="endDate"
                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
              >
                End Date
              </label>
              <input
                type="date"
                ref={endRef}

                name="end_time"
                id="endDate"
                className="form-control"
                onChange={(e) => ValidateDoctor(e)} />
                      </div>

            {error.end_timeErr.length > 1 && <div className="alert alert-danger mt-3 w-75 mx-auto">{error.end_timeErr}</div>}
            <div className=" text-start">
              <label
                htmlFor="Price"
                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
              >
                Price
              </label>
              <input
                type="number"
                ref={priceRef}

                name="price"
                id="Price"
                className="form-control"
                onChange={(e) => ValidateDoctor(e)} />
            </div>
            {error.priceErr.length > 1 && <div className="alert alert-danger mt-3 w-75 mx-auto">{error.priceErr}</div>}

            <div className="pic text-start">
              <label
                htmlFor="Picture"
                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
              >
                Picture
              </label>
              <input
                type="file"
                ref={imgRef}

                name="image"
                id="Picture"
                className="form-control"
                onChange={(e) => ValidateDoctor(e)}
                accept="image/*"

              />
            </div>
            <div className="d-flex justify-content-center mt-5 mb-2">
              {error.empty.length > 1 && <div className="alert alert-danger mt-3 w-75 mx-auto">{error.empty}</div>}

                <button onClick={(e) => addUser(e)}  className="btn btn-outline-dark px-5 py-2 animate__animated animate__heartBeat object-fit-contain">
                  Add Place
                </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTourismPlaces;
