import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Search from "../Search/Search";
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "../../images/7.png";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import './ListOfPlaces.css';




function ListOfPlaces() {
    const [Places, setPlaces] = useState([]);
    const [page, setPage] = useState("1");
    const parm = useParams();

    const ID = parm.id;
    const [role, setRole] = useState("");
    const [userid, setuserId] = useState("")
    const [ratebyuser, setRatedbyuser] = useState("");
    const [detail, setDetails] = useState({});
    const [feedback, setFeedback] = useState([]);
    const [allfeedback, setAllfeedback] = useState([]);

    const id = 587092;
    const data = {
        FullName: "",
        Age: "",
        Email: "",
        Specialization: "",
    };
        const Render_feedback = () => {
        
        axios.post("http://127.0.0.1:8000/tourism_company_feedbacks", { 'tourism_company_id': ID }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setAllfeedback(response.data.feedbacks)
        }).catch(error => { console.log(error) })
    }



    //////////////////Done Details////////////////////////////////////////////////////////////
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api_tourism_comapny/${ID}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setDetails(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            });
        
                axios.post("http://127.0.0.1:8000/tourism_company_places", { 'id': ID }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    setPlaces(response.data.places)
                }).catch(error => { console.log(error) })
                const GetUserData = jwtDecode(localStorage.getItem("token"));
                setuserId(GetUserData.user_id)
                setRole(GetUserData.role)
        checking(GetUserData)
        checkingfeedback(GetUserData)
        Render_feedback()

        
    }, []);

/////////////////////////////// feedback ///////////////////
const [feedbackbyuser, setFeedbackbyuser] = useState("");

const checkingfeedback = async (GetUserData) => {
    axios.post('http://127.0.0.1:8000/checking_tourism_feedback', { 'user_id': GetUserData.user_id, 'tourism_company_id': ID })
        .then(response => { setFeedbackbyuser(response.data.status)})
        .catch(error => { console.log(error) })

}
    
const handlefeedback = async (event) => {
    event.preventDefault();
    const FeeddbackData = {
        user_id: userid,
        tourism_company_id: ID,
        feedback : feedback
    }
    try {
        const { NEW_FEEDBACK } = await axios.post("http://127.0.0.1:8000/feedback_tourism", FeeddbackData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        toast.success('Tourism Company feedback successfully.');
        Render_feedback()
        const GetUserData = jwtDecode(localStorage.getItem("token"));
        checkingfeedback(GetUserData)
    }
    catch (error) {
        toast.warning('An error occurred while feedback the tourism.');

    }
};

    //////////////// Search
    const [rate, setRate] = useState(0);

    const checking = async (GetUserData) => {
        axios.post('http://127.0.0.1:8000/checking_tourism_rating', { 'user_id': GetUserData.user_id, 'tourism_company_id': ID })
            .then(response => { setRatedbyuser(response.data.status) })
            .catch(error => { console.log(error) })

    }
    const [sear, setSear] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();

        const RatingData = {
            user_id: userid,
            tourism_company_id: ID,
            user_rate: rate
        }
        try {
            const { NEW_RATING } = await axios.post("http://127.0.0.1:8000/rating_tourism", RatingData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success('Tourism Company Rated successfully.');
            const GetUserData = jwtDecode(localStorage.getItem("token"));
            checking(GetUserData)



        }
        catch (error) {
            toast.warning('An error occurred while rating this Company.');

        }


    };
    const search = (e) => {
        setSear(e.target.value.length >= 1 ? e.target.value : "");
    };

//   ######################### pagination #########################################
    const pageSize = 2;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const currentPageFeedback = allfeedback.slice(start, end);
    const totalPages = Math.ceil(allfeedback.length / pageSize);

    function handlePreviousPage() {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    }
    function handleNextPage() {
        setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }

    return (
        <>
        {/* ################################# sec 1 ################################# */}

        <div style={{ backgroundColor: "rgb(180 220 239)", height: '80vh' }} className="container-fluid se">
            <div className="row" >
                <div className="col-md-6 col-sm-12 offset-md-1" style={{ marginTop: '11%' }}>
                    <h1 className="" style={{ color: 'rgb(0, 51, 78)' ,fontFamily:"Lucida Calligraphy"}}>Make your Tour Amazing  <spna className="fw-bold">With {detail.name}</spna> </h1>
                    <p className="fs-6 mt-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit.Explicabo praesentium<br /> Explicabo praesentium, tenetur</p>
                    <a href="#doc"><button style={{ backgroundColor: '#2e4f7a' }} className=" text-white btn fs-5 px-5 py-2 mt-5">Contact Us <i class="fa-solid fa-arrow-right ms-4"></i></button></a>
                </div>
                <div className="col-md-4  d-none d-md-block">
                    <img src={Image} alt="Logo" style={{ marginTop: '20%', width: '110%' }} />
                </div>
                <div className="container fe" style={{marginTop:"4%",marginBottom:"5%"}}>
                    <div className="row m-auto text-center" >
                    <div className=" card shadow col-sm-8 col-md-5 col-lg-2 text-center mt-5 m-auto text-center overflow-hidden" style={{height:"33.5vh"}}>
                        <div className="mt-5" ><i class="fa-solid fa-money-bill-1-wave fa-3x text-success"></i></div>
                        <h3 className="mt-5 mb-3">Best Price<br/> Guarantee</h3>
                        <p className="w-75 m-auto mb-4 ">A small river named duden flows by their place and supplies.</p>
                    </div>
                    <div className=" card shadow col-sm-8 col-md-5 col-lg-2 text-center mt-5 m-auto text-center overflow-hidden" style={{height:"33.5vh"}}>
                        <div className="mt-5" ><i class="fa-regular fa-heart fa-3x text-danger"></i></div>
                        <h3 className="mt-5 mb-3">Travellers Love Us</h3>
                        <p className="w-75 m-auto mb-4 ">A small river named duden flows by their place and supplies.</p>
                    </div>
                    <div className=" card shadow col-sm-8 col-md-5 col-lg-2 text-center mt-5 m-auto text-center overflow-hidden" style={{height:"33.5vh"}}>
                        <div className="mt-5" ><i class="fa-solid fa-user-tie fa-3x text-danger"></i></div>
                        <h3 className="mt-5 mb-3">Best Travel Agent</h3>
                        <p className="w-75 m-auto mb-4">A small river named duden flows by their place and supplies.</p>
                    </div>
                    <div className=" card shadow col-sm-8 col-md-5 col-lg-2 text-center mt-5 m-auto text-center overflow-hidden" style={{height:"33.5vh"}}>
                        <div className="mt-5" ><i class="fa-solid fa-headset fa-3x text-success"></i></div>
                        <h3 className="mt-5 mb-3">Our Dedicated Support</h3>
                        <p className="w-75 m-auto mb-4">A small river named duden flows by their place and supplies.</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="he" style={{height:"30vh"}}></div>

        {/* ################################# sec 2 ################################# */}

        <div id='doc' className="container rounded-5 p-5 my-5 " style={{ backgroundColor: "rgb(180 220 239)"}}>
                <div className="row text-center m-auto">
                    <h1 style={{ color: '#2e4f7a', fontFamily:"Lucida Calligraphy",fontSize:"250%"}} className="h3 text-center pb-5 pt-3 fw-bold">{detail.name} Have The Best Services About Tourism</h1>
                    {Places.map((place, i) => (
                        <div key={place.id} className="col-md-6 col-lg-4 mb-4 col-sm-12 ">
                            <div className="card shadow-lg p-3 mb-5 bg-body-tertiary rounded w-75 m-auto">
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div className="text-center">
                                        <div className="rounded-circle overflow-hidden m-auto mt-3 mb-4" style={{ width: "120px", height: "120px" }}>
                                            <img src={`http://127.0.0.1:8000/${place.image}`} alt={place.name} className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <h3 className="h5 my-3">{place.name}</h3>
                                        <p className="mb-3">Rating: {place.rating}</p>
                                    </div>
                                    <div className="text-center mb-2">
                                        <Link className="btn btn-outline-secondary" to={`/bookplace/${place.id}`}>
                                            Book now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}                        
                    </div>
                </div>
        {/* ################################# Client Speak ################################# */}

    <div className="tit text-center position-relative container" style={{marginTop:"7%"}} >
        <div className="row">
        <div className="col-sm-12 m-auto">
        <h2> TESTIMONIAL</h2>
        <h3 style={{color: 'rgb(0, 51, 78)'}} className=" position-absolute translate-middle top-50 start-50"> Client Speak</h3>
        </div>
        </div>
    </div>
    <div className="container rounded-5 my-5" style={{ backgroundColor: "rgb(200 226 239)" }}>
    <div className="row">
        {currentPageFeedback.map((feed, i) => (
        <div className="col-md-5 col-sm-8 card shadow rounded mt-5  m-auto" key={i}>
            <div className="d-flex mt-3 ms-4 mb-4">
            <img
                style={{ width: "18%", height: "8vh" }}
                className="my-4 ms-3 img-fluid rounded-circle bg-dark"
                src={`http://127.0.0.1:8000/${feed.user.picture}`}
                alt="david"
            />
            <h3 className="col-sm-6 mt-5 ms-4">{feed.user.FullName}</h3>
            </div>
            <div className="star">
            <p className="ms-4">
                <span className="fw-bold fs-5">FeedBack :</span> {feed.feedback}
            </p>
            </div>
        </div>
        ))}
    </div>
    <div className="d-flex justify-content-center mt-5 align-items-center pb-4">
        <BsChevronLeft className="me-3 fw-bold" size={30} onClick={handlePreviousPage} style={{ cursor: "pointer" }} />
        <span className="me-2">
            Page {page} of {totalPages}
        </span>
        <BsChevronRight className="ms-3" size={30} onClick={handleNextPage} style={{ cursor: "pointer" }} />
    </div>
    </div>

            {/* ################################# rating ################################# */}

                <div className="tit text-center position-relative container" >
                    <div className="row">
                        <div className="col-sm-12 m-auto">
                            <h2> CONTACT</h2>
                            <h3 style={{color: 'rgb(0, 51, 78)'}} className=" position-absolute translate-middle top-50 start-50 "> Get in Touch</h3>
                        </div>
                    </div>
                </div>
                <div className="container my-5 py-5 rounded-5"  style={{backgroundColor:"rgb(200 226 239)"}} >
                    <div className="row">
                        <div className="col-sm-12 text-center my-5">
                        {role === 'Tourist' && ratebyuser === 'notrated' ? (
                            <form onSubmit={handleSubmit} className="row">
                                <label className="col-sm-2 fs-4" for="rate"><i class="fa-regular fa-star text-warning fa-2x"></i></label>
                                <input 
                                type="number" 
                                className=" w-50 col-sm-8 form-control" 
                                id="rate" 
                                value={rate} 
                                onChange={(event) => setRate(event.target.value)} 
                                required 
                                />
                                <button type="submit" className=" offset-sm-1 col-sm-2 btn btn-outline-primary">Send rate</button>
                            </form>

                    ) : (
                        <p className="fs-2 text-success"><i class="fa-solid fa-check me-4"></i>{role !== 'Tourist' ? 'You must be a Tourist to rate.' : 'Already rated.'}</p>
                    )}
                        </div>
                {/* ################################# feedback ################################# */}
                    <div className="col-sm-12 text-center">
                    {role === 'Tourist' && feedbackbyuser === 'notfeedback' ? (
                            <form onSubmit={handlefeedback} className="row">
                                <label className="col-sm-2 fs-4" for="feedback"><i class="fa-regular fa-comment text-primary fa-2x"></i></label>
                                <input 
                                type="text" 
                                className=" col-sm-8 form-control w-50" 
                                id="feedback" 
                                value={feedback} 
                                onChange={(event) => setFeedback(event.target.value)} 
                                required 
                                placeholder="send your feedback"
                                />
                                <button type="submit" className="offset-sm-1 col-sm-2 btn btn-outline-primary">Send Feedback</button>
                            </form>

                    ) : (
                        <p className="fs-2 text-success"><i class="fa-solid fa-check me-4"></i>{role !== 'Tourist' ? 'You must be a Tourist to give feedback.' : `Already feedback.`}</p>
                    )}

                    </div>
                        
                        </div>
                    </div>

        </>
    );
}
export default ListOfPlaces;


