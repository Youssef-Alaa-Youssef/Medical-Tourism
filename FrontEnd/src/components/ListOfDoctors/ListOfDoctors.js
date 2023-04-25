import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Search from "../Search/Search";
import Image from "../../images/doc.png";
import Button from "react-bootstrap/Button";
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ListOfDoctors.css';
import { Form, Dropdown } from 'react-bootstrap';


function ListOfDoctors() {
    const [doctors, setDoctors] = useState([]);
    const parm = useParams();
    const [feedbackbyuser, setFeedbackbyuser] = useState("");
    const [feedback, setFeedback] = useState([]);
    const [allfeedback, setAllfeedback] = useState([]);
    const ID = parm.id;
    const [detail, setDetails] = useState({});
    const [role, setRole] = useState("");
    const [userid, setuserId] = useState("")
    const [ratebyuser, setRatedbyuser] = useState("");
    const [payment, setPayment] = useState([]);

    //////////////////Done Details////////////////////////////////////////////////////////////
    const GetUserData = jwtDecode(localStorage.getItem("token"));
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [specializationOptions, setSpecializationOptions] = useState([]);

    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/treatment/${ID}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setDetails(response.data)
                const hairFields = [
                    'All',
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
                const dentalFields = [
                    'All',
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
                const TourismFields = ["All",
                    "Electrical therapy",
                    "Mineral water therapy",
                    "Massage therapy",
                    "Natural therapy through oxygen inhalation",
                    "Paraffin therapy", "Anti-aging therapy",
                    "Treatment of digestive system diseases"]
                if (response.data.specialization === "Hair Implant") {
                    setSpecializationOptions(hairFields.map(field => ({
                        value: field,
                        label: field
                    })));
                }
                else if (response.data.specialization === "Dental") {
                    setSpecializationOptions(dentalFields.map(field => ({
                        value: field,
                        label: field
                    })));
                }
                else {
                    setSpecializationOptions(TourismFields.map(field => ({
                        value: field,
                        label: field
                    })));
                }
            })
            .catch(error => {
                console.log(error)
            });
        axios.post("http://127.0.0.1:8000/treatment_doctors", { 'id': ID }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setDoctors(response.data.doctors)
        }).catch(error => { console.log(error) })
        const GetUserData = jwtDecode(localStorage.getItem("token"));
        setuserId(GetUserData.user_id)
        setRole(GetUserData.role)
        checking(GetUserData)
        Render_feedback()

        checkingfeedback(GetUserData)


    }, []);
    let formSubmit = (e) => {
        e.preventDefault();
    }

    const filter = async (option) => {
        const FilterData = {
            treatment_center: ID,
            specialization: option
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/filterdoctors', FilterData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response) {
                setDoctors(response.data.doctors)

            }
        } catch (error) {
            toast.error("Error happened while filtering data")
        }
    }
    const checking = async (GetUserData) => {
        axios.post('http://127.0.0.1:8000/checking_treatment_rating', { 'user_id': GetUserData.user_id, 'treatment_center_id': ID })
            .then(response => { setRatedbyuser(response.data.status) })
            .catch(error => { console.log(error) })

    }
    ////////////////////////////////feedback ////////////
    const Render_feedback = () => {

        axios.post("http://127.0.0.1:8000/treatment_center_feedbacks", { 'user_id': ID }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data.feedbacks)

            setAllfeedback(response.data.feedbacks)
        }).catch(error => { console.log(error) })
    }
    const checkingfeedback = async (GetUserData) => {
        axios.post('http://127.0.0.1:8000/checking_treatment_feedback', { 'user_id': GetUserData.user_id, 'treatment_center_id': ID })
            .then(response => { setFeedbackbyuser(response.data.status) })
            .catch(error => { console.log(error) })

    }


    const handlefeedback = async (event) => {
        event.preventDefault();

        const FeeddbackData = {
            user_id: userid,
            treatment_center_id: ID,
            feedback: feedback
        }
        try {
            const { NEW_FEEDBACK } = await axios.post("http://127.0.0.1:8000/feedback_treatment", FeeddbackData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success('Treatment Center feedback successfully.');
            Render_feedback()
            const GetUserData = jwtDecode(localStorage.getItem("token"));
            checkingfeedback(GetUserData)
        }
        catch (error) {
            toast.warning('An error occurred while feedback the treatment.');

        }
    };

    //////////////// Search

    const [rate, setRate] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const RatingData = {
            user_id: userid,
            treatment_center_id: ID,
            user_rate: rate
        }
        try {
            const { NEW_RATING } = await axios.post("http://127.0.0.1:8000/rating_treatment", RatingData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success('Treatment Center Rated successfully.');
            const GetUserData = jwtDecode(localStorage.getItem("token"));
            checking(GetUserData)



        }
        catch (error) {
            toast.warning('An error occurred while rating the treatment.');

        }


    };

    useEffect(() => {
        axios
          .post("http://127.0.0.1:8000/get_payment", {
            treatment_center: ID,
            user_id: GetUserData.user_id,
          })
          .then((response) => {
            setPayment(response.data);
          })
          .catch((error) => {
            console.log("error", error.response.data);
          });
      }, []);
    return (
        <>
            {/* ################################# sec 1 ################################# */}

            <div style={{ backgroundColor: "rgb(174 224 219 / 89%)", height: '80vh' }} className="container-fluid">
                <div className="row" >
                    <div className="col-md-6 col-sm-12 offset-md-1" style={{ marginTop: '13%' }}>
                        <h1 className="" style={{ color: 'rgb(0, 51, 78)' }}>{detail.name} Find <span className="fw-bold" style={{ color: '#2e4f7a' }}>Best Doctors</span> <br /> for your <span className="">Hair Transplant Surgery</span></h1>
                        <p className="fs-6 mt-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit.Explicabo praesentium<br /> Explicabo praesentium, tenetur</p>
                        <a href="#doc"><button style={{ backgroundColor: '#2e4f7a' }} className=" text-white btn fs-5 px-5 py-2 mt-5">Contact Us <i class="fa-solid fa-arrow-right ms-4"></i></button></a>
                    </div>
                    <div className="col-md-4  d-none d-md-block">

                        <img src={Image} alt="Logo" style={{ marginTop: '20%', width: '110%' }} />
                    </div>
                </div>
            </div>
            {/* ################################# sec 2 ################################# */}

            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <p className="text-center" style={{ marginTop: '10%' }}>FASTEST SOLUTION</p>
                        <h1 className="text-center" style={{ color: '#2e4f7a', fontSize: '300%' }}>3 Easy Steps and Get Your Solution</h1>
                        <p className="text-center mt-4" >Lorem ipsum dolor sit, amet consectetur adipisicing elit.Explicabo praesentium <br /><span>Explicabo praesentium, tenetur </span> </p>
                    </div>
                    <div className="col-sm-12 col-md-4 text-center my-5">
                        <div className="my-5" ><i class="fa-solid fa-user-doctor fa-2x"></i></div>
                        <h3 className="mb-4">Check doctors profile</h3>
                        <p className="w-75 m-auto">Lorem ipsum dolor sit, amet consectetur adipisicing elit.Explicabo praesentium </p>
                    </div>
                    <div className="col-sm-12 col-md-4 text-center my-5">
                        <div className="my-5" ><i class="fa-solid fa-envelope fa-2x"></i></div>
                        <h3 className="mb-4">Contact Us</h3>
                        <p className="w-75 m-auto">Lorem ipsum dolor sit, amet consectetur adipisicing elit.Explicabo praesentium </p>
                    </div>
                    <div className="col-sm-12 col-md-4 text-center my-5">
                        <div className="my-5" ><i class="fa-solid fa-square-check fa-2x"></i></div>
                        <h3 className="mb-4">Get your solution</h3>
                        <p className="w-75 m-auto">Lorem ipsum dolor sit, amet consectetur adipisicing elit.Explicabo praesentium </p>
                    </div>
                </div>
            </div>
            {/* ################################# sec 3 ################################# */}

            <div id='doc' className="container rounded-5 p-5 my-5 " style={{ backgroundColor: '#e3ffff' }}>
                <div className="row text-center m-auto">
                    <h1 style={{ color: '#2e4f7a' }} className="h3 text-center pb-5 pt-3">{detail.name} have certificated and high qualified doctors</h1>
                    {doctors.map((place, i) => (
                        <div key={place.id} className="col-md-6 col-lg-4 mb-4 col-sm-12 ">
                            <div className="card shadow-lg p-3 mb-5 bg-body-tertiary rounded w-75 m-auto">
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div className="text-center">
                                        <div className="rounded-circle overflow-hidden m-auto mt-3 mb-4" style={{ width: "120px", height: "120px" }}>
                                            <img src={`http://127.0.0.1:8000/${place.picture}`} alt={place.name} className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <h3 className="h5 my-3"> Dr.{place.name}</h3>
                                        <p className="mb-3">Rating: {place.rating}</p>
                                    </div>
                                    {
                                        GetUserData.role == "Patient" &&
                                        <>
                                         <div className="text-center mb-2">
                                        <Link className="btn btn-outline-secondary" to={`/doctorDetail/${place.id}`}>
                                            Book now
                                        </Link>
                                    </div>
                                        </>
                                    }
                                   
                                </div>
                            </div>
                        </div>
                    ))}

                    {role === 'Patient' && (role === 'Patient' && ratebyuser === 'notrated' ? (
                        // <div className="container mt-5">
                        //     <Form onSubmit={handleSubmit}>
                        //         <Form.Group controlId="rate">
                        //             <Form.Label>Rate</Form.Label>
                        //             <Form.Control
                        //                 type="number"
                        //                 min={0}
                        //                 max={5}
                        //                 step={0.1}
                        //                 value={rate}
                        //                 onChange={(event) => setRate(event.target.value)}
                        //                 required
                        //             />
                        //         </Form.Group>
                        //         <Button variant="primary" type="submit">
                        //             Submit
                        //         </Button>
                        //     </Form>
                        // </div>
                        <div className="container mt-5">
                       <Form onSubmit={handleSubmit} className="d-flex align-items-center">
  <Form.Group controlId="rate" className="d-flex align-items-center justify-content-center me-3"style={{ width: "75%" }}>
    <Form.Label className="fs-4 mb-0 me-3">Rate</Form.Label>
    <Form.Control
      type="range"
      min={0}
      max={5}
      step={0.1}
      value={rate}
      onChange={(event) => setRate(event.target.value)}
      className="form-range flex-grow-1 w-50"
      required
    />
    <Form.Text className="text-muted fw-bolder ms-3">{rate} / 5.0</Form.Text>
  </Form.Group>
  <Button variant="btn btn-outline-dark w-25" type="submit">
    Rating Now
  </Button>
</Form>

                      </div>
                    ) : (
                        <p className="fs-2">{role !== 'Patient' ? 'You must be a patient to rate.' : 'Already rated.'}</p>
                    ))}
                          {!payment.isPaid && <p className="fs-2">Payment is not done yet.</p>}

                   {/* { role === 'Patient' && feedbackbyuser === 'notfeedback' ? (
                        <div className="container mt-5">
                            <Form onSubmit={handlefeedback}>
                                <Form.Group controlId="feedback" className="d-flex">
                                    <Form.Label className=" fs-4 me-5">Feedback</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={feedback}
                                        onChange={(event) => setFeedback(event.target.value)}
                                        required
                                        className="w-50"
                                    />
                                </Form.Group>
                                <Button className="ms-5 px-4" type="submit" >
                                    Send
                                </Button>
                            </Form>
                        </div>
                    ) : (
                        <p className="fs-2">{role !== 'Patient' ? 'You must be a patient to feedback.' : 'Already feedback.'}</p>
                    )} */}
      {payment.isPaid === "True" && role === 'Patient' && feedbackbyuser === 'notfeedback' ? (
        <div className="container mt-5">
           <Form onSubmit={handlefeedback} className="d-flex align-items-center">
            <Form.Group controlId="feedback" className="d-flex align-items-center justify-content-center me-3"style={{ width: "75%" }}>
              <Form.Label className=" fs-4 mb-0 me-3">Feedback</Form.Label>
              <Form.Control
                type="text"
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                required
                className="form-control flex-grow-1"
              />
            </Form.Group>
            <Button variant="btn btn-outline-dark w-25"  type="submit">
              Send
            </Button>
          </Form> 

        </div>
      ) : (<p className="fs-2">{role !== 'Patient' ? 'You must be a patient to feedback.' : 'Already feedback.'}</p>      )
      }
      {!payment.isPaid && <p className="fs-2">Payment is not done yet.</p>}



                </div>
            </div>
            <div className="title2 text-center position-relative container" >
                <div className="row">
                    <div className="col-sm-12">
                        <h2> TESTIMONIAL</h2>
                        <h3 className=" position-absolute translate-middle top-50 start-50 "> Client Speak</h3>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {allfeedback.map((feed, i) => (
                        <div className=" offset-sm-1 col-sm-5 card shadow rounded my-5" key={i} >
                            <div className="d-flex mt-3 ms-4 mb-4">
                                <img
                                    style={{ width: "18%", height: "8vh" }}
                                    className="my-4 ms-3 img-fluid rounded-circle bg-dark"
                                    src={`http://127.0.0.1:8000/${feed.user.picture}`}
                                    alt="youssef"
                                />
                                <h3 className="col-sm-6 mt-5 ms-4">
                                    {feed.user.FullName}
                                    { }
                                </h3>
                            </div>
                            <div className="star">
                                <p className="ms-4"><span className="fw-bold fs-5">FeedBack :</span> {feed.feedback}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="container">
                <Form onSubmit={(e) => formSubmit(e)}>
                    <Form.Group controlId="specializationField">
                        <Form.Label>Specialization Field</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary">
                                {specializationOptions.length > 0 ? 'Select field' : 'No fields available'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {specializationOptions.map(option => (
                                    <Dropdown.Item key={option.value} onClick={() => filter(option.value)}>
                                        {option.label}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                </Form>
            </div>
            </div>
        </>
    );
}

export default ListOfDoctors;