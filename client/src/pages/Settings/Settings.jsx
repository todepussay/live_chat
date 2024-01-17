import React, { useState, useEffect, useContext } from 'react';
import "./Settings.css";
import Auth from '../../contexts/Auth';
import Compte from '../../components/SettingsComponents/Compte';
import Notification from '../../components/SettingsComponents/Notification';

export default function Settings() {

    const { isAuthenticated } = useContext(Auth);
    const [ongletActive, setOngletActive] = useState("compte");

    useEffect(() => {
        if(!isAuthenticated) {
            window.location = "/login";
        }
    }, []);

    return(
        <div className="Settings">
            <div className="header">
                <h1>Paramètre</h1>
            </div>

            <div className="main">
                
                <div className="onglets">

                    <div className={`onglet ${ongletActive === "compte" ? "active" : ""}`} onClick={() => setOngletActive('compte')}>
                        <span>Compte</span>
                    </div>

                    <div className={`onglet ${ongletActive === "notification" ? "active" : ""}`} onClick={() => setOngletActive('notification')}>
                        <span>Notifications</span>
                    </div>

                </div>

                <div className="content">
                    {
                        ongletActive === "compte" ? (
                            <Compte />
                        ) : (
                            <Notification />
                        )
                    }
                </div>

            </div>
        </div>
    )

} 