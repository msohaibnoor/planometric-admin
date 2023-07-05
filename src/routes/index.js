import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// routes
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const userData = useSelector((state) => state.auth);
    if (userData.user) {
        return useRoutes([ProtectedRoutes]);
    } else {
        return useRoutes([PublicRoutes]);
    }
}
