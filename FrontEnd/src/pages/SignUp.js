import React, { useState, useEffect } from "react";
import '../components/Register.css';
import { Link } from 'react-router-dom';
import RoleSelect from '../components/RoleSelect.js';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";


import { useNavigate } from 'react-router-dom';



export default function SignUp() {

  // ############################### ? ################################
  const navigate = useNavigate(); // create navigate function

  const [users, SetUsers] = useState("")
  useEffect(() => {
    fetch('http://127.0.0.1:8000/users_api')
      .then(respone => respone.json())
      .then(data => SetUsers(data))
      .catch(err => {
        console.log(err)
      })
  }, [])

  const [info, setInfo] = useState({
    email: "",
    password: "",
    name: "",
    checkpassword: "",
    age: "",
    role: "Patient",
    specilization: "Dental",
    location: "",
    description: "",
    idenity_verification: "",
    profilepicture: ""
  })
  const [Centers, setCenters] = useState("d-none")
  const [Userage, setUserage] = useState("d-block")
  const [Treatment, setTreatment] = useState("d-block")
  const [error, setErr] = useState({
    emailErr: "",
    passwordErr: "",
    nameErr: "",
    checkErr: "",
    ageErr: "",
    locErr: "",
    descErr: "",
  })
  const ChangeInfo = (e) => {
    if (e.target.name === "name") {
      if (e.target.value.length === 0) {
        setErr({
          ...error,
          nameErr: "Name is required"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      }
      else if (!/^[a-zA-Z\s]+$/.test(e.target.value)) {
        setErr({
          ...error,
          nameErr: "Please enter characters only"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      }
      else {
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
    else if (e.target.name === "email") {
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
        let emailExists = users.some((data) => data.Email === e.target.value)
        if (emailExists) {
          setErr({
            ...error,
            emailErr: "Email already registered"
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
    else if (e.target.name === "pass") {
      if (e.target.value.length === 0) {
        setErr({
          ...error,
          passwordErr: "Password is required"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      }
      else if (e.target.value.length < 8) {
        setErr({
          ...error,
          passwordErr: "Password must be atleast 8 characters"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      }
      else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(e.target.value)) {
        setErr({
          ...error,
          passwordErr: "Password must contains at least one lowercase , one uppercase , at least one digit and special character"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      }
      else {
        setInfo({
          ...info,
          password: e.target.value
        })
        setErr({
          ...error,
          passwordErr: ""
        })
        e.target.style.border = "2px solid green"

      }

    }
    else if (e.target.name === "confirmpass") {
      if (e.target.value.length == 0) {
        setErr({
          ...error,
          checkErr: "Confirm password is required"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"


      }
      else if (e.target.value != info.password) {
        setErr({
          ...error,
          checkErr: "Confirm password must match password entered above"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"

      }

      else {
        setInfo({
          ...info,
          checkpassword: e.target.value
        })
        setErr({
          ...error,
          checkErr: ""
        })
        e.target.style.border = "2px solid green"

      }
    }
    else if (e.target.name === "select") {
      setInfo({ ...info, role: e.target.value })
      if (e.target.value === "Treatment Center" || e.target.value === "Tourism Company") {
        setUserage("d-none")
        setCenters("d-block")
        setErr({
          ...error,
          ageErr: ""
        })
        if (e.target.value === "Treatment Center") {
          setTreatment("d-block")
        } else {
          setTreatment("d-none")
        }
      } else {
        setUserage("d-block")
        setCenters("d-none")
      }
    }
    else if (e.target.name === "specillizationselect") {
      setInfo({
        ...info,
        specilization: e.target.value
      })
      console.log(e.target.value)
    }
    else if (e.target.name === "location") {
      if (e.target.value.length === 0) {
        setErr({
          ...error,
          locErr: "Location must be specified"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"

      }
      else {
        setInfo({
          ...info,
          location: e.target.value
        })
        setErr({
          ...error,
          locErr: ""
        })
        e.target.style.border = "2px solid green"
      }

    }
    else if (e.target.name === "description") {
      if (e.target.value.length === 0) {
        setErr({
          ...error,
          descErr: "Please enter a description"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      }
      else {
        setInfo({
          ...info,
          description: e.target.value
        })
        setErr({
          ...error,
          descErr: ""
        })
        e.target.style.border = "2px solid green"
      }
    }

    else if (e.target.name === "image") {



      setInfo({
        ...info,
        idenity_verification: e.target.files[0],
      })


      e.target.style.border = "2px solid green"
    }
    else if (e.target.name === "pro") {

      setInfo({
        ...info,
        profilepicture: e.target.files[0],
      })
    }
  }


  const emailRef = useRef(null);
  const passRef = useRef(null);
  const rpassRef = useRef(null);
  const imgRef = useRef(null);
  const nameRef = useRef(null);

  const addUser = async (e) => {
    const email = emailRef.current.value
    const name = nameRef.current.value
    const repaeatPassword = rpassRef.current.value
    const pass = passRef.current.value
    const image = imgRef.current.value
    if (email.length === 0 || name.length === 0 || repaeatPassword.length === 0 || pass.length === 0 || image.length === 0) {
      toast.error('Please fill all fields ')
    }
    else {

      if (error.emailErr.length !== 0 || error.locErr.length !== 0 || error.descErr.length !== 0 || error.passwordErr.length !== 0 || error.nameErr.length !== 0 || error.checkErr.length !== 0 || error.ageErr.length !== 0) {
        e.preventDefault();


      } else {
        const UserData = {
          FullName: info.name,
          age: info.age || null,
          Email: info.email,
          role: info.role,
          Password: info.password,
          RepeatPassword: info.password,
          picture: info.profilepicture


        }

        let { data } = await axios.post("http://127.0.0.1:8000/users_api", UserData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        toast.success('Website User Registered successfully.');
        toast.warning('Please check your email for an activation link ')

        if (info.role === "Treatment Center") {

          const TreatmentData = {
            name: info.name,
            email: info.email,
            role: info.role,
            Password: info.password,
            RepeatPassword: info.password,
            description: info.description,
            specialization: info.specilization,
            location: info.location,
            identiy_verfication: info.idenity_verification,
            picture: info.profilepicture

          }
          let { new_treatment } = await axios.post("http://127.0.0.1:8000/treatments", TreatmentData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          toast.success('Treatment Center Registered successfully.');

        }

        if (info.role === "Tourism Company") {
          const TourismData = {
            name: info.name,
            email: info.email,
            role: info.role,
            Password: info.password,
            RepeatPassword: info.password,
            description: info.description,
            location: info.location,
            identiy_verfication: info.idenity_verification,
            pictures: info.profilepicture


          }
          let { new_treatment } = await axios.post("http://127.0.0.1:8000/api_tourism_comapny", TourismData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          toast.success('Tourism Company Registered successfully.');

        }
        navigate('/signin')



      }
    }

  }
  let formSubmit = (e) => {
    e.preventDefault();
  }


  return (

    <div style={{ height: "100vh" }} className="d-flex align-items-center mt-5" id="Register">
      <div className="form w-50 m-auto shadow px-5 pt-5 pb-4" style={{ backgroundColor: "rgb(151 215 208 / 25%)" }} id="forms">
        <h1 style={{ fontFamily: "Lucida Calligraphy" }} className=" animate__animated animate__swing" >Registration</h1>
        <form onSubmit={(e) => formSubmit(e)} >
          <div className="fname text-start">
            <label htmlFor="first_name" className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2">
              Full Name
            </label>
            <input
              type="text"
              ref={nameRef}

              name="name"
              id="first_name"
              className="form-control"
              onChange={(e) => ChangeInfo(e)}
            />
            <p className="text-danger mt-2 fw-bold"> {error.nameErr}</p>
          </div>
          <div className="email text-start">
            <label name="email" className="my-3 animate__animated animate__bounceInRight fs-5 ms-2">
              Email
            </label>
            <input
              type="text"
              ref={emailRef}

              name="email"
              id="email"
              className="form-control"
              onChange={(e) => ChangeInfo(e)}
            />
            <p className="text-danger mt-2 fw-bold"> {error.emailErr}</p>

          </div>
          <div className=" role text-start">
            <label htmlFor="role" name="role" className="my-3 animate__animated animate__bounceInRight fs-5 ms-2">
              Role
            </label>

            <Form.Select aria-label="Default select example" id="role" name="select" onChange={(e) => ChangeInfo(e)}
            >
              <option value="Patient" >Patient</option>
              <option value="Treatment Center" >Treatment Center</option>
              <option value="Tourist" >Tourist</option>
              <option value="Tourism Company" >Tourism Company</option>

            </Form.Select>
          </div>

          <div className={`${Userage}`}>
            <div className="Age text-start">
              <label htmlFor="age" className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                className="form-control"
                onChange={(e) => ChangeInfo(e)}
              />
              <p className="text-danger mt-2 fw-bold"> {error.ageErr}</p>
            </div>
          </div>

          <div className={`${Centers}`} >
            <div className={`role text-start ${Treatment}`}>
              <label htmlFor="specilization" name="specilization " className="my-3 animate__animated animate__bounceInRight fs-5 ms-2">
                Specilization
              </label>

              <Form.Select aria-label="Default select example" id="specilization" name="specillizationselect" onChange={(e) => ChangeInfo(e)}
              >
                <option value="Dental" >Dental</option>
                <option value="Hair Implant" >Hair Implant</option>
                <option value="Medical Tourism" >Medical Tourism</option>

              </Form.Select>
            </div>

            <div className="location text-start">
              <label htmlFor="Location" className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="Location"
                className="form-control"
                onChange={(e) => ChangeInfo(e)}
              />
              <p className="text-danger mt-2 fw-bold"> {error.locErr}</p>
            </div>

            <div className="description text-start">
              <label htmlFor="Description" className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2">
                Description
              </label>
              <textarea
                name="description"
                className="form-control"
                id="Description"
                onChange={(e) => ChangeInfo(e)}
                rows={4}
                cols={50}
              />
              <p className="text-danger mt-2 fw-bold"> {error.descErr}</p>
            </div>

            <div className="rating text-start">
              <label htmlFor="Rate" className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2">
                Identity verification
              </label>
              <input
                type="file"
                name="image"
                id="Picture"
                className="form-control"
                onChange={(e) => ChangeInfo(e)}
                accept="image/*"

              />

            </div>

          </div>


          <div className="profilepic text-start">
            <label htmlFor="Profile" className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2">
              Profile Picture
            </label>
            <input
              type="file"
              ref={imgRef}

              name="pro"
              id="profile"
              className="form-control"
              onChange={(e) => ChangeInfo(e)}
              accept="image/*"
            />
          </div>

          <div className="pass text-start">
            <label htmlFor="password" className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2">
              Password
            </label>
            <input
              type="password"
              ref={passRef}

              name="pass"
              id="pass"
              className="form-control"
              onChange={(e) => ChangeInfo(e)}
            />
            <p className="text-danger mt-2 fw-bold"> {error.passwordErr}</p>
          </div>
          <div className="pass text-start">
            <label htmlFor="password" className="my-3 animate__animated animate__bounceInLeft ">
              ConfirmPassword
            </label>
            <input
              type="password"
              ref={rpassRef}

              name="confirmpass"
              id="password"
              className="form-control"
              onChange={(e) => ChangeInfo(e)}
            />
            <p className="text-danger mt-2 fw-bold"> {error.checkErr}</p>
          </div>
          <div className="d-flex justify-content-center mt-5 mb-2">
            <button onClick={(e) => addUser(e)} className="btn btn-outline-dark px-5 py-2 animate__animated animate__heartBeat object-fit-contain">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}