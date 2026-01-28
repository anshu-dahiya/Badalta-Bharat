    import {createSlice, PayloadAction} from '@reduxjs/toolkit'
    
    type Languages = 'en' | 'hn' ;
    
    interface laguagesstate {
        lang: Languages;
    }

    let initialstate: laguagesstate ={
        lang: 'en'
    }

    let languageslice = createSlice({
        name: 'languages',
        initialState: initialstate,
        reducers: {
            changeLanguage: (state, action: PayloadAction<Languages>) => {
                state.lang = action.payload;
            }
        }
    })

    export let {changeLanguage} = languageslice.actions;
    export default languageslice.reducer