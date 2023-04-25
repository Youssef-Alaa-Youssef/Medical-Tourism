import axios from "axios"
import React, { useEffect, useState } from "react"
import '../components/MainPopular.css';
import slider1 from '../images/slider1.jpg';
import MainPopularCard from "../components/MainPopularCard";
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import py from '../images/pyramid.svg'
// import Search from "../components/Search/Search";
import { Button, Col, Row } from "react-bootstrap";



function MainTourism(props) {
    const [page, setPage] = useState("1")
    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/movie/popular", {
            params: {
                api_key: "9b743af1d4fde1d65af33c40dcccce87",
                page: page
            }
        })
            .then((mo) => setHair(mo.data.results))
            .catch((err) => console.log(err))
    }, [page])
    /////////////////////  Tourism Fetch Api ///////////////
    const [tourism, setTourism] = useState([]);

    useEffect(() => {
        axios
            .get(
                "http://localhost:8000/api_tourism_comapny"
            )
            .then((mo) => setTourism(mo.data))
            .catch((err) => console.log(err));
    }, []);
    const [Hair, setHair] = useState([]);

    const changePage = (e) => {
        setPage(e.target.text)
    }
    const Prev = (e) => {
        if (page <= '1') {
            setPage("1")
        } else {
            setPage(parseInt(page) - 1)

        }
    }
    const Next = (e) => {
        if (page >= "7") {
            setPage("7")

        } else {
            setPage(parseInt(page) + 1)

        }
    }



    //////////////// Search

    // const [sear, setSear] = useState("w");
    // useEffect(() => {
    //     axios
    //         .get("https://api.themoviedb.org/3/search/movie", {
    //             params: {
    //                 api_key: "9b743af1d4fde1d65af33c40dcccce87",
    //                 query: sear,
    //             },
    //         })
    //         .then((movi) => setHair(movi.data.results))
    //         .catch((err) => console.log(err));
    // }, [sear]);

    // const search = (e) => {
    //     setSear(e.target.value.length >= 1 ? e.target.value : "w");
    // };


    return (
        <>
            {/* ################################# slider ##################################### */}

            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner" >
                    <div className="carousel-item active s1">
                        <div className="container text-white" style={{ height: '100vh' }}>
                            <div className="row">
                                <div className="col-sm-12 text-center" style={{ marginTop: '16%'}}>
                                    <h1 style={{fontSize:"400%",fontFamily:"Lucida Calligraphy"}} className="fw-bold">Find your Favoirate Places & Book Now</h1>
                                    <p className="mt-3 fs-5">Some quick example text to build on the card title and make up the bulk of the card's content Some <br/> quick example text to build  on the card title and make up the bulk of the card's content</p>
                                    
                                        <a href="#book"><button style={{fontFamily:"Lucida Calligraphy"}} className="btn btn-light px-5 py-2 mt-5 fs-2">Book Now</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
            {/* ###################################### Manage your Tourism Service ################################ */}

            <div className="container my-5">

                <h1 className=" text-center mb-5 fw-bold" style={{color:"#303e8e",marginTop:"10%",fontFamily:"Lucida Calligraphy",fontSize:"300%"}}>Manage your Tourism Service</h1>
                <div className="row g-5">
                    <div className="card mb-3 col-lg-3 offset-lg-1 col-sm-12" style={{backgroundColor:"#72d5cae3" }} >
                        <div className="card-header fs-2">Easy Bookings</div>
                        <div className="card-body">
                            <h5 className="card-title">Secondary card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card  mb-3 col-lg-3 offset-lg-1 col-sm-12" style={{backgroundColor:"#72d5cae3" }}>
                        <div className="card-header fs-2">Quality Guidance</div>
                        <div className="card-body">
                            <h5 className="card-title">Secondary card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card  mb-3 col-lg-3 offset-lg-1 col-sm-12" style={{backgroundColor:"#72d5cae3" }} >
                        <div className="card-header fs-2">Top Choices</div>
                        <div className="card-body">
                            <h5 className="card-title">Secondary card title</h5>
                            <p id="book" className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div >
            {/* ##################################### book ########################################## */}
            <div className="container" style={{marginTop:"7%"}}>
                {/* <Search search={search} type={"hair planting Center"} /> */}
                <div className="row g-4 my-4">
                    <div className="col-lg-3 col-sm-12 col-md-12 text-center" >
                        <h1 style={{color:"#303e8e",marginTop:"10%",fontFamily:"Lucida Calligraphy",fontSize:"300%"}} className="mt-3 animate__flash fw-bold">Book now</h1>
                        <img src={py} alt="Logo" />
                        <p className="" style={{color:"#303e8e",}}>We Have The Best Services About Tourism</p>
                    </div>
                    {tourism.map((item, index) => {
                        return (
                            <div className="col-lg-4 col-md-12 col-sm-12 text-center" key={index} movie={item}>
                                <Link className="btn btn-outline-light mb-2" to={`/place_detail/${item.id}`}>
                                    <div className="position-relative overflow-hidden">
                                        <div className="row mohamed overflow-hidden">
                                            {item.pictures ? (
                                                <img
                                                    src={`http://127.0.0.1:8000${item.pictures}`}
                                                    alt="Movie"
                                                    className="w-100 overflow-hidden"
                                                    style={{height: "350px"}}
                                                />
                                            ) : (
                                                <img className="" src="https://image.tmdb.org/t/p/w500//sv1xJUazXeYqALzczSZ3O6nkH75.jpg" alt="Alternative" />
                                            )}
                                        </div>
                                        <p className="position-absolute top-0 p-2 text-black" style={{ backgroundColor: "#D0E8F2" }}>
                                            {parseFloat(item.rating).toFixed(1)}
                                        </p>
                                        <div></div>
                                        <h3 style={{backgroundColor:"#303e8e",}}className="shadow p-3 mb-5 py-3 text-white">{item.name}</h3>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                    {/* {Hair.length > 10 && <div className="container container d-flex justify-content-center align-items-center my-5">
                        <Pagination>
                            <Pagination.Prev onClick={(e) => Prev(e)} />
                            <Pagination.Item onClick={(e) => changePage(e)}>{1}</Pagination.Item>
                            <Pagination.Item onClick={(e) => changePage(e)}>{2}</Pagination.Item>
                            <Pagination.Item onClick={(e) => changePage(e)}>{3}</Pagination.Item>
                            <Pagination.Item onClick={(e) => changePage(e)}>{4}</Pagination.Item>
                            <Pagination.Item onClick={(e) => changePage(e)}>{5}</Pagination.Item>
                            <Pagination.Item onClick={(e) => changePage(e)}>{6}</Pagination.Item>
                            <Pagination.Item onClick={(e) => changePage(e)}>{7}</Pagination.Item>
                            <Pagination.Next onClick={(e) => Next(e)} />
                        </Pagination>
                    </div>} */}

                </div>
            </div>
            {/* ################################## Favourite places ################################################ */}

            <div className="container my-5 p-5 rounded-5" style={{backgroundColor:" rgb(177 231 225 / 89%)"}}>
                <h1 className="fw-bold text-center" style={{color:"#303e8e",marginTop:"3%",fontFamily:"Lucida Calligraphy",fontSize:"300%"}}>Favourite Places</h1>
                <div style={{ marginTop: "5%" }} className='container shadow-lg bg-body-tertiary rounded overflow-hidden' >
                    <div className="row g-5 ">
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <div className='text-start  p-5 text-center' style={{ color: "#00334E" }}><h1 className='animate__animated animate__bounceInRight fw-bold'>pyramids</h1>
                                <p className='animate__animated animate__bounceInLeft mt-4' style={{ color: "#00334E" }}>Our Dental clinics are staffed by dentists, dental hygienists, and other healthcare professionals  who work together to provide a range of <br></br> services to their patients.</p>
                            </div>
                        </div>
                        <Col className="T offset-sm-2 col-md-4 d-sm-none d-lg-block"></Col>
                    </div>
                </div>
                <div style={{ marginTop: "5%" }} className='container shadow-lg bg-body-tertiary rounded overflow-hidden' >
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <div className='text-start  p-5 text-center' style={{ color: "#00334E" }}><h1 className='animate__animated animate__bounceInRight fw-bold' style={{ color: "#00334E" }}>Sahl Hashesh</h1>
                                <p className='animate__animated animate__bounceInLeft mt-4' style={{ color: "#00334E" }}>Our Dental clinics are staffed by dentists, dental hygienists, and other healthcare professionals  who work together to provide a range of <br></br> services to their patients.</p>
                            </div>
                        </div>
                        <Col className="f4 offset-sm-2 col-md-4 d-sm-none d-lg-block"></Col>
                    </div>
                </div>
                <div style={{ marginTop: "5%" }} className='container shadow-lg bg-body-tertiary rounded overflow-hidden mb-5' >
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <div className='text-start p-5 text-center' style={{ color: "#00334E" }}><h1 className='animate__animated animate__bounceInRight fw-bold' style={{ color: "#00334E" }}>pyramids</h1>
                                <p className='animate__animated animate__bounceInLeft mt-4' style={{ color: "#00334E" }}>Our Dental clinics are staffed by dentists, dental hygienists, and other healthcare professionals  who work together to provide a range of <br></br> services to their patients.</p>
                            </div>
                        </div>
                        <Col className="T offset-sm-2 col-md-4 d-sm-none d-lg-block"></Col>
                    </div>
                </div>
            </div>
        </>

    )
}

export default MainTourism