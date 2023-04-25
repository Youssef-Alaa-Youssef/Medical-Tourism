import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../components/Login.css';
import jwtDecode from 'jwt-decode';
import { useRef } from "react";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignIn({ setData }) {
  const [info, setInfo] = useState({
    Email: "",
    Password: ""
  })

  const [error, setErr] = useState({
    EmailErr: "",
    PasswordErr: "",
    empty: ""
  })

  const navigate = useNavigate(); // create navigate function

  const ChangeInfo = (e) => {
    if (e.target.name === "Email") {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
        setErr({
          ...error,
          EmailErr: "Given Email is not in a valid form"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      }
      else {
        setInfo({
          ...info,
          Email: e.target.value
        })
        setErr({
          ...error,
          EmailErr: ""
        })
        e.target.style.border = "2px solid green"

      }

    } else if (e.target.name === "Password") {
      if (e.target.value.length < 8) {
        setErr({
          ...error,
          PasswordErr: "Password cannot be less than 8 characters"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      }
      else {
        setInfo({
          ...info,
          Password: e.target.value
        })
        setErr({
          ...error,
          PasswordErr: ""
        })
        e.target.style.border = "2px solid green"

      }

    }
  }

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const ValidateUser = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value
    const password = passwordRef.current.value
    if (email.length === 0 || password.length === 0) {
      toast.error('Please fill all fields');

    } else {
      try {
        const { data } = await axios.post("http://127.0.0.1:8000/login_api", info, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (data.success === "Authentication successful") {
          localStorage.setItem("token", data.token);
          setData();

          let dataDecode = jwtDecode(localStorage.getItem("token"))
          if (dataDecode.role === "Patient") {
            navigate("/treatment");
            toast.success('Welcome to Medical Website.');

          }
          else if (dataDecode.role === "Tourist") {
            navigate("/Tourism");
            toast.success('Hello, tourist.');

          }
          else if (dataDecode.role === "Treatment Center") {
            navigate("/TreatmentCenter");
            toast.success('Welcome To Our Treatment Center.');

          }
          else {
            navigate("/tourismCompany");
            toast.success('Welcome To Our Tourism Company.');


          }
        }

      } catch (error) {
        setErr({
          ...error,
          PasswordErr: error.response.data.error,
        });
        toast.error(error.response.data.error);

      }
    }



  };



  const submitUserData = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <div style={{ height: "100vh" }} className="d-flex align-items-center rounded-5" id="Login">
        <div className="form m-auto w-50 shadow p-5" style={{
          backgroundColor: "rgb(151 215 208 / 25%)"
        }}>
          <h1 style={{ fontFamily: "Lucida Calligraphy" }} className="mt-3 mb-2 animate__animated animate__swing">Login</h1>
          <form onSubmit={(e) => submitUserData(e)} className="mt-5">
            <div className="Email text-start">
              <label className="my-3 animate__animated animate__bounceInLeft ms-2 fs-4">
                Email
              </label>
              <input
                type="text"
                ref={emailRef}

                name="Email"
                id="Email"
                className="form-control"
                placeholder="Enter Email"
                // onBlur={(e) => Dest(e)}

                onChange={(e) => ChangeInfo(e)}
              />
              <p className="text-danger mt-2 fw-bold"> {error.EmailErr}</p>
            </div>


            <div className="pass text-start">
              <label htmlFor="Password" className="my-3 animate__animated animate__bounceInRight ms-2 fs-5">
                Password
              </label>
              <input
                type="Password"
                ref={passwordRef}

                name="Password"
                id="Password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => ChangeInfo(e)}
              />
              <p className="text-danger mt-2 fw-bold"> {error.PasswordErr}</p>
            </div>

            <div className="d-flex justify-content-center mt-5 mb-3" >

              <button onClick={(e) => ValidateUser(e)} className="btn btn-outline-dark px-5 py-2 animate__animated animate__heartBeat object-fit-contain">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;