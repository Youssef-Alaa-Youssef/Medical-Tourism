import React from 'react';
import { Card } from 'react-bootstrap';

function AboutUsCard(props) {
    return (
        <Card style={{ border: "none", border: "2px solid #456268", overflow: "hidden" ,backgroundColor:"#72d5ca8a"
    }} className={`text-start rounded-4`}>
            <Card.Body>
                <div className={`card-icon mb-4 mt-2 ms-3`} > <i className={`fa-solid fa-${props.icon} fs-2`}></i></div>

                <Card.Title className='fs-2'>{props.title}</Card.Title>
                <Card.Text className='fs-4 mt-5'>
                    {props.desc}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default AboutUsCard;