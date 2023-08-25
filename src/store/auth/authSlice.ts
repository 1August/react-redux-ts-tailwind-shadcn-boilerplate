import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginData, NullableAuthState, UserResponse } from './types';
import { Status } from '../../lib/api';
import axios, { AxiosResponse } from 'axios';

type State = AuthState | NullableAuthState

const initialState: State = {
    user: null,
    token: null,
    loading: false,
    status: 204,
}

export const login = createAsyncThunk(
    'auth/login',
    async (data: LoginData, thunkAPI) => {
        const url = 'user/login'
        return await axios
            .post(url, data)
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    return thunkAPI.rejectWithValue(error.response)
                }
                return thunkAPI.rejectWithValue('Unknown error while login')
            })
    },
)

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: createReducers(),
    extraReducers: builder => {
        // builder.addCase(login.pending, (state) => {
        //     state.loading = true
        //     state.status = 204
        // })
        // builder.addCase(login.fulfilled, (state, { payload }) => {
        //     state.loading = false
        //     state.status = 200
        //     state.user = payload.user
        //     state.token = payload.token
        // })
        // builder.addCase(login.rejected, (state, { payload }) => {
        //     state.loading = false
        //     state.status = payload
        // })
    },
})

function createReducers() {
    return {
        loginSuccess: (state: State, { payload }: PayloadAction<UserResponse>) => {
            try {
                localStorage.setItem('user', JSON.stringify(payload.user))
                localStorage.setItem('token', payload.token)
            } catch (error) {
                throw new Error('Error on login')
            }

            state.token = payload.token
            state.user = { ...payload.user }
        },
        logout: (state: State) => {
            try {
                localStorage.removeItem('user')
                localStorage.removeItem('token')
            } catch (error) {
                throw new Error('Error on logout')
            }

            state.user = null
            state.token = null
        },

        setLoadingStart: (state: State) => {
            state.loading = true
        },
        setLoadingEnd: (state: State) => {
            state.loading = false
        },
        setStatus: (state: State, { payload }: PayloadAction<Status>) => {
            state.status = payload
        },
    }
}


// const createExtraReducers = {
//     // builder.addCase(fetchUser.pending, (state) => {
//     //     state.loading = true
//     //     state.status = 204
//     // })
//     // builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
//     //     state.loading = false
//     //     state.status = 200
//     //     // state.user = {
//     //     //     name: payload.user?.name,
//     //     //     email: payload.user?.email
//     //     // }
//     //     state.token = payload.token
//     // })
//     // builder.addCase(fetchUser.rejected, (state) => {
//     //     state.loading = false
//     // })
// }

// export const fetchUser = createAsyncThunk(
//     'auth/fetchUser',
//     async (id: number, thunkAPI) => {
//         const url = `user/${id}`
//         const source = axios.CancelToken.source()
//
//         thunkAPI.signal.addEventListener('abort', () => {
//             source.cancel('Request canceled')
//         })
//
//         try {
//             const response = await axios
//                 .get<UserResponse>(url, { cancelToken: source.token })
//             return response.data
//         } catch (error) {
//             if (axios.isCancel(error)){
//                 console.log('Request canceled', error.message)
//             }
//             throw error
//         }
//     },
// )

export const {
    loginSuccess,
    logout,
    setLoadingStart,
    setLoadingEnd,
    setStatus,
} = authSlice.actions
export default authSlice.reducer
