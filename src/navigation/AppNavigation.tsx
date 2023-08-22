import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';

export const AppNavigation = () => {
    return(
        <Routes>
            <Route path={'/'} element={<Home/>}/>
        </Routes>
    )
}
