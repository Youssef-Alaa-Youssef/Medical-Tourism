import React, { useEffect, useState, useRef } from 'react';
import './NavBar.css';
import 'animate.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo6.png';
import { useDispatch, useSelector } from "react-redux"
import { changeLanguage } from "../../Store/Actions/LangAction"
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Button } from 'react-bootstrap';



function NavBar({ realData, logOut }) {

  const myLang = useSelector((state) => state.Rlang.lang)
  const [navbar, setNavbar] = useState(false)

  const [lang, setlang] = useState(myLang)
  const navigate = useNavigate(); // create navigate function





  const navigate_pages = () => {
    const GetUserData = jwtDecode(localStorage.getItem('token'));
    if (GetUserData) {
      if (GetUserData.role === "Treatment Center") {
        navigate("/TreatmentCenter");
      } else if (GetUserData.role === "Patient" || GetUserData.role === "Tourist") {
        navigate("/profile")

      } else {
        navigate("/tourismCompany");

      }
    }


  }
  // ####################### navbar scroll function #######################

  const changeBackground = () => {
    if (window.scrollY > 0) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  //  ###################### adding the event when scroll ######################

  useEffect(() => {
    window.addEventListener("scroll", changeBackground)

  }, [navbar])
  const dispatch = useDispatch()
  const handlelang = (e) => {
    setlang(e.target.value)
  }
  useEffect(() => {
    dispatch(changeLanguage(lang))
  }, [lang])
  return (

    <nav style={{ backgroundColor: navbar ? '#72d5cae3' : 'transparent', transition: navbar ? '0.7s' : '0.3' }} className="navbar navbar-expand-lg fixed-top">  <div className="container-fluid">
      <Link className="navbar-brand  animate__animated animate__bounce ms-5 text-start" style={{ width: "45%" }} to="/">
        <span className="fw-bold fs-4"><img src={logo} className="me-4 " alt="david" style={{ width: "10%" }} />Medical Tourism</span></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"> </span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mt-3 d-flex justify-content-around" style={{ width: "40vw" }}>
          {
            localStorage.getItem("token") &&
            <>

              {(jwtDecode(localStorage.getItem('token')).role === "Patient" || jwtDecode(localStorage.getItem('token')).role === "Tourist") &&
                <>
                  <li className="nav-item"  >
                    <Link className="nav-link active fs-4 fw-bold" aria-current="page" to="/Tourism" >Tourism </Link>
                  </li>
                  <li className="nav-item"  >
                    <Link className="nav-link active fs-4 fw-bold" aria-current="page" to="/treatment" >Medical</Link>
                  </li>

                </>
              }
            </>


          }

          {/* <li className="nav-item"  >
            <Link className="nav-link active fs-4 fw-bold" aria-current="page" to="/tourismCompany" >Tourism Company</Link>
          </li> */}
          <li className="nav-item dropdown fs-4 fw-bold" >
            {/* <Link className="nav-link dropdown-toggle fs-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Language
            </Link> */}
            {/* <button className='' onClick={handlelang}> chanage lang {myLang} </button> */}
            {/* <ul className="dropdown-menu" style={{ backgroundColor: "transparent" }}>
              <li><Link className="dropdown-item" style={{ backgroundColor: "transparent" }} href="#">En</Link></li>
              <li><Link className="dropdown-item" style={{ backgroundColor: "transparent" }} href="#">Ar</Link></li>
            </ul> */}
            <select className="form-select" value={lang} onChange={(e) => handlelang(e)}>
              <option value="EN">EN</option>
              <option value="AR">AR</option>
            </select>
          </li>
          {realData ? <> <li className="nav-item fs-4 fw-bold">
            <Link className="nav-link active fs-5" aria-current="page" to="/signin" onClick={logOut} >LogOut</Link>
          </li>             <li className="nav-item fs-4 fw-bold">
              <Button className="navbar-brand  animate__animated animate__bounce ms-5 text-start" style={{ width: "45%", background: "transparent", color: "white", border: "none" }} onClick={(e) => navigate_pages(e)}>
                <span className="fw-bold fs-4">Welcome {realData.first_name}</span></Button>
            </li></> : <>
            <li className="nav-item fs-4 fw-bold"  >
              <Link className="nav-link active fs-5 " aria-current="page" to="/signin" >SignIn</Link>
            </li>
            <li className="nav-item fs-4 fw-bold">
              <Link className="nav-link active fs-5" aria-current="page" to="/signup" >SignUp</Link>
            </li>
          </>}


        </ul>

      </div>
    </div>
    </nav>

  );
}

export default NavBar;