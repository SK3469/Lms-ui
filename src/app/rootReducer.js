import { authApi } from "@/feature/api/authApi";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/feature/authSlice.js"
import { courseApi } from "@/feature/api/courseApi";
import { purchaseApi } from "@/feature/api/purchaseApi";
import { courseprogressApi } from "@/feature/api/courseProgressApi";


const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,  //name should be corrected this Path take my 30-40min 
    [purchaseApi.reducerPath]: purchaseApi.reducer,  //name should be corrected this Path take my 30-40min 
    [courseprogressApi.reducerPath]: courseprogressApi.reducer,  //name should be corrected this Path take my 30-40min 
    auth:authReducer,
});
export default rootReducer;