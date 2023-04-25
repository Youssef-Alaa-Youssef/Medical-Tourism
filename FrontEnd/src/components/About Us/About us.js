import 'animate.css';
import AboutUsCard from './AboutUsCard';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
function About() {
    useEffect(() => {
        AOS.init();
      }, []);
    return (
        <div className="container" >
            <div className="row overflow-hidden" >
                <div className='col-sm-12 d-sm-block d-md-block d-lg-none align-center my-5'>
                    <h2 className='mt-5'>What make us Special ? </h2>
                </div>
                <div className='col-sm-6 col-md-6 col-lg-4'>
                    <div className='row g-5'>
                    <div className='col-sm-12'  
                                    data-aos="fade-up-left" 
                                    data-aos-delay={`400`}  
                                    duration='400'  
                                    easing='ease'
                                    offset= '500' style={{height:"39vh"}}>
                    <AboutUsCard icon="hand-holding-heart" title="You comes first"  desc="Treatment here is a truly human experience. You're cared for as a person first."/>
                    </div>
                    <div className='col-sm-12 overflow-hidden' style={{height:"39vh"}}  
                      data-aos="fade-down-left" 
                      data-aos-delay={`400`}  
                      duration='400'  
                      easing='ease'
                      offset= '500'>
                        <AboutUsCard icon="clipboard" title="The right answers" desc="Count on our experts to deliver an diagnosis and the right plan for you the first time"/></div>
                    </div>
            
                </div>
                <div className='col-sm-4 align-center  d-sm-none d-xs-none hidden-xs d-md-none d-lg-block'>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <h2 className='mb-5 ' style={{paddingBottom:'80px'}}>What make us Special ? </h2>
                    </div>
                        
                </div>
                <div className='col-sm-6 col-md-6 col-lg-4'>
                    <div className='row g-5'>
                    <div className='col-sm-12' 
                       data-aos="fade-up-right" 
                       data-aos-delay={`400`}  
                       duration='400'  
                       easing='ease'
                       offset= '500'
                     style={{height:"39vh"}}>
                    <AboutUsCard icon="person-burst" title="Innovation"  desc="Education and research are driven to make discoveries that can help heal you"/>
                    </div>
                    <div className='col-sm-12 '   
                                    data-aos="fade-down-right" 
                                    data-aos-delay={`400`}  
                                    duration='400'  
                                    easing='ease'
                                    offset= '500' style={{height:"39vh"}}>
                        <AboutUsCard icon="stethoscope"  title="More experience" desc="The million patients we treat each year prepares us to treat the one who matters most you"/></div>
                    </div>
                
                </div>
            </div>

        </div>
    )
}
export default About;


<i class="fa-regular fa-hand-holding-heart"></i>