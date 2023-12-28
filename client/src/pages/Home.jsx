import React from 'react';
import Auth from '../contexts/Auth';
import { useContext } from 'react';

export default function Home() {

    const { isAuthenticated } = useContext(Auth);

    return (
        <div>
            <h1>Bienvenue</h1>

            {isAuthenticated ? (
                <p>Vous êtes connecté !</p>
            ) : (
                <p>Vous n'êtes pas connecté.</p>
            )}
        </div>
    )
}