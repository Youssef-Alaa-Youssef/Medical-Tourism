import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FcCalendar } from 'react-icons/fc'
import { motion } from "framer-motion";
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import Paypal from "../Paypal/Paypal";
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Details() {

  const parm = useParams();
  const ID = parm.id;
  const [detail, setDetails] = useState({});
  const [start, setStart] = useState(null);
  const [end, setend] = useState(null);
  const [show, setshow] = useState(false)
  const [booked, setBookedbyuser] = useState("");

  const [info, setInfo] = useState({
    doctor: {
      name: ""
    },
    start_time: "",
    end_time: "",
    price: "",
    user: "",
    start_date: "",
    end_date: "",
    treatment_center: "",
  })


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/doctor/${ID}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setDetails(response.data)
        const treatment_id = response.data.treatment_center
        const GetUserData = jwtDecode(localStorage.getItem("token"));
        checking(GetUserData, treatment_id)

      })
      .catch(error => {
        console.log(error)
      });

  }, []);



  const checking = async (GetUserData, treatment_id) => {
    const UserData = {
      user_id: GetUserData.user_id,
      doctor_id: ID,
      treatment_center_id: treatment_id
    }
    axios.post('http://127.0.0.1:8000/checking_book_medical_', UserData)
      .then(response => {
        if (response.data.bookingstatus === "booked") {
          toast.warning("You have already have a reservation for this doctor")
        } else {
          toast.success("Here are the days avaliable for this doctor , make sure to pick up right days ")
        }
      })
      .catch(error => { console.log(error) })

  }


  const checkfunction = (s, e) => {
    if (!s || !e) {
      return false;
    }
    return parseInt(s.toString().split(' ')[2]) < parseInt(e.toString().split(' ')[2]) &&
      parseInt(s.toString().split(' ')[3]) <= parseInt(e.toString().split(' ')[3]);
  };
  const setshowsection = () => {
    show === true ? setshow(false) : setshow(true)
  }

  const book = async () => {
    if (start !== null && end !== null) {
      if (checkfunction(start, end)) {

        const start_date = new Date(start);
        const StartDate = start_date.toISOString().slice(0, 10);
        const end_date = new Date(end);
        const EndDate = end_date.toISOString().slice(0, 10);
        const GetUserData = jwtDecode(localStorage.getItem('token'));
        const UserData = {
          doctor: detail.id,
          start_time: StartDate,
          end_time: EndDate,
          price: detail.price,
          treatment_center: detail.treatment_center,
          user: GetUserData.user_id,


        };
        try {
          let { data } = await axios.post("http://localhost:8000/all_medical_reservations_book", UserData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          toast.success("Your reservation is under verification , please check your email for confiramtion details")


        }
        catch (e) {
          console.log(e)
          toast.error("Error occured while making reservation ")

        }




      }
    }
  }






  return (
    <div className="container" style={{ marginTop: '10%' }}>
      <div className="row shadow-lg p-3 mb-5 rounded" style={{ backgroundColor: "#c6ebe4" }}>
        <div className="col-lg-4 col-md-6 col-sm-6  mt-5 m-auto mb-3">
          <div >
            <img className="img-fluid rounded-5" src={`http://127.0.0.1:8000/${detail.picture}`} alt="Movie" />
          </div>
        </div>
        <div className="col-lg-6 col-md-12  col-sm-12  mt-5">
          <h1 style={{ color: "#0e2b70" }} className="mt-4">Dr . {detail.name}</h1>
          <h4 style={{ color: "#0e2b70" }}> {detail.specialization}</h4>
          <h3 style={{ color: "#0e2b70" }} className="mt-5 mb-3"> <i className="fa-regular fa-id-card me-2 text-primary"></i> Age : {detail.age}</h3>
          <h3 style={{ color: "#0e2b70" }} className="mb-3"> <i className="fa-solid fa-star me-2 text-warning"></i> Rate :  {detail.rating}</h3>
          <h3 style={{ color: "#0e2b70" }}> <i className="fa-solid fa-sack-dollar me-2 text-success"></i> Cost :  {detail.price}</h3>
          <h3 className="fs-4" style={{ marginTop: "20%", color: '#0e2b70' }}> Request an Appointment <i className="fa-solid fa-right-long fs-4 ms-4 me-3 pt-2 "></i> <button className='btn btn-light' onClick={setshowsection}>< FcCalendar className='fs-2' /></button>
            {show && <motion.div className=''
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}>
              <motion.div
                className=''
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}>
                <h2 className="text-uppercase text-secondary">start date</h2>
                <Calendar className="rounded shadow w-75 mb-4 fs-4" maxDate={new Date(detail.end_date)} minDate={new Date(detail.start_date)} onChange={(date) => setStart((date))} value={start} />
              </motion.div>
              {start && (
                <motion.div
                  className=''
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }} >
                  <h2 className="text-uppercase text-secondary">end date</h2>
                  <Calendar
                    className="rounded shadow w-75 mb-4 fs-4"
                    minDate={new Date(start)}
                    maxDate={new Date(detail.end_date)}
                    defaultValue={start}
                    onChange={(date) => setend(new Date(date))}
                    value={end}
                  />
                </motion.div>
              )
              }
              <button className="btn btn-outline-secondary px-5 py-2" onClick={book}>Book Now </button>
            </motion.div>}</h3>
        </div>

      </div>
    </div>
  );
}

