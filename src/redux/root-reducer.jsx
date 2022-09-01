
import { combineReducers } from "redux";
import usersReducers from "./reducer";

const rootReducer = combineReducers({
    data: usersReducers
    // with the help of users key, we will be able to access the redux store
})

export default rootReducer;