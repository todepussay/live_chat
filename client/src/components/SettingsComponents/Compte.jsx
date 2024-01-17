import React from "react";
import "./Compte.css";
import { getUsername, getAvatar } from '../../services/AuthApi';

export default function Compte() {
    return(
        <div className="Compte">
            
            <div className="input">
                <label htmlFor="username">Nouveau nom d'utilisateur</label>
                <input type="text" name="username" id="username" />
            </div>

            <div className="input">
                <label htmlFor="password">Nouveau mot de passe</label>
                <input type="password" name="password" id="password" />
                <ion-icon name="eye-off-outline"></ion-icon>
            </div>

            <div className="input-avatar">
                <div className="new-avatar">
                    
                </div>
                <div className="old-avatar">
                    <img src={`/asset/avatar/${getAvatar()}`} />
                </div>
            </div>

        </div>
    )
}