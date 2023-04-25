import {useEffect} from 'react'
import './loader.css'
import {TbPyramid} from 'react-icons/tb'
import {MdOutlineMedicalServices} from 'react-icons/md'
import {BsFillAirplaneFill} from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux"
import {changeLoader} from '../../Store/Actions/LoaderAction'
import { Audio , ThreeCircles } from  'react-loader-spinner'
const loaderStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    Zindex: '1000',
    background: 'rgb(0 0 0 / 94%)',
    top: '0',
    left: '0',
    
}
const Loader = () => {
  let myloader = useSelector((state) => state.Rloader.loader)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(changeLoader( myloader=false ))

  },[])

  return (
    <div 
    style={ myloader ? {display:'block'} :{display:'none' } }
    >   
        <div className="loader d-flex justify-content-center align-items-center" style={loaderStyle} >


        <div className="containerloader">
          <div className="center-ball"></div>
          <div className="orbit orbit1"><div className="orbit-ball"> <TbPyramid/> </div></div>
          <div className="orbit orbit2"><div className="orbit-ball"> <MdOutlineMedicalServices/> </div></div>
          <div className="orbit orbit3"><div className="orbit-ball"> <BsFillAirplaneFill/> </div></div>
        </div>
        {/* <Audio
            height = "80"
            width = "80"
            radius = "9"
            color = 'green'
            ariaLabel = 'three-dots-loading'     
            wrapperStyle
            wrapperClass
        />
        <ThreeCircles
  height="100"
  width="100"
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="three-circles-rotating" 
  outerCircleColor=""
  innerCircleColor=""
  middleCircleColor=""
/> */}
        </div>
   </div>
  )
}

export default Loader


