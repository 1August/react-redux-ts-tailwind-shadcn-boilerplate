import { RootState } from '../store';

export const getUser = (state: RootState) => state.auth.user
export const getUserToken = (state: RootState) => state.auth.token
export const isLoading = (state: RootState) => state.auth.loading
export const getStatus = (state: RootState) => state.auth.status
