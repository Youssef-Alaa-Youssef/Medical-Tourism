import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from "axios";
import Paypal from '../components/Paypal/Paypal';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Profile() {

  // ############################# get data from token ########################################

  const [photo, setPhoto] = useState([]);
  const [newPhoto, setNewPhoto] = useState([]);
  const [medicalreservationData, setMedicalReservationData] = useState([]);
  const [tourismreservationData, setTourismReservationData] = useState([]);
  const [getPayment, setGetPayment] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [inputvalue, setValue] = useState({
    emailValue: "",
    nameValue: "",
    ageValue: "",
    passwordValue: "",
    role: "",
    id: "",
  })
  const GetUserData = jwtDecode(localStorage.getItem('token'));

  useEffect(() => {
    AOS.init();
    setValue({
      emailValue: GetUserData.email,
      nameValue: GetUserData.first_name,
      ageValue: GetUserData.age,
      passwordValue: GetUserData.Password,
      rolevalue: GetUserData.role,
      id: GetUserData.user_id,
    })

    // ################################# get profile photo from api  ######################################

    axios.get(`http://127.0.0.1:8000/one_user_api/${GetUserData.user_id}`)

      .then(response => {
        setPhoto(response.data.picture);
      })
      .catch(error => {
        console.log(error);
      });

    // ################################ medical reservationData ################################


    axios.post("http://127.0.0.1:8000/medical_reservation_data", { 'user': GetUserData.user_id }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const data = response.data;
        setMedicalReservationData(data);

      })
      .catch(error => {
        console.log(error);
      });

    // ################################ tourism reservationData ################################

    axios.post("http://127.0.0.1:8000/tourism_reservation_data", { 'user': GetUserData.user_id }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const data = response.data;
        setTourismReservationData(data);

      })
      .catch(error => {
        console.log(error);
      });

  }, [photo])

  // ######################### update image and send to api #########################

  const handlePhotoChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('picture', newPhoto);
    axios.put(`http://127.0.0.1:8000/one_user_api/${GetUserData.user_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        setPhoto(response.data.picture);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ############################# edit data and store data in Api ########################################
  const [info, setInfo] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
  })
  const [dis, setDisabled] = useState(false)

  const EditData = async (e) => {
    if (e.target.innerHTML === 'Update') {
      e.target.innerHTML = 'Save'
      setDisabled(true)
    } else {
      if (error.passwordErr.trim().length !== 0 || error.nameErr.trim().length !== 0 || error.ageErr.trim().length !== 0) {
        e.preventDefault()
      } else {
        e.target.innerHTML = 'Update'
        setDisabled(false)
        const UserData = {
          FullName: info.name || inputvalue.nameValue,
          age: info.age || inputvalue.ageValue,
          Email: inputvalue.emailValue,
          role: inputvalue.rolevalue,
          Password: info.password || inputvalue.passwordValue,
          RepeatPassword: info.password || inputvalue.passwordValue
        }
        const response = await axios.put(`http://127.0.0.1:8000/one_user_api/${inputvalue.id}`, UserData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        localStorage.setItem("token", response.data.token);
      }
    }
  }

  // #########################################  validation #########################################

  const [error, setErr] = useState({
    passwordErr: " ",
    nameErr: " ",
    ageErr: " ",
  })

  const ValidateData = (e) => {
    if (e.target.name === "password") {
      if (inputvalue.passwordValue.length === "0") {
        setErr({
          ...error,
          passwordErr: "Password is required"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      } else if (inputvalue.passwordValue.length < 8) {
        setErr({
          ...error,
          passwordErr: "Password must be at least 8 characters"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(inputvalue.passwordValue)) {
        setErr({
          ...error,
          passwordErr: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      } else {
        setInfo({
          ...info,
          password: inputvalue.passwordValue
        })
        setErr({
          ...error,
          passwordErr: ""
        })
        e.target.style.border = "2px solid green"
      }

    } else if (e.target.name === 'age') {
      if (inputvalue.ageValue > 80) {
        setErr({
          ...error,
          ageErr: "Age can't be more than 80"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      } else if (inputvalue.ageValue < 18) {
        setErr({
          ...error,
          ageErr: "Age can't be less than 18"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      }
      else {
        setInfo({
          ...info,
          age: inputvalue.ageValue
        })
        setErr({
          ...error,
          ageErr: ""
        })
        e.target.style.border = "2px solid green"
      }
    }
    else {
      if (inputvalue.nameValue.length === "0") {
        setErr({
          ...error,
          nameErr: "Name is required"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      } else if (!/([a-zA-Z])\w+/i.test(inputvalue.nameValue)) {
        setErr({
          ...error,
          nameErr: "please enter character only"
        })
        e.target.style.border = "2px solid red"
        e.target.style.outline = "none"
      } else {
        setInfo({
          ...info,
          name: inputvalue.nameValue
        })
        setErr({
          ...error,
          ...error,
          nameErr: ""
        })
        e.target.style.border = "2px solid green"

      }
    }
  }

  const ChangeInfo = (e) => {
    if (e.target.name === "password") {
      setValue({
        ...inputvalue,
        passwordValue: e.target.value
      })

    }
    else if (e.target.name === 'name') {
      setValue({
        ...inputvalue,
        nameValue: e.target.value
      })

    }
    else if (e.target.name === 'age') {
      setValue({
        ...inputvalue,
        ageValue: e.target.value
      })
    }
  }
  
  useEffect(() => {
    medicalreservationData.forEach((reservation) => {
      axios
        .post("http://127.0.0.1:8000/get_payment", {
          treatment_center: reservation.treatment_center,
          user_id: GetUserData.user_id,
        })
        .then((response) => {
          setPaymentData(paymentData => [...paymentData, response.data]);
        })
        .catch((error) => {
          console.log("error", error.response.data);
        })
    });
  }, []);
  // const ChangeProfile = (e) => {
  //   console.log("hello")
  //   const file = e.target.files[0]
  //   const reader = new FileReader()
  //   reader.onloadend = () => {
  //     setPhoto(reader.result)
  //   }
  //   reader.readAsDataURL(file)
  // }

  return (
    <>
      <div style={{ height: "8.7vh", background: "#72d5ca8a " }}></div>
      <div className="container-fluid">
        <div className="row">
          <div className="left  row col-lg-4" style={{ height: "91.3vh", background: "#72d5ca8a" }}>
            <div  >
              <form onSubmit={handleSubmit}>
                <div className='rounded-circle overflow-hidden d-flex justify-content-center align-items-center m-auto mt-5 shadow position-relative' style={{ width: "25vh", height: "25vh" }}>
                  <img src={`http://127.0.0.1:8000/${photo}`} className="card-img-top img-thumbnail img-fluid mt-2" alt='amr' />
                </div>
                <div className='rounded-circle bg-primary m-auto d-flex justify-content-center p-3 ' style={{ width: "fit-content" }}>
                  <label htmlFor="ChangeProfile" className="form-label m-1"><i className="fa-solid fa-camera fs-1  text-light"></i></label>
                </div>
                <input className='d-none' id="ChangeProfile" type="file" accept='image/png, image/jpg, image/jpeg' onChange={(e) => handlePhotoChange(e)} />
              </form>
            </div>
            <div className='mt-5'>
              <form className='w-75 m-auto' onSubmit={handleSubmit}>
                <div className="mb-3 text-start">
                  <label htmlFor="Name" className="form-label ms-3">Name</label>
                  <div className='row'>
                    <div className='col-sm-11'>
                      <input onChange={(e) => ChangeInfo(e)} onKeyUp={(e) => ValidateData(e)} type="text" className="form-control text-start" id="username" value={inputvalue.nameValue} disabled={!dis} name='name' />
                    </div>
                    <p className="text-danger mt-2 fw-bold"> {error.nameErr}</p>
                  </div>
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputEmail1 " className="form-label ms-3">Email</label>
                  <div className='row'>
                    <div className='col-sm-11'>
                      <input type="email" name='email' className="form-control text-start" id="useremail" value={inputvalue.emailValue} disabled />
                    </div>
                  </div>
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputPassword1" className="form-label ms-3">Age</label>
                  <div className='row'>
                    <div
                      className='col-sm-11'>
                      <input onChange={(e) => ChangeInfo(e)} onKeyUp={(e) => ValidateData(e)} type="number" name='age' className="form-control text-start" id="age" value={inputvalue.ageValue} disabled={!dis} />
                    </div>
                    <p className="text-danger mt-2 fw-bold"> {error.ageErr}</p>
                  </div>
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="exampleInputPassword1" className="form-label ms-3">Password</label>
                  <div className='row'>
                    <div className='col-sm-11'>
                      <input type="password" onChange={(e) => ChangeInfo(e)} onKeyUp={(e) => ValidateData(e)} className="form-control text-start" name='password' id="userpassword" value={inputvalue.passwordValue} disabled={!dis} />
                    </div>
                    <p className="text-danger mt-2 fw-bold"> {error.passwordErr}</p>
                  </div>
                </div>
                <button onClick={(e) => { EditData(e) }} id="btn" type="button" className="btn btn-primary px-5 py-2 mt-4" >Update</button>
                <button type="submit" className="btn btn-primary px-5 py-2 mt-4 ms-5" >save</button>

              </form>
            </div>
          </div>

          {/* ######################  Rservation ######################## */}

          <div className="right col-lg-8 px-5 mt-5" style={{ height: "86vh" }}>
<div className='shadow mb-5' style={{ height: "8.7vh", background: "#72d5ca8a", display: "flex", alignItems: "center", justifyContent: "center" }}>
  <h1 style={{ color: "#fff", fontSize: "3rem" }}><i class="fa-solid fa-stethoscope  me-2 ms-4"></i> Medical Reservation</h1>
</div>
<div style={{ overflow: 'hidden' }} className="table-responsive container">
                    <table className="table table-Light">
                        <thead>
                            <tr className="font-bold fs-4">
                                <th className="py-3">Doctor Name</th>
                                <th className="py-3">Start Date</th>
                                <th className="py-3">End Data</th>
                                <th className="py-3">Status</th>
                                <th className="py-3">Payment</th>
                                </tr>
                        </thead>
                        <tbody>
                            {medicalreservationData.length > 0 ? (medicalreservationData.map((reservation, i) => (
                                <tr key={reservation.id}
                                data-aos="fade-up"
                                data-aos-delay={`${i + 7}00`}
                                duration='400'
                                easing='ease'
                                offset='120'
                                styte={`vertical-align: baseline !important`}  >
                          

                                    <td className="" style={{ verticalAlign: 'middle' }} >
                                      <h3 className="h5">{reservation.doctor.name}</h3>
                                    </td>
                                    <td className="" style={{ verticalAlign: 'middle' }} >
                                        <h3 className="h5">{reservation.start_time}</h3>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }} >
                                        <p className="h5">{reservation.end_time} </p>
                                    </td>
                                    {/* <td style={{ verticalAlign: 'middle' }} >
                                        <p  className={reservation.status === 'Accepted' ? 'text-success' : reservation.status === 'Rejected' ? 'text-danger' : 'text-muted'}>{reservation.status}</p>
                                    </td > */}
                                    <td style={{ verticalAlign: 'middle' }} className={`status ${reservation.status === 'Accepted' ? 'text-success' : reservation.status === 'Rejected' ? 'text-danger' : 'text-muted'} h5`}>
                                            {reservation.status}
                                          </td>
                                    <td style={{ verticalAlign: 'middle' }} >
                                        <p className="h5">{reservation.status == "Accepted" ? <Paypal user={GetUserData.user_id} treatment={reservation.treatment_center}/>:"Wait for accepted your reservation"} </p>
                                    </td>
                                  

                                </tr>
                            ))) : (<tr>
                                <td colSpan="5" className="text-center">No reservations found.</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
{/* {medicalreservationData.map((reservation,id)=>(
  <>  <div class="card shadow rounded fs-3" key={reservation.id}>
<div className='card-header'>Title: <div >{reservation.doctor.name}</div></div>
<div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><i class="fa-regular fa-clock fa-spin fa-spin-reverse me-2"></i> StardDate: <span className='m-3 d-inline-block font-weight-bold text-secondary'>{reservation.start_time}</span></li>
                  <li class="list-group-item"><i class="fa-regular fa-clock fa-spin fa-spin-reverse me-2"></i> EndDate:<span className='m-3 d-inline-block font-weight-bold text-secondary'>{reservation.end_time}</span></li>
                  <li class="list-group-item"><i class="fa-solid fa-hourglass-half fa-spin me-4"></i>Status:<span className='m-3 d-inline-block font-weight-bold text-secondary'>{reservation.status}</span></li>
                  
                  <li class="list-group-item"><i class="fa-regular fa-clock fa-spin fa-spin-reverse me-2"></i> Payment:
                  
                    <span className='m-3 d-inline-block font-weight-bold text-secondary'>{reservation.status == "Accepted" ? <Paypal user={GetUserData.user_id} treatment={reservation.treatment_center}/>:"Wait for accepted your reservation"}</span>
                  
                  </li>

                  </ul>
              </div>

</div>

<div>

</div>
</>
))} */}

            {/* <div class="card shadow rounded fs-3" >

              <div className='card-header'>Title: {medicalreservationData.map(reservation => (<div key={reservation.id}>{reservation.tourism_company}</div>))}</div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><i class="fa-regular fa-clock fa-spin fa-spin-reverse me-2"></i> StardDate: <span className='m-3 d-inline-block font-weight-bold text-secondary'>{medicalreservationData.map(reservation => (<div key={reservation.id}>{reservation.start_time}</div>))}</span></li>
                  <li class="list-group-item"><i class="fa-regular fa-clock fa-spin fa-spin-reverse me-2"></i> EndDate:<span className='m-3 d-inline-block font-weight-bold text-secondary'>{medicalreservationData.map(reservation => (<div key={reservation.id}>{reservation.end_time}</div>))}</span></li>
                  <li class="list-group-item"><i class="fa-solid fa-hourglass-half fa-spin me-4"></i>Status:<span className='m-3 d-inline-block font-weight-bold text-secondary'>{medicalreservationData.map(reservation => (<div key={reservation.id}>{reservation.status}</div>))}</span></li>
                  <li class="list-group-item"><i class="fa-regular fa-clock fa-spin fa-spin-reverse me-2"></i> Payment:<span className='m-3 d-inline-block font-weight-bold text-secondary'>{medicalreservationData.map(reservation => (<div key={reservation.id}>{reservation.status == "Accepted" ? <Paypal />:"Wait for accepted your reservation"}</div>))}</span></li>

                </ul>
              </div>
            </div> */}
<div className='my-4 shadow' style={{ height: "8.7vh", background: "#72d5ca8a", display: "flex", alignItems: "center", justifyContent: "center" }}>
  <h1 style={{ color: "#fff", fontSize: "3rem" }}><i class="fa-solid fa-stethoscope  me-2 ms-4"></i> Tourism Reservation</h1>
</div>
<div style={{ overflow: 'hidden' }} className="table-responsive container">
                    <table className="table table-Light">
                    <thead>
  <tr className="fs-4 font-bold">
    <th className="py-3">Tourism Place</th>
    <th className="py-3">Start Date</th>
    <th className="py-3">End Date</th>
    <th className="py-3">Status</th>
    <th className="py-3">Payment</th>
  </tr>
</thead>


                        <tbody>
                            {tourismreservationData.length > 0 ? (tourismreservationData.map((reservation, i) => (
                                <tr key={reservation.id}
                                    data-aos="fade-up"
                                    data-aos-delay={`${i + 7}00`}
                                    duration='400'
                                    easing='ease'
                                    offset='120'
                                    styte={`vertical-align: baseline !important`}  >
                          

                                    <td className="" style={{ verticalAlign: 'middle' }} >
                                        <h3 className="h5">{reservation.tourism_places.name}</h3>
                                    </td>
                                    <td className="" style={{ verticalAlign: 'middle' }} >
                                        <h3 className="h5">{reservation.start_time}</h3>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }} >
                                        <p className="h5">{reservation.end_time} </p>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }} className={`status ${reservation.status === 'Accepted' ? 'text-success' : reservation.status === 'Rejected' ? 'text-danger' : 'text-muted'} h5`}>
                                            {reservation.status}
                                          </td>
                                    <td style={{ verticalAlign: 'middle' }} >
                                        <p className="h5">{reservation.status == "Accepted" ? <Paypal start={reservation.start_time} end={reservation.end_time} user={GetUserData.user_id} tourism={reservation.tourism_company}/>:"Wait for accepted your reservation"}</p>
                                    </td>
                                  

                                </tr>
                            ))) : (<tr>
                                <td colSpan="5" className="text-center">No reservations found.</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            {/* <div class="card shadow rounded fs-3" >
              <div className='card-header'>Title:</div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><i class="fa-regular fa-clock fa-spin fa-spin-reverse me-2"></i> StardDate: <span className='m-3 d-inline-block font-weight-bold text-secondary'>{tourismreservationData.map(res => (<div key={res.id}>{res.start_time}</div>))}</span></li>
                  <li class="list-group-item"><i class="fa-regular fa-clock fa-spin fa-spin-reverse me-2"></i> EndDate:<span className='m-3 d-inline-block font-weight-bold text-secondary'>{tourismreservationData.map(res => (<div key={res.id}>{res.end_time}</div>))}</span></li>
                  <li class="list-group-item"><i class="fa-solid fa-hourglass-half fa-spin me-4"></i> Status:<span className='m-3 d-inline-block font-weight-bold text-secondary'>{tourismreservationData.map(res => (<div key={res.id}>{res.status}</div>))}</span></li>
                  <li class="list-group-item"><i class="fa-regular fa-clock fa-spin fa-spin-reverse me-2"></i> Payment:<span className='m-3 d-inline-block font-weight-bold text-secondary'>{tourismreservationData.map(res => (<div key={res.id}>{res.status == "Accepted" ? <Paypal start={res.start_time} end={res.end_time} />:"Wait for accepted your reservation"}</div>))}</span></li>

                </ul>
              </div>
            </div> */}
          </div>
          {/* ############################################################################ */}
        </div>
      </div>
    </>
  )
}
export default Profile;