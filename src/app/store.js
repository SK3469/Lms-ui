import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer.js"
import { authApi } from "@/feature/api/authApi.js"
import { courseApi } from "@/feature/api/courseApi.js";
import { purchaseApi } from "@/feature/api/purchaseApi.js";
import { courseprogressApi } from "@/feature/api/courseProgressApi.js";

export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware,courseApi.middleware,purchaseApi.middleware, courseprogressApi.middleware)
})
//this to make sure after refreshing user data remains persist(not lost in any moment).
const initalizeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
};
initalizeApp();