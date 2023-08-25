import axios from 'axios';

export const api = axios.create({

})

export type ApiResponse = {
    status: Status
    loading: Loading
}

export type Status = number
export type Loading = boolean
