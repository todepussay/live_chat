import React, { useContext, useState } from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { getAvatar } from '../../services/AuthApi';
import Auth from '../../contexts/Auth';

export default function Navbar(){
    
    const { isAuthenticated } = useContext(Auth);
    const [ongletActif, setOngletActif] = useState("chat");

    return isAuthenticated ? (
        <nav>
            <div className="middle">
                <Link onClick={() => setOngletActif("chat")} className={`link ${ongletActif === "chat" ? "active-link" : ""}`} to="/dashboard">
                    <ion-icon name="chatbubbles-outline"></ion-icon>
                </Link>
                <Link onClick={() => setOngletActif("friends")} className={`link ${ongletActif === "friends" ? "active-link" : ""}`} to="/friends">
                    <ion-icon name="people-outline"></ion-icon>
                </Link>
                <Link onClick={() => setOngletActif("settings")} className={`link ${ongletActif === "settings" ? "active-link" : ""}`} to="settings">
                    <ion-icon name="settings-outline"></ion-icon>
                </Link>
            </div>

            <div className="bottom">
                <img src={`/asset/avatar/${getAvatar()}`} alt="" />
            </div>


        </nav>
    ) : null;
}