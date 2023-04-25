import axios from "axios"
import { axiosInstance } from "../../Network/axiosInstanc"


export const getComponiesList = () => (dispatch) =>  {

        return axiosInstance.get("data") 
        // return axios.get("")
            .then((result) => dispatch ({
                type: "LISTCOMPONIES",
                payload: result.data
            }))     
}