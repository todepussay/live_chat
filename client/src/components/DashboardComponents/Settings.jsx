import React from "react";
import "./Settings.css";

export default function Settings() {
    return (
        <div className="setting-content">
            <div className="header-setting">
                <h2>Paramètres</h2>
            </div>

            <div className="content-setting">
                <div className="input-group">
                    <label htmlFor="username">Changer votre nom d'utilisateur</label>
                    <input type="text" />
                </div>
            </div>
        </div>
    )
}