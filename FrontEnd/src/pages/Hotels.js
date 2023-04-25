import React from "react"
import Favorit from "../../Component/Favorit";
import PCard from "../components/Popular_Card2/PCard";
import hotel1 from '../MainPopular_places/images/hotel1.jpg';
import image1 from '../MainPopular_places/images/image1.jpeg';
import image3 from '../MainPopular_places/images/image3.jpeg';
import main from '../MainPopular_places/images/main.jpg';

function Hotels(){
    return(
        <>
        <div className="container">
            <div className='row mt-5'>
                <div className='col-sm-12'>
                    <div className='row'>
                        <div className='col-md-3 col-sm-6'>
                            <div className="position-relative">
                                <img style={{height:"250px"}} src={hotel1} className="card-img-top border rounded " alt="..."/>
                                <p className="position-absolute top-0 end-0"><Favorit/></p>
                            </div>
                            <PCard title="Condo in Cairo" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$197 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                            <div className="position-relative">
                                <img style={{height:"250px"}}  src={image1} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><Favorit/></p>
                            </div>
                            <PCard title="Condo in Hurghada" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$180 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                        <div className="position-relative">
                                <img style={{height:"250px"}}  src={image3} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><Favorit/></p>
                            </div>
                            <PCard title="Condo in Luxur" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$200 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                           <div className="position-relative">
                                <img style={{height:"250px"}}  src={main} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><Favorit/></p>
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
                                <img style={{height:"250px"}} src={hotel1} className="card-img-top border rounded " alt="..."/>
                                <p className="position-absolute top-0 end-0"><Favorit/></p>
                            </div>
                            <PCard title="Condo in Cairo" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$197 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                            <div className="position-relative">
                                <img style={{height:"250px"}}  src={image1} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><Favorit/></p>
                            </div>
                            <PCard
                            title="Condo in Hurghada" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$180 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                           <div className="position-relative">
                                <img style={{height:"250px"}}  src={image3} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><Favorit/></p>
                            </div>
                            <PCard title="Condo in Luxur" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$200 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                           <div className="position-relative">
                                <img style={{height:"250px"}}  src={main} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><Favorit/></p>
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
                                <img style={{height:"250px"}} src={hotel1} className="card-img-top border rounded " alt="..."/>
                                <p className="position-absolute top-0 end-0"><Favorit/></p>
                            </div>
                            <PCard title="Condo in Cairo" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$197 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                            <div className="position-relative">
                                <img style={{height:"250px"}}  src={image1} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><Favorit/></p>
                            </div>
                            <PCard title="Condo in Hurghada" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$180 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                           <div className="position-relative">
                                <img style={{height:"250px"}}  src={image3} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><Favorit/></p>
                            </div>
                            <PCard title="Condo in Luxur" title2="Amazimg Breathinking Nile View & Pyramids" title3="4 beds" title4="May 21 – 28" title5="$200 per night"/>
                        </div>
                        <div className='col-md-3 col-sm-6'>
                           <div className="position-relative">
                                <img style={{height:"250px"}}  src={main} className="card-img-top border rounded" alt="..."/>
                                <p className="position-absolute top-0 end-0"><Favorit/></p>
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
export default Hotels
