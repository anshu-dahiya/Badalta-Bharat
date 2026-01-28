import { configureStore } from "@reduxjs/toolkit";
import Langugage from '@/redux/langugage/languagesSlice'

export let store1  = configureStore({
    reducer:{
        languages: Langugage,
    }
})

export type RootState = ReturnType<typeof store1.getState>;
export type AppDispatch = typeof store1.dispatch