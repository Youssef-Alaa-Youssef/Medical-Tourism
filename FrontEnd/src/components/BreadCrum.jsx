import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";




function BreadCrum(props){
 
    return(
        <>
          <nav  aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item mt-2"><Link className=" item1 fs-4 fw-bold text-secondary"  to={'/Tourism'}>Home</Link></li>
                <li className="breadcrumb-item active mt-2 text-info fs-4 fw-bold" aria-current="page">{props.value2}</li>

            </ol>
          </nav>
        </>
    )
}
export default BreadCrum