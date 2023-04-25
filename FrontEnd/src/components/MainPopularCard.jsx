import React, { useState } from "react"
import '../components/MainPopularCard.css'

function MainPopularCard(props){
    return(
        <>
          <div className="card  rounded-3 text-center h-100" id="cardBody" style={{width:'18rem',boxSshadow:'5px 5px 5px gray'}}>
                <img src={`https://image.tmdb.org/t/p/w500${props.image}`} className="card-img-top  rounded-3" style={{height:'250px'}} alt="" />
                <div className="card-body">
                    <h5 className="card-title p-2 fw-bolder text-dark" id="header">{props.title}</h5>
                    <p className="fw-bold text-danger fs-5">{props.price} <span>EG.</span> </p>
                    <a href="#" className=" myanchor btn btn-dark text-light" id="buttonCard" style={{textDecoration:'none'}}>show Now</a>
                </div>
                    
           </div>
        
        </>
    )
}
export default MainPopularCard