import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import reducer from "./Reducer"
import CombineReducers from "./Reducers/CombineReducers";
import thunk from "redux-thunk"

const mystore = createStore(CombineReducers, composeWithDevTools(applyMiddleware(thunk)))


export default mystore