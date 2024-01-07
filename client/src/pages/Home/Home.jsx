import React from 'react';
import Auth from '../../contexts/Auth';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

export default function Home() {

    const { isAuthenticated } = useContext(Auth);

    return isAuthenticated ? (
        <Navigate to="/dashboard" />
    ) : (
        <Navigate to="/login" />
    )
}