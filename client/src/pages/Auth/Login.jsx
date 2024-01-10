import React, { useEffect, useState, useContext } from 'react';
import Auth from '../../contexts/Auth';
import { Link } from 'react-router-dom';
import "./Login.css";
import { login } from '../../services/AuthApi';

export default function Login() {
    
    const { isAuthenticated, setIsAuthenticated } = useContext(Auth);
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeEye = (e) => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let result = await login(credentials);
    
        setIsAuthenticated(result.success);
        if(!result.success){
            setError(result.message);
        } else {
            setError("");
            window.location = "/dashboard";
        }
    }

    useEffect(() => {
        if(isAuthenticated) {
            return window.location = "/dashboard";
        }
    }, [isAuthenticated]);

    return (
        <div id='login'>
            <div id="content">
                <h1>S'identifier</h1>

                <form action="">
                    <div className="input-group">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input 
                        type="email" 
                        name='email' 
                        id='email' 
                        placeholder='Adresse mail'
                        value={credentials.email}
                        onChange={handleChange} />
                    </div>
                
                    <div className="input-group">
                        <ion-icon name="key-outline"></ion-icon>
                        <input 
                        type={showPassword ? "text" : "password"} 
                        name='password' 
                        id='password' 
                        placeholder='Mot de passe'
                        value={credentials.password}
                        onChange={handleChange} />
                        {showPassword ? (
                            <ion-icon 
                            name="eye-off-outline" 
                            onClick={handleChangeEye}></ion-icon>
                        ) : (
                            <ion-icon 
                            name="eye-outline" 
                            onClick={handleChangeEye}></ion-icon>
                        )}
                    </div>

                    <div className="message">
                        <p className="error">{error}</p>
                    </div>

                    <button onClick={handleSubmit}>Se connecter</button>

                    <div className="links">
                        <p>Pas encore de compte ? <Link to="/signin">Inscrivez-vous ici</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}