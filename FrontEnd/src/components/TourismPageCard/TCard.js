
import React from 'react';
function TCard(props) {

    return (
        <>
            <div className="card border border-0" style={{ "width": "18rem" }}>
                <div className="card-body">
                    <i className={`${props.name}`}></i>
                    <h5 className="card-title text-black">{props.title}</h5>
                    <p className="card-text text-black">{props.description}</p>
                </div>
            </div>
        </>
    )
}
export default TCard
