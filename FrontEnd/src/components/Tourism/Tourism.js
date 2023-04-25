
import Button from 'react-bootstrap/Button';
import 'animate.css';
import './tourism.css';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function Tourism() {
    return (
        <>
            <div style={{ marginTop: "10%", marginBottom: "10%" }} data-aos="flip-up"
                data-aos-delay={`400`}
                duration='400'
                easing='ease'
                offset='500' className='container shadow p-3 bg-body-tertiary rounded overflow-hidden' id="tour" >
                <Row>
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <div className='text-start mt-4 p-5 text-center' style={{ color: "#00334E" }}><h1 className='animate__animated animate__bounceInRight fw-bold' style={{ color: "#00334E" }}>A World To See</h1>
                            <p className='animate__animated animate__bounceInLeft mt-4' style={{ color: "#00334E" }}> <br></br> Tourism is a significant industry in Egypt,attracting millions of visitors each year,Egypt is renowned for its ancient civilization</p>
                            <Link to="/Tourism"><Button className='px-5 py-2 mt-5' variant="info animate__animated animate__zoomIn mt-3" style={{ backgroundColor: "#72d5cae3", border: "1px solid #74d6cb4d" }}>See More</Button></Link>
                        </div>
                    </div>
                    <Col className="photoTourism col-md-6 d-sm-none d-lg-block"></Col>
                </Row>
            </div>

        </>
    )
}
export default Tourism;


