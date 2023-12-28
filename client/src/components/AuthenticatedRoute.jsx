import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from '../contexts/Auth';

const AuthenticatedRoute = ({ path, component: Component }) => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? (
        <Route exact path={path} component={Component} />
    ) : (
        <Navigate to="/login" />
    );
};

export default AuthenticatedRoute;
