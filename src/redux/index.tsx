import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import reducer from "./toolkitRedux";


const rootReducer = combineReducers({
    toolkit: reducer,
     
})

export const store = configureStore({
    reducer: rootReducer,
})