
import Button from 'react-bootstrap/Button';
import './dent.css';
import 'animate.css';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function Dentist() {
    return (
        <>
            <div style={{ height: "5vh" }} id="den">

            </div>
            <div style={{ marginTop: "10%" }} data-aos="flip-up"
                data-aos-delay={`400`}
                duration='400'
                easing='ease'
                offset='500'
                className='container shadow-lg bg-body-tertiary rounded overflow-hidden' id="dent" >
                <Row>
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <div className='text-start mt-4 p-5 text-center' style={{ color: "#00334E" }}><h1 className='animate__animated animate__bounceInRight fw-bold' style={{ color: "#00334E" }}>Love Your Smile</h1>
                            <p className='animate__animated animate__bounceInLeft mt-4' style={{ color: "#00334E" }}>Our Dental clinics are staffed by dentists, dental hygienists, and other healthcare professionals  who work together to provide a range of <br></br> services to their patients.</p>
                            <Link to="/treatment"><Button className='px-5 py-2 mt-5' variant="info animate__animated animate__zoomIn mt-3" style={{ backgroundColor: "#72d5cae3", border: "1px solid #74d6cb4d" }}>See More</Button></Link>
                        </div>
                    </div>
                    <Col className="image_div col-md-6 d-sm-none d-lg-block"></Col>
                </Row>
            </div>
        </>

    )
}
export default Dentist;



