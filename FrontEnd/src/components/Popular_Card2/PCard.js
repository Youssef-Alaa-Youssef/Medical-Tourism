
import React from 'react';
function PCard(props){

    return(
        
        <>
            <div className="card border border-0" style={{"width": "18rem"}}>
                <div className="card-body">
                  <p className="card-title text-black fw-bolder mb-0">{props.title}</p>
                  <p className="card-text text-secondary fw-light mt-0 mb-0">{props.title2}</p>
                  <p className="card-text text-secondary fw-light mt-0 mb-0">{props.title3}</p>
                  <p className="card-text text-secondary fw-light mt-0 mb-0">{props.title4}</p>
                  <p className="card-text text-black fw-bold mt-0 mb-0">{props.title5}</p>

                </div>
           </div>
        </>
    )
}
export default PCard
