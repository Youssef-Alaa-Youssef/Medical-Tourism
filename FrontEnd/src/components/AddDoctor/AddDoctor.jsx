import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import { useRef } from "react";
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddDoctor({ onAdd }) {
 

  const [specs, setSpecs] = useState([])

  useEffect(() => {
    const GetUserData = jwtDecode(localStorage.getItem('token'));
    axios.get(`http://127.0.0.1:8000/treatment/${GetUserData.email}`)
      .then(response => {
        console.log(response.data.specialization)
        if (response.data.specialization === "Hair Implant") {
          const hairFields = [
            "Hair restoration surgery",
            "Plastic surgery",
            "Dermatology",
            "Hair transplantation",
            "Follicular unit transplantation (FUT)",
            "Follicular unit extraction (FUE)",
            "Robotic hair transplantation",
            "Non-surgical hair restoration methods",
            "Hair loss treatment",
            "Scalp micropigmentation",
            "Trichology",
            "Hair biology",
            "Hair research and development",
            "Hair products and cosmetics",
            "Hair styling and design"
          ];
    
          setSpecs(hairFields);
        } else   if (response.data.specialization === "Dental" ){
          const dentalFields = [
            'General dentistry',
            'Pediatric dentistry',
            'Orthodontics',
            'Endodontics',
            'Periodontics',
            'Prosthodontics',
            'Oral and maxillofacial surgery',
            'Cosmetic dentistry',
            'Implant dentistry',
            'Dental radiology',
            'Dental anesthesia',
            'Oral medicine',
            'Dental public health',
            'Dental hygiene',
            'Dental laboratory technology'
          ];
          setSpecs(dentalFields)
          
        }
        else {
          const TourismFields = ["Electrical therapy",
            "Mineral water therapy",
            "Massage therapy",
            "Natural therapy through oxygen inhalation",
            "Paraffin therapy", "Anti-aging therapy",
            "Treatment of digestive system diseases"]
          setSpecs(TourismFields)

        }
        
      })
    .catch(error => console.log(error))
  }, [])

  
  ///////////////////////////////
  const [info, setInfo] = useState({
    email: "",
    name: "",
    age: "",
    specialization: "",
    picture: "",
    start_date: "",
    end_date: "",
    rating: "",
    price: ""
  })
  //////////////////////////////////
  const navigate = useNavigate(); // create navigate function

  const [error, setErr] = useState({
    emailErr: "",
    nameErr: "",
    SpecializationErr: "",
    ageErr: "",
    ratingErr: "",
    endErr: "",
    priceErr: "",
    empty:""
  })
  ///////////////////////////////////
  const ValidateDoctor = (e) => {
    if (e.target.name === "fullname") {
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
    else if (e.target.name === "age") {
      if (e.target.value < 18) {
        setErr({
          ...error,
          ageErr: "Age can't be less than 18"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"

      } else if (e.target.value > 80) {
        setErr({
          ...error,
          ageErr: "Age can't be more than 80"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      }
      else {
        setErr({
          ...error,
          ageErr: ""
        })
        setInfo({
          ...info,
          age: e.target.value
        })
        e.target.style.border = "2px solid green"


      }
    }
    else if (e.target.name === "emailvalidate") {
      if (e.target.value.length === 0) {
        setErr({
          ...error,
          emailErr: "Email is required"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      }
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
        setErr({
          ...error,
          emailErr: "Invalid email format"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      } else {
        setInfo({
          ...info,
          email: e.target.value
        })
        setErr({
          ...error,
          emailErr: ""
        })
        e.target.style.border = "2px solid green"

      }

    }
    else if (e.target.name === "Specialization") {
      console.log(e.target.value)
        setInfo({
          ...info,
          specialization: e.target.value,
        })
        e.target.style.border = "2px solid green"

      
    } else if (e.target.name === "rating") {
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
    } else if (e.target.name === "startDate") {
      setInfo({
        ...info,
        start_date: e.target.value,
      })
      e.target.style.border = "2px solid green"

    } else if (e.target.name === "endDate") {

      if (new Date(e.target.value).getTime() < new Date(info.start_date).getTime()) {
        setErr({
          ...error,
          endErr: "End date must be after Start date"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      } else {
        setErr({
          ...error,
          endErr: ""
        })
        setInfo({
          ...info,
          end_date: e.target.value,
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
          priceErr: "Price must be an integer  > 0",
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
          picture: e.target.files[0],
        })
      

      e.target.style.border = "2px solid green"
    }
  }
  const nameRef = useRef(null);
  const specRef = useRef(null);
  const imgRef = useRef(null);
  const rateRef = useRef(null);
  const priceRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const ageRef = useRef(null)
  const emailRef = useRef(null)
  const options = [
    <option key="empty" value="">choose specialization</option>, // empty option
    ...specs.map((field, index) => (
      <option key={index} value={field}>{field}</option>
    ))
  ];
  const addUser = async (e) => {
    const name = nameRef.current.value
    const spec = specRef.current.value
    const rate = rateRef.current.value
    const email = emailRef.current.value
    const price = priceRef.current.value
    const start = startRef.current.value
    const end = endRef.current.value
    const image = imgRef.current.value
    const age = ageRef.current.value
    if (name.length === 0 || spec.length === 0 || rate.length === 0 || email.length === 0 || price.length === 0 || start.length === 0 || end.length === 0 || image.length === 0 || age.length === 0) {
      e.preventDefault()

      toast.error('PLease fill all fields');

    } else {
      if (error.emailErr || error.nameErr || error.ageErr || error.SpecializationErr || error.ageErr || error.ratingErr || error.endErr || error.priceErr ) {
        e.preventDefault();
      } else {
        const GetUserData = jwtDecode(localStorage.getItem('token'));
        axios.get(`http://127.0.0.1:8000/treatment/${GetUserData.email}`)
        .then(response => {
          const userId = response.data.id;
  
          const UserData = {
              name: info.name,
              age: info.age,
              email: info.email,
              price: info.price,
              picture: info.picture,
              specialization: info.specialization,
              start_date: info.start_date,
              end_date: info.end_date,
              rating: info.rating,
              treatment_center: userId
          }
  
          axios.post("http://127.0.0.1:8000/doctors", UserData, {
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
      toast.success('Doctor added successfully');

        /////////////////////////////////////
        navigate("/TreatmentCenter");
  
      }
    }

  }
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
            Add New Doctor
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="fname text-start">
              <label
                htmlFor="first_name"
                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
              >
                Full Name
              </label>
              <input
                type="text"
                ref={nameRef}

                name="fullname"
                id="name"
                className="form-control"
                onChange={(e) => ValidateDoctor(e)}
              />
            </div>
            {error.nameErr.length>1&& <div className="alert alert-danger mt-3 w-75 mx-auto">{error.nameErr}</div>}
           
            <div className="Age text-start">
              <label
                htmlFor="age"
                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
              >
                Age
              </label>
              <input
                type="number"
                ref={ageRef}

                name="age"
                id="age"
                className="form-control"
                onChange={(e) => ValidateDoctor(e)}
              />
            </div>
            {error.ageErr !==""&& <div className="alert alert-danger mt-3 w-75 mx-auto">{error.ageErr}</div> } 

            <div className="email text-start">
              <label
                name="email"
                className="my-3 animate__animated animate__bounceInRight fs-5 ms-2"
              >
                Email
              </label>
              <input
                type="text"
                ref={emailRef}

                name="emailvalidate"
                id="emailvalidate"
                className="form-control"
                onChange={(e) => ValidateDoctor(e)}
              />
            </div>
       {error.emailErr.length>1&&<div className="alert alert-danger mt-3 w-75 mx-auto">{error.emailErr}</div>} 

            <div className="fname text-start">
              <label
                htmlFor="Specialization"
                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
              >
                Specialization
              </label>
        
            <Form.Select aria-label="Default select example" ref={specRef} id="Specialization" name="Specialization"onChange={(e) => ValidateDoctor(e)}

            >
{options}     
            </Form.Select>
            </div>
            {error.SpecializationErr.length>1 && <div className="alert alert-danger mt-3 w-75 mx-auto">{error.SpecializationErr}</div>}
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
                htmlFor="startDate"
                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
              >
                Start Date
              </label>
              <input
                type="date"
                ref={startRef}

                name="startDate"
                id="startDate"
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

                name="endDate"
                id="endDate"
                className="form-control"
                onChange={(e) => ValidateDoctor(e)}/>
            </div>
            {error.endErr.length > 1 && <div className="alert alert-danger mt-3 w-75 mx-auto">{error.endErr}</div>}
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
                onChange={(e) => ValidateDoctor(e)}/>
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
                  Add Doctor
                </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddDoctor;