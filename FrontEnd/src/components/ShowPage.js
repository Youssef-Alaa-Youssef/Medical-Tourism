import React, { useState } from "react"
import { Link } from "react-router-dom"
import pyramid from '../images/pyramid.jpg'
import ReactDOM from 'react-dom'
function ShowPage(props) {


    return (
        <div className="row">
            <div className="col-md-6">
                <div className="item1 pt-3 w-100  d-flex flex-wrap">
                    <img className="w-100" id="mainImage" style={{ width: "500px", height: "500px" }} src={`https://image.tmdb.org/t/p/w500${props.image}`} />
                    <img src={pyramid} className="w-25 p-l image" />
                    <img src={pyramid} className="w-25 p-l image" />
                    <img src={pyramid} className="w-25 p-l image" />
                    <img src={pyramid} className="w-25 p-l image" />


                </div>
            </div>
            <div className="col-md-6 pt-5">
                <div className="item2 w-100 text-center text-secondary">
                    <h2 className="text-black">{props.title}</h2>
                    <p className="text-black">{props.overview}</p>
                    <p className=" text-danger fs-4 ">Price: {props.reviow} EG.</p>
                    <button className="btn btn-info">Book now</button>
                </div>
            </div>
        </div>
    )
}
export default ShowPage