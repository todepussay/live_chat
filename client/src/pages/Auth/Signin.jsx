import React, { useState, useEffect, useContext } from "react";
import "./Login.css";
import Auth from "../../contexts/Auth";
import { Link } from "react-router-dom";
import axios from "axios";
import { setItem } from "../../services/LocalStorage";

export default function Signin() {
    
    const { isAuthenticated, setIsAuthenticated } = useContext(Auth);
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeEye = (e) => {
        setShowPassword({
            ...showPassword,
            [e]: !showPassword[e]
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if(credentials.username === "" || credentials.email === "" || credentials.password === "" || credentials.confirmPassword === "") {
            setError("Veuillez remplir tous les champs");
            return;
        }

        if(credentials.password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères");
            return;
        }

        if(credentials.password !== credentials.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        axios.post("http://localhost:5000/api/signin", credentials)
        .then((res) => {
            if(res.data.success){
                setItem('authToken', res.data.token);
                setIsAuthenticated(true);
                window.location = "/dashboard";
            } else {
                setError(res.data.message);
            }
        })
    }

    return (
        <div id="login">
            <div id="content">
                <h1>S'inscrire</h1>

                <form>

                    <div className="input-group">
                        <ion-icon name="person-outline"></ion-icon>
                        <input type="text" name='username' id='username' placeholder="Nom d'utilisateur" value={credentials.username} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" name='email' id='email' placeholder="Adresse mail" value={credentials.email} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input 
                        type={showPassword.password ? "text" : "password"}
                        name='password' 
                        id='password' 
                        placeholder="Mot de passe" value={credentials.password} onChange={handleChange} />
                        {showPassword.password ? (
                            <ion-icon 
                            name="eye-off-outline" 
                            onClick={() => handleChangeEye("password")}></ion-icon>
                        ) : (
                            <ion-icon 
                            name="eye-outline" 
                            onClick={() => handleChangeEye("password")}></ion-icon>
                        )}
                    </div>

                    <div className="input-group">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input 
                        type={showPassword.confirmPassword ? "text" : "password"}
                        name='confirmPassword' 
                        id='confirmPassword' 
                        placeholder="Confirmer le mot de passe" value={credentials.confirmPassword} onChange={handleChange} />
                        {showPassword.confirmPassword ? (
                            <ion-icon 
                            name="eye-off-outline" 
                            onClick={() => handleChangeEye("confirmPassword")}></ion-icon>
                        ) : (
                            <ion-icon 
                            name="eye-outline" 
                            onClick={() => handleChangeEye("confirmPassword")}></ion-icon>
                        )}
                    </div>  

                    <div className="message">
                        <p className="error">{error}</p>
                    </div>

                    <button onClick={handleSubmit}>S'inscrire</button>

                    <div className="links">
                        <p>Déjà un compte ? <Link to="/login">Connectez-vous ici</Link></p>
                    </div>

                </form>
            </div>
        </div>
    )
}