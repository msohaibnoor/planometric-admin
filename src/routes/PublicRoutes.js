import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const Login = Loadable(lazy(() => import('views/auth/login')));
const ForgetPassword = Loadable(lazy(() => import('views/auth/forgetPassword')));
const ResetPassword = Loadable(lazy(() => import('views/auth/resetPassword')));


// ==============================|| AUTH ROUTING ||============================== //

const PublicRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/forgetpassword',
            element: <ForgetPassword />
        },
        {
            path: '/reset-password',
            element: <ResetPassword />
        }
    ]
};

export default PublicRoutes;
