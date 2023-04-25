
const InitialValue ={
    list: [],
}

export default function ComponyReducer(state = InitialValue, action ){
    switch(action.type){
        case "LISTCOMPONIES": 
            return {
                ...state,
               list: action.payload
            }
        default: 
            return state
    }
}