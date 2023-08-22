import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './types';

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    status: null,
    message: null
}

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        example: state => {
            state.loading = true
        }
    },
    extraReducers: {

    }
})

export const { example } = authSlice.actions
export default authSlice.reducer
