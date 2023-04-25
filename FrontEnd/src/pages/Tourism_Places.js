import React from "react";
import HeartIcon from "../components/HeartIcon/HeartIcon";
import PopularSlider from "../components/PopularSlider/PopularSlider";

import PCard from "../components/Popular_Card2/PCard";
import tourism2 from '../images/tourism2.jpg';
import tourism3 from '../images/tourism3.jpg';
import tourism4 from '../images/tourism4.jpg';
import tourism5 from '../images/tourism5.jpg';
import tourism6 from '../images/tourism6.jpg';
function Tourism_places(){
    return(
        <>
            <div className="container">
             <div className="row">
                <PopularSlider />
             </div>
            <div className='row mt-5'>
                <div className='col-sm-12'>
                    <div className='row'>
                        <div className='col-md-3 col-sm-6'>
                            <div className="position-relative">
                                <img style={{height:"250px"}} src={tourism6} className="card-img-top border rounded " alt="..."/>
                                <p className="position-absolute top-0 end-0"><HeartIcon  /></p>
                            </div>
                            <PCard title="Condo in Cairo" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$197 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                            <div className="position-relative">
                                <img style={{height:"250px"}}  src={tourism2} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><HeartIcon/>    </p>
                            </div>
                            <PCard title="Condo in Hurghada" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$180 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                           <div className="position-relative">
                                <img style={{height:"250px"}}  src={tourism3} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><HeartIcon  /></p>
                            </div>
                            <PCard title="Condo in Luxur" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$200 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                           <div className="position-relative">
                                <img style={{height:"250px"}}  src={tourism4} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><HeartIcon  /></p>
                            </div>
                            <PCard title="Condo in ElGouna" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$400 per night"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-sm-12'>
                    <div className='row'>
                        <div className='col-md-3 col-sm-6'>
                            <div className="position-relative">
                                <img style={{height:"250px"}} src={tourism5} className="card-img-top border rounded " alt="..."/>
                                <p className="position-absolute top-0 end-0"><HeartIcon  /></p>
                            </div>
                            <PCard title="Condo in Cairo" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$197 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                            <div className="position-relative">
                                <img style={{height:"250px"}} src={tourism6} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><HeartIcon  /></p>
                            </div>
                            <PCard title="Condo in Hurghada" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$180 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                           <div className="position-relative">
                                <img style={{height:"250px"}}  src={tourism2} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><HeartIcon  /></p>
                            </div>
                            <PCard title="Condo in Luxur" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$200 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                           <div className="position-relative">
                                <img style={{height:"250px"}}  src={tourism5} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><HeartIcon  /></p>
                            </div>
                            <PCard title="Condo in ElGouna" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$400 per night"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Tourism_places
