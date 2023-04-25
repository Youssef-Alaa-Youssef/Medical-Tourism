
import Button from 'react-bootstrap/Button';
import 'animate.css';
import "./Hair.css"
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HairImplant() {
    return (
        <div style={{ marginTop: "10%" }} className='container shadow-lg bg-body-tertiary rounded overflow-hidden'
            data-aos="flip-down"
            data-aos-delay={`400`}
            duration='400'
            easing='ease'
            offset='600'
            id="hair" >
            <Row>
                <div className="img_hair  col-md-5 d-sm-none d-lg-block img-fluid"></div>
                <div className="col-sm-12 col-md-12 col-lg-6" >
                    <div className='text-start mt-4 p-5 text-center' style={{ color: "#00334E" }}><h1 className='animate__animated animate__bounceInRight fw-bold' style={{ color: "#00334E" }}>Regrow Hair on Bald Spot</h1>
                        <p className='animate__animated animate__bounceInLeft mt-4' style={{ color: "#00334E" }}>Hair implants are a safe and effective way to restore a fuller head of hair and can help to improve the self-confidence and overall quality of life for people experiencing hair loss</p>
                        <Link to="/treatment"><Button className='rounded px-5 py-2 mt-5' variant="info animate__animated animate__zoomIn mt-3" style={{ backgroundColor: "#72d5cae3", border: "1px solid #74d6cb4d" }}>See More</Button></Link>
                    </div>
                </div>
            </Row>
        </div>
    )
}
export default HairImplant;