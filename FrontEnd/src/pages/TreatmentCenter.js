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
import { async } from "q";

function TreatmentCeneter() {
    const [doctors, setDoctors] = useState([]);
    const [page, setPage] = useState("1");
    const [reservations, setReservations] = useState([])
    const userIdRef = useRef("");


    const Render_Doctors = (userId) => {
        axios.post("http://127.0.0.1:8000/treatment_doctors", { 'id': userId }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setDoctors(response.data.doctors)
        }).catch(error => { console.log(error) })
    }
    const Render_Reseravtions = (userId) => {
        axios.post("http://127.0.0.1:8000/treatment_reservations", { 'id': userId }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setReservations(response.data.reservations)
        }).catch(error => { console.log(error) })
    }

    // ///////////// First Render ///////////////////////////
    useEffect(() => {
        AOS.init();

        const GetUserData = jwtDecode(localStorage.getItem('token'));
        axios.get(`http://127.0.0.1:8000/treatment/${GetUserData.email}`)
            .then(response => {
                const userId = response.data.id;
                userIdRef.current = userId;
                Render_Doctors(userId)
                Render_Reseravtions(userId)
            })
            .catch(error => {
                console.log(error);
            });

    }, []);
    //////////////////////////////////////////////////////Delete////////////////////////////////////////
    const [doctorToDelete, setDoctorToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalres, setShowModalRes] = useState(false);
    const [showModalrej, setShowModalRej] = useState(false);
    const [reservationId, setReservationId] = useState(null)

    const handleApproveClick = (id) => {
        setShowModalRes(true);
        setReservationId(id);
    }

    // define a separate function to handle the onClick event of the Cancel button
    const handleCancelClick = (id) => {
        setShowModalRej(true);
        setReservationId(id);
    }


    const handleDelete = (id) => {
        setDoctorToDelete(id);
        setShowModal(true);
    };



    async function deleteDoctor() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/delete_doctor/${doctorToDelete}`, {
                method: 'DELETE',
            });
            if (response.status === 200) {
                toast.success('Doctor deleted successfully.');
            } else {
                toast.error('Doctor has reservations and cannot be deleted.');
            }
            setShowModal(false)
        } catch (error) {
            toast.error('An error occurred while deleting the doctor.');
        }
        Render_Doctors(userIdRef.current)


    }

    const changePage = (e) => {
        setPage(e.target.text);
    };
    const Prev = (e) => {
        if (page <= "1") {
            setPage("1");
        } else {
            setPage(parseInt(page) - 1);
        }
    };
    const Next = (e) => {
        if (page >= "7") {
            setPage("7");
        } else {
            setPage(parseInt(page) + 1);
        }
    };
    //////////////// Search

    const [body, setBody] = useState("")


    const ApproveReserv = async () => {
        const UserData = {
            status: 'Accepted',
        }
        try {
            const response = await axios.put(`http://127.0.0.1:8000/one_medical_reservation/${reservationId}`, UserData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            axios.get(`http://127.0.0.1:8000/one_medical_reservation/${reservationId}`).then(response => {
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
            const response = await axios.put(`http://127.0.0.1:8000/one_medical_reservation/${reservationId}`, UserData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            axios.get(`http://127.0.0.1:8000/one_medical_reservation/${reservationId}`).then(response => {
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

            axios.get(`http://127.0.0.1:8000/treatment/${GetUserData.email}`).then(data => {
                const userId = data.data.id
                const info = {
                    name: e.target.value,
                    id: userId
                }
                axios.post("http://localhost:8000/doctors_search", info, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    setDoctors(response.data.doctors)


                }).catch(error => { console.log(error) })
            }
            )
        } else {
            axios.get(`http://127.0.0.1:8000/treatment/${GetUserData.email}`).then(data => {
                const userId = data.data.id
                Render_Doctors(userId)
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
            </form>
            <div className="container">
                <div className="">

                    <h2 className="mb-4 float-start "><i class="fa-solid fa-gear fa-spin"></i> List of Doctors</h2>
                    <div className="float-end  mb-4">
                        <Link
                            type="button"
                            className="btn btn-outline-info"
                            to="/AddNewDoctor"

                        >
                            Add New Doctor
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
                            {doctors.length > 0 ? (doctors.map((place, i) => (
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
                                                src={`http://127.0.0.1:8000/${place.picture}`}
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
                                            className="btn btn-outline-secondary shadow"

                                            to={`/updateDoctor/${place.id}`}
                                        >
                                            Update
                                        </Link>
                                    </td>

                                    <td style={{ verticalAlign: 'middle' }}>
                                        <button
                                            className="btn btn-outline-danger shadow"
                                            onClick={() => handleDelete(place.id)}
                                        >
                                            Delete
                                        </button>
                                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Delete Doctor</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>


                                                Are you sure you want to delete this <strong> Doctor</strong> and all the reservations for this doctor?
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => setShowModal(false)}>
                                                    Cancel
                                                </Button>
                                                <Button variant="danger" onClick={deleteDoctor}>
                                                    Delete
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                    </td>

                                </tr>
                            ))) : (<tr>
                                <td colSpan="5" className="text-center">No doctors found.</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>

                {doctors.length > 10 && <div className="container container d-flex justify-content-center align-items-center my-5">
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
                </div>}


                <h2 className="my-5 float-start "><i class="fa-solid fa-gear fa-spin"></i> Reservations</h2>

                <div style={{ overflow: 'hidden' }} className="table-responsive container">
                    <table className="table table-Light">
                        <thead>
                            <tr className="py-5 fs-bolder">
                                <th>Doctor Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
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
                                        <h3 className="h6">{place.doctor.name}</h3>
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
                                    {place.status === "Pending Aprroval" ? (
                                        <>
                                            <td>
                                                {/* <button type="button" onClick={() => ApproveReserv(place.id)} className={`btn btn-outline-info  shadow `}>Approve </button> */}
                                                <button type="button" onClick={() => handleApproveClick(place.id)} className={`btn btn-outline-info shadow`}>
                                                    Approve
                                                </button>
                                            </td>
                                            <td>
                                                <button type="button" onClick={() => handleCancelClick(place.id)} className={`btn btn-outline-danger shadow`}>
                                                    Cancel
                                                </button>                                                </td>
                                        </>

                                    ) : 
                                    
                                    place.status === "Accepted" ? 
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
                                            <p>Are you sure you want to approve this reservation?</p>
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
                                <td colSpan="5" className="text-center">No reservations found.</td>
                            </tr>)}

                        </tbody>
                    </table>

                </div>

            </div>
        </>
    );
}

export default TreatmentCeneter;