import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";


function Updateplace({ onAdd }) {
    const parm = useParams();
    const navigate = useNavigate(); // create navigate function

    const ID = parm.id;

    const [details, setDetails] = useState([]);
    /////////////////////////////////////////////// Get Data from Api
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api_tourism_places/${ID}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setDetails(response.data)
                setValue({
                    name: response.data.name,
                    price: response.data.price,
                    start_date: response.data.start_date,
                    end_date: response.data.end_date,
                    rating: response.data.rating,
                    id: response.data.id,
                    picture: response.data.image
                })

            })
            .catch(error => {
                console.log(error)
            });

    }, []);
    const [inputvalue, setValue] = useState({
        email: "",
        name: "",
        age: "",
        Specialization: "",
        price: "",
        start_date: "",
        end_date: "",
        rating: "",
        id: "",
        picture: "",
    });
    ////////////////////////////////////////////////////
    ////////////////////////////// to edit data//////////////
    const [info, setInfo] = useState({
        email: "",
        name: "",
        age: "",
        rating: "",
        specialization: "",
        start_date: "",
        end_date: "",
        price: "",

    })
    ///////////////////////////////////////////////////////////////
    const [error, setErr] = useState({
        nameErr: "",
        priceErr: "",
        startErr: "",
        endErr: ""
    });


    const ValidateData = (e) => {
        if (e.target.name === "fullname") {
            if (inputvalue.name.length === 0) {
                setErr({
                    ...error,
                    nameErr: "Name is required",
                });
                e.target.style.border = "2px solid red";
                e.target.style.outline = "none";
            } else if (!/([a-zA-Z])\w+/i.test(inputvalue.name)) {
                setErr({
                    ...error,
                    nameErr: "please enter character only",
                });
                e.target.style.border = "2px solid red";
                e.target.style.outline = "none";
            } else {
                setErr({
                    ...error,
                    nameErr: "",
                });
                setInfo({
                    ...info,
                    name: inputvalue.name,
                });
                e.target.style.border = "2px solid green";
            }
        } else if (e.target.name === "age") {
            if (inputvalue.age < 18) {
                setErr({
                    ...error,
                    ageErr: "Age can't be less than 18",
                });
                e.target.style.border = "2px solid red";
                e.target.style.outline = "none";
            } else if (inputvalue.age > 80) {
                setErr({
                    ...error,
                    ageErr: "Age can't be more than 80",
                });
                e.target.style.border = "2px solid red";
                e.target.style.outline = "none";
            } else {
                setErr({
                    ...error,
                    ageErr: "",
                });
                setInfo({
                    ...info,
                    age: inputvalue.age,
                });
                e.target.style.border = "2px solid green";
            }
        } else if (e.target.name === "emailvalidate") {
            if (inputvalue.email.length === 0) {
                setErr({
                    ...error,
                    emailErr: "Email is required",
                });
                e.target.style.border = "2px solid red";
                e.target.style.outline = "none";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputvalue.email)
            ) {
                setErr({
                    ...error,
                    emailErr: "Invalid Email format",
                });
                e.target.style.border = "2px solid red";
                e.target.style.outline = "none";
            }
            else {
                setErr({
                    ...error,
                    emailErr: "",
                });
                setInfo({
                    ...info,
                    email: inputvalue.email,
                });
                e.target.style.border = "2px solid green";
            }
        }
        else if (e.target.name === "Specialization") {
            if (inputvalue.Specialization.length === 0) {
                setErr({
                    ...error,
                    SpecializationErr: "Specialization is required",
                });
                e.target.style.border = "2px solid red";
                e.target.style.outline = "none";
            } else if (!/([a-zA-Z])\w+/i.test(inputvalue.Specialization)) {
                setErr({
                    ...error,
                    SpecializationErr: "please enter character only",
                });
                e.target.style.border = "2px solid red";
                e.target.style.outline = "none";
            } else if (/\s/g.test(inputvalue.Specialization)) {
                setErr({
                    ...error,
                    nameErr: "Specialization can't contain spaces",
                });
                e.target.style.border = "2px solid red";
                e.target.style.outline = "none";
            } else {
                setErr({
                    ...error,
                    SpecializationErr: "",
                });
                setInfo({
                    ...info,
                    specialization: inputvalue.Specialization,
                });
                e.target.style.border = "2px solid green";
            }
        }
        else if (e.target.name === "price") {
            if (inputvalue.price.length === 0) {
                setErr({
                    ...error,
                    priceErr: "price is required",
                });
                e.target.style.border = "2px solid red";
                e.target.style.outline = "none";
            } else if (!/^[1-9][0-9]*$/.test(inputvalue.price)) {
                setErr({
                    ...error,
                    priceErr: "price must be an integer and greater than zero",
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
                    price: inputvalue.price,
                });
                e.target.style.border = "2px solid green";
            }
        }

    };
    const ChangeInfo = (e) => {


        if (e.target.name === "fullname") {
            setValue({
                ...inputvalue,
                name: e.target.value
            })

        } else if (e.target.name === "emailvalidate") {
            setValue({
                ...inputvalue,
                email: e.target.value
            })
        } else if (e.target.name === "age") {
            setValue({
                ...inputvalue,
                age: e.target.value
            })
        } else if (e.target.name === "Specialization") {
            setValue({
                ...inputvalue,
                Specialization: e.target.value
            })
        } else if (e.target.name === "price") {
            setValue({
                ...inputvalue,
                price: e.target.value
            })
        } else if (e.target.name === 'image') {
            setValue({
                ...inputvalue,
                picture: e.target.files[0],

            })
        }
    }
    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const imgRef = useRef(null);
    const EditPlace = async (e) => {
        const name = nameRef.current.value
        const price = priceRef.current.value
        const img = imgRef.current.value
        if (name.length === 0 || price.length === 0 || img.length === 0) {
            e.preventDefault()

            toast.error('PLease fill all fields');

        }

        else if (error.nameErr || error.priceErr) {
            e.preventDefault();
        } else {
            const UserData = {
                name: info.name || inputvalue.name,
                price: info.price || inputvalue.price,
                image: info.picture || inputvalue.picture
            }
            console.log(UserData)
            const response = await axios.put(`http://127.0.0.1:8000/api_tourism_places/${inputvalue.id}`, UserData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Place added successfully');

            navigate("/tourismCompany");

        }
    };
    const handleSubmit = (event) => {
        event.preventDefault()

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
                        Update <span className="text-muted">{details.name}</span>
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
                                onChange={(e) => ChangeInfo(e)}
                                onKeyUp={(e) => ValidateData(e)}
                                value={inputvalue.name}
                            />
                        </div>
                        {error.nameErr.length > 1 && (
                            <div className="alert alert-danger mt-3 w-75 mx-auto">
                                {error.nameErr}
                            </div>
                        )}






                        <div className="price text-start">
                            <label
                                htmlFor="Price"
                                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
                            >
                                Price
                            </label>
                            <input
                                type="text"
                                ref={priceRef}

                                name="price"
                                id="Price"
                                className="form-control"
                                onChange={(e) => ChangeInfo(e)}
                                onKeyUp={(e) => ValidateData(e)}
                                value={inputvalue.price}
                            />
                        </div>
                        {error.priceErr.length > 1 && (
                            <div className="alert alert-danger mt-3 w-75 mx-auto">
                                {error.priceErr}
                            </div>
                        )}
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
                                onChange={(e) => ChangeInfo(e)}

                            />
                        </div>
                        {/* <div className="startdate text-start">
                            <label
                                htmlFor="StartDate"
                                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
                            >
                                StartDate
                            </label>
                            <input
                                type="date"
                                name="startdate"
                                id="StartDate"
                                className="form-control"
                                onKeyUp={(e) => ValidateData(e)}
                                value={inputvalue.start_date.slice(0, 10)}
                            />
                        </div>
                        {error.startErr.length > 1 && (
                            <div className="alert alert-danger mt-3 w-75 mx-auto">
                                {error.startErr}
                            </div>
                        )}
                        <div className="startdate text-start">
                            <label
                                htmlFor="EndDate"
                                className="my-3 animate__animated animate__bounceInLeft fs-5 ms-2"
                            >
                                EndDate
                            </label>
                            <input
                                type="date"
                                name="enddate"
                                id="EndDate"
                                className="form-control"
                                onKeyUp={(e) => ValidateData(e)}
                                value={detail.end_date.slice(0, 10)}
                            />
                        </div>
                        {error.startErr.length > 1 && (
                            <div className="alert alert-danger mt-3 w-75 mx-auto">
                                {error.endErr}
                            </div>
                        )} */}
                        <div className="d-flex justify-content-center mt-5 mb-2">

                            <button
                                onClick={(e) => EditPlace(e)}

                                className="btn btn-outline-dark px-5 py-2 animate__animated animate__heartBeat object-fit-contain"
                            >
                                Update Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Updateplace;
