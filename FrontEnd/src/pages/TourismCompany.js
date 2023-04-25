import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Search from "../components/Search/Search";
import AOS from 'aos';
import 'aos/dist/aos.css';
import jwtDecode from 'jwt-decode';
import { Modal, Button, Form } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TourismCompany() {

    const [Places, setPlaces] = useState([]);
    const [reservations, setReservations] = useState([])
    const userIdRef = useRef("");

    ///////////////////////////////////////////////
    const Render_Places = (userId) => {

        axios.post("http://127.0.0.1:8000/tourism_company_places", { 'id': userId }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setPlaces(response.data.places)
        }).catch(error => { console.log(error) })
    }

    const Render_Reseravtions = (userId) => {

        axios.post("http://127.0.0.1:8000/tourism_company_reservations", { 'id': userId }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setReservations(response.data.reservations)

        }).catch(error => { console.log(error) })
    }
    //////////////////////////// First render 
    useEffect(() => {
        AOS.init();
        const GetUserData = jwtDecode(localStorage.getItem('token'));

        axios.get(`http://127.0.0.1:8000/tourism/${GetUserData.email}`)
            .then(response => {
                const userId = response.data.id;
                userIdRef.current = userId;
                Render_Places(userId)
                Render_Reseravtions(userId)
            })
            .catch(error => {
                console.log(error);
            });

    }, []);
    /////////////////////////////////////////// delete 
    const [palcetoDelete, setPlaceToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalres, setShowModalRes] = useState(false);
    const [showModalrej, setShowModalRej] = useState(false);
    const [reservationId, setReservationId] = useState(null)

    const handleDelete = (id) => {
        setPlaceToDelete(id);
        setShowModal(true);
    };
    const handleApproveClick = (id) => {
        setShowModalRes(true);
        setReservationId(id);
    }

    // define a separate function to handle the onClick event of the Cancel button
    const handleCancelClick = (id) => {
        setShowModalRej(true);
        setReservationId(id);
    }
    const deletePlaces = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/delete_place/${palcetoDelete}`, {
                method: 'DELETE'
            });
            if (response.status === 200) {
                toast.success('Place deleted successfully.');
            } else {
                toast.error('Place has reservations and cannot be deleted.');
            }
            setShowModal(false);
        } catch (error) {
            toast.error('An error occurred while deleting the doctor.');
            console.error(error);
        }
        Render_Places(userIdRef.current)

        Render_Reseravtions(userIdRef.current)


    };
    ///////////////////////////////////////////////////////////////////////////////////////
    const [body, setBody] = useState("")


    const ApproveReserv = async () => {
        const UserData = {
            status: 'Accepted',
        }
        try {
            const response = await axios.put(`http://127.0.0.1:8000/one_tourism_reservation/${reservationId}`, UserData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            axios.get(`http://127.0.0.1:8000/one_tourism_reservation/${reservationId}`).then(response => {
                const Email_Data = {
                    user_email: response.data.user.Email,
                    status: "Accepted",
                    start_date: response.data.start_time,
                    end_date: response.data.end_time,
                    body: body
                }
                try {
                    const { email } = axios.post('http://127.0.0.1:8000/accept_email', Email_Data, {
                        headers: { 'Content-Type': 'application/json' }
                    })
                    toast.success("Email sent successfully")
                }
                catch (e) {
                    console.log(e)
                }
            }
            )
            Render_Reseravtions(userIdRef.current);
            setShowModalRes(false);

            toast.success('Reservation Accepted successfully.');
        } catch (error) {
            toast.error('An error occurred while approving the reservation.');
        }
    }
    const RejectReserv = async () => {
        const UserData = {
            status: 'Rejected',
        }
        try {
            const response = await axios.put(`http://127.0.0.1:8000/one_tourism_reservation/${reservationId}`, UserData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            axios.get(`http://127.0.0.1:8000/one_tourism_reservation/${reservationId}`).then(response => {
                const Email_Data = {
                    user_email: response.data.user.Email,
                    status: "Rejected",
                    start_date: response.data.start_time,
                    end_date: response.data.end_time,
                    body: body
                }
                try {
                    const { email } = axios.post('http://127.0.0.1:8000/reject_email', Email_Data, {
                        headers: { 'Content-Type': 'application/json' }
                    })
                    toast.success("Email sent successfully")
                }
                catch (e) {
                    console.log(e)
                }
            }
            )

            Render_Reseravtions(userIdRef.current);
            setShowModalRej(false);
            toast.warning('Reservation rejected successfully.');
        } catch (error) {
            toast.error('An error occurred while rejecting the reservation.');
        }
    }
    const emailinfo = async (e) => {
        setBody(e.target.value)
    }

    const ChangeInfo = async (e) => {
        const GetUserData = jwtDecode(localStorage.getItem('token'));

        if (e.target.value) {

            axios.get(`http://127.0.0.1:8000/tourism/${GetUserData.email}`).then(data => {
                const userId = data.data.id
                const info = {
                    name: e.target.value,
                    id: userId
                }
                axios.post("http://127.0.0.1:8000/searchPlaces", info, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    setPlaces(response.data.places)


                }).catch(error => { console.log(error) })
            }
            )
        } else {
            axios.get(`http://127.0.0.1:8000/tourism/${GetUserData.email}`).then(data => {
                const userId = data.data.id
                Render_Places(userId)
            }).catch(error => { console.log(error) })
        }
    }

    return (
        <>
            <div className="" style={{ height: "12vh" }}></div>
            <form role="search">
                <input
                    style={{ width: "35vw" }}
                    className="mx-auto  p-2 form-control rounded-pill"
                    type="search"
                    placeholder={`Search About Doctors Availble Now`}
                    aria-label="Search"
                    onChange={(e) => ChangeInfo(e)}
                />
            </form>            <div className="container">
                <div className="">
                    <h2 className="mb-4 float-start "><i class="fa-solid fa-gear fa-spin"></i> List of Places</h2>
                    <div className="float-end  mb-4">
                        <Link
                            type="button"
                            className="btn btn-outline-info"
                            to="/AddTourismPlaces"
                        >
                            Add New Place
                        </Link>
                        <button onClick={() => window.print()} className="btn btn-outline-info mx-3" title="Print"><i class="fa-solid fa-print fa-fade"></i></button>

                    </div>
                </div>
                <div className="clearfix"></div>

                <div style={{ overflow: 'hidden' }} className="table-responsive container">
                    <table className="table table-Light">
                        <thead>
                            <tr className="p-3">
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Rating</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Places.length > 0 ? (Places.map((place, i) => (
                                <tr key={place.id}
                                    data-aos="fade-up"
                                    data-aos-delay={`${i + 7}00`}
                                    duration='400'
                                    easing='ease'
                                    offset='120'
                                    styte={`vertical-align: baseline !important`}  >
                                    <td>
                                        <div
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "50%",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <img
                                                src={`http://127.0.0.1:8000/${place.image}`}
                                                alt={place.name}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td className="" style={{ verticalAlign: 'middle' }} >
                                        <h3 className="h5">{place.name}</h3>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }} >
                                        <p>{place.rating} </p>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>

                                        <Link
                                            className="btn btn-outline-secondary"

                                            to={`/Updateplace/${place.id}`}
                                        >
                                            Update
                                        </Link>
                                    </td>

                                    <td style={{ verticalAlign: 'middle' }}>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleDelete(place.id)}
                                        >
                                            Delete
                                        </button>
                                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Delete Place</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                Are you sure you want to delete this <strong>place</strong> and all the reservations for this doctor?
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => setShowModal(false)}>
                                                    Cancel
                                                </Button>
                                                <Button variant="danger" onClick={deletePlaces}>
                                                    Delete
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                    </td>

                                </tr>
                            ))) : (<tr>
                                <td colSpan="5" className="text-center">No Places found.</td>
                            </tr>)}
                            { }
                        </tbody>
                    </table>
                </div>

                <h2 className="my-5 float-start "><i class="fa-solid fa-gear fa-spin"></i> Reservations</h2>

                <div style={{ overflow: 'hidden' }} className="table-responsive container">
                    <table className="table table-Light">
                        <thead>
                            <tr className="py-5 fs-bolder">
                                <th>Place Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Accept</th>
                                <th>Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.length > 0 ? (reservations.map((place, i) => (
                                <tr key={place.id}
                                    data-aos="fade-up"
                                    data-aos-delay={`${i + 7}00`}
                                    duration='400'
                                    easing='ease'
                                    offset='120'
                                    styte={`vertical-align: baseline !important`}
                                    className="p-5"
                                >

                                    <td className="" style={{ verticalAlign: 'middle' }} >
                                        <h3 className="h6">{place.tourism_places.name}</h3>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }} >
                                        <p>{place.start_time.split("T")[0]} </p>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }} >
                                        <p>{place.end_time.split("T")[0]} </p>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }} >
                                        <p>{place.status} </p>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }} >
                                        <p>{place.price} </p>
                                    </td>
                                    {place.status === "Pending Aprroval" ? (
                                        <>
                                            <td>
                                                <button type="button" onClick={() => handleApproveClick(place.id)} className={`btn btn-outline-info shadow`}>
                                                    Approve
                                                </button>

                                            </td>
                                            <td>
                                                <button type="button" onClick={() => handleCancelClick(place.id)} className={`btn btn-outline-danger shadow`}>
                                                    Cancel
                                                </button>                                           </td>
                                        </>

                                    ) : place.status === "Accepted" ? 
                                    <>
                                    <td>
                                    <i class="fa-solid fa-check fa-beat fa-2x" style={{color: "#0fbd12"}}></i>                                                                              </td>
                                            <td>
                                            <i class="fa-solid fa-xmark fa-beat fa-2x" style={{color: "#e62b0a"}}></i>                                                                                         </td>
                                    </>:<>
                                    <td>
                                    <i class="fa-solid fa-xmark fa-beat fa-2x" style={{color: "#e62b0a"}}></i>                                                                                         </td>
                                                                            
                                            <td>
                                            <i class="fa-solid fa-check fa-beat fa-2x" style={{color: "#0fbd12"}}></i>                                                                                         </td>
                                    </>}
                                    <Modal show={showModalres} onHide={() => setShowModalRes(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Confirm Action</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p> Are you sure you want to approve this reservation?
                                            </p>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Add any notes or comments:</Form.Label>
                                                <Form.Control name="acceptemail" onChange={(e) => emailinfo(e)} as="textarea" rows={3} />
                                            </Form.Group>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setShowModalRes(false)}>
                                                No
                                            </Button>
                                            <Button variant="danger" onClick={() => ApproveReserv(place.id)}>
                                                Yes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <Modal show={showModalrej} onHide={() => setShowModalRej(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Confirm Action</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p>Are you sure you want to reject this reservation?</p>
                                            <Form.Group controlId="exampleForm.ControlTextarea2">
                                                <Form.Label>Add any notes or comments:</Form.Label>
                                                <Form.Control name="emailbody" onChange={(e) => emailinfo(e)} as="textarea" rows={3} />
                                            </Form.Group>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setShowModalRej(false)}>
                                                No
                                            </Button>
                                            <Button variant="danger" onClick={() => RejectReserv(place.id)}>
                                                Yes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </tr>



                            ))) : (<tr>
                                <td colSpan="7" className="text-center">No Reservations found.</td>
                            </tr>)}

                        </tbody>
                    </table>

                </div>
                {/* {doctors.length > 10 && <div className="container container d-flex justify-content-center align-items-center my-5">
                    <Pagination>
                        <Pagination.Prev onClick={(e) => Prev(e)} />
                        <Pagination.Item onClick={(e) => changePage(e)}>
                            {1}
                        </Pagination.Item>
                        <Pagination.Item onClick={(e) => changePage(e)}>
                            {2}
                        </Pagination.Item>
                        <Pagination.Item onClick={(e) => changePage(e)}>
                            {3}
                        </Pagination.Item>
                        <Pagination.Item onClick={(e) => changePage(e)}>
                            {4}
                        </Pagination.Item>
                        <Pagination.Item onClick={(e) => changePage(e)}>
                            {5}
                        </Pagination.Item>
                        <Pagination.Item onClick={(e) => changePage(e)}>
                            {6}
                        </Pagination.Item>
                        <Pagination.Item onClick={(e) => changePage(e)}>
                            {7}
                        </Pagination.Item>
                        <Pagination.Next onClick={(e) => Next(e)} />
                    </Pagination>
                </div>} */}
                {/* <div className="mx-3" >
                    <div className="right col-lg-8 px-5 mt-5" style={{ height: "86vh" }}>
                        <h1 className="my-5 text-start"> Reservations</h1>
                        <div className="container">
                            <div className="row">
                                {reservations.map((place, i) => (

                                    <div className="card shadow rounded fs-3 " key={i}
                                        data-aos="fade-up"
                                        data-aos-delay={`${i + 7}00`}
                                        duration='400'
                                        easing='ease'
                                        offset='120'
                                        styte={`vertical-align: baseline !important`}  >
                                        <div className='card-header'><h1>Title:{place.tourism_places}</h1></div>
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">StardDate: <span className='m-3 d-inline-block font-weight-bold text-secondary'>    {place.start_time.split("T")[0]} </span></li>
                                                <li className="list-group-item">EndDate:<span className='m-3 d-inline-block font-weight-bold text-secondary'> {place.end_time.split("T")[0]} </span></li>
                                                <li className="list-group-item">Status:<span className='m-3 d-inline-block font-weight-bold text-secondary'> {place.status} </span></li>
                                                <li className="list-group-item">Total Price:<span className='m-3 d-inline-block font-weight-bold text-secondary'> {place.price} </span></li>

                                            </ul>
                                        </div>
                                        {place.status === "Pending Aprroval" ? (
                                            <div className="card-footer">
                                                <button type="button" onClick={() => ApproveReserv(place.id)} className={`btn btn-info fs-4 shadow `}>Approve </button>
                                                <button type="button" onClick={() => RejectReserv(place.id)} className={`btn btn-danger fs-4 shadow   mx-3`}>Cancel </button>
                                            </div>
                                        ) : null}
                                    </div>



                                ))}
                            </div>
                        </div>



                    </div>



                </div> */}

            </div>
        </>
    );
}
export default TourismCompany;