import { combineReducers } from "redux";
import ComponyReducer from "./ComponaiesReducer";
import LangReducer from "./LangReducer";
import LoaderReducer from "./LoaderReducer";
import ThemeReducer from "./ThemeReducer";





export default combineReducers({
   Rlang: LangReducer,
    Rtheme: ThemeReducer,
    Rloader: LoaderReducer,
    Rlist: ComponyReducer

})