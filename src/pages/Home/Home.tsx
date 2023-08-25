import { useEffect } from 'react';
import { User } from '../../store/auth/types';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, isLoading } from '../../store/auth/authActions';
import { cn } from '../../lib/utils';
import { setLoadingEnd, setLoadingStart } from '../../store/auth/authSlice';
import axios from 'axios';

export const Home = () => {
    const dispatch = useDispatch()
    const loading = useSelector(isLoading)
    const user = useSelector(getUser)

    useEffect(() => {
        dispatch(setLoadingStart())

        setTimeout(() => {
            const user: User = {
                name: 'Name',
                email: 'email@example.com'
            }
            dispatch(setLoadingEnd())
            // dispatch(setUser(user))
        }, 3000)
    }, []);

    // useEffect(() => {
    //     const url = ''
    //     const source = axios.CancelToken.source()
    //
    //     axios
    //         .get<User>(url, {
    //             cancelToken: source.token,
    //         })
    //         .then(res => {
    //             console.log(res.data)
    //             // dispatch(fetchUser())
    //         })
    //
    //     return () => {
    //         source.cancel()
    //     }
    // }, []);

    if (loading) return (
        <h1>Loading...</h1>
    )
    if (user == null) return (
        <h1>User is null</h1>
    )
    return (
        <div>
            <h1 className={cn('text-4xl font-bold font-medium')}>
                Home page
            </h1>
            <h3>{user.name} - user.email</h3>
        </div>
    )
}
