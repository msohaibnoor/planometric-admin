import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// project imports
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const SuperAdminGuard = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    useEffect(() => {
        if (token == '') {
            navigate('/', { replace: true });
        }
    }, [token]);

    return children;
};

SuperAdminGuard.propTypes = {
    children: PropTypes.node
};

export default SuperAdminGuard;
