import Dentistry from "../components/Dentistry/Dentistry";
import Hair from "../components/Hair/Hair";
import MedicalTorism from "../components/MedicalTourism/MedicalTourism";
import Search from "../components/Search/Search";
import SliderTreatment from "../components/Slider/SliderTreatment";
import Form from 'react-bootstrap/Form';
import { useState } from "react";

function Treatment() {
    let [component, setComponent] = useState("")
    const ChangeService = (e) => {
        if (e.target.value === 'Hair') {
            setComponent(<Hair />)
        }
        else if (e.target.value === 'Dentistry') {
            setComponent(<Dentistry />)
        }
        else if (e.target.value === 'MedicalTorism') {
            setComponent(<MedicalTorism />)
        }
        else {
            return setComponent(<>
                <Hair />
                <Dentistry />
                <MedicalTorism />
            </>)
        }
    }
    return (
        <>

            <SliderTreatment />
            <Hair />
            <Dentistry />
            <MedicalTorism />


        </>
    )
}
export default Treatment