import React, { useContext, useState } from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { getId, getUsername } from '../../services/AuthApi';
import Auth from '../../contexts/Auth';

export default function Navbar(){
    
    const { isAuthenticated } = useContext(Auth);
    const [ongletActif, setOngletActif] = useState("chat");

    return (
        <nav>
            <div className="middle">
                <Link className='link' to="/dashboard">
                    <ion-icon className={ongletActif === "chat" ? "active-link" : ""} name="chatbubbles-outline"></ion-icon>
                </Link>
                <Link className="link" to="/friends">
                    <ion-icon className={ongletActif === "friends" ? "active-link" : ""} name="people-outline"></ion-icon>
                </Link>
                <Link className="link" to="settings">
                    <ion-icon className={ongletActif === "settings" ? "active-link" : ""} name="settings-outline"></ion-icon>
                </Link>
            </div>

            <div className="bottom">
                <div className="username-information">
                    <span id="username">{getUsername()}</span>
                </div>
            </div>
        </nav>
    )
}