import React, { useState } from "react";
import "./Compte.css";
import { getUsername, getAvatar, getId, updateCompte } from '../../services/AuthApi';
import axios from "axios";

export default function Compte() {

    const [username, setUsername] = useState("");
    const [oldAvatar, setOldAvatar] = useState(getAvatar());
    const [newAvatar, setNewAvatar] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState({error: false, message: ""});

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleSubmit = async (e) => {
        setError({error: false, message: ""});

        if(password !== passwordConfirm) {
            setError({error: true, message: "Les mots de passe ne correspondent pas"});
            return;
        } else {
            if(password !== "" && password.length < 8) {
                setError({error: true, message: "Le mot de passe doit contenir au moins 8 caractères"});
                return;
            }
        }

        const res = await updateCompte({ username: username, password: password, file: newAvatar });
    }

    return(
        <div className="Compte">

            <h2>Paramètre de compte</h2>
            
            <div className="input">
                <label htmlFor="username">Nouveau nom d'utilisateur : </label>
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    value={username} 
                    placeholder={getUsername()} 
                    onChange={handleChangeUsername} />
            </div>

            <div className="input">
                <label htmlFor="password">Nouveau mot de passe : </label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="input">
                <label htmlFor="passwordConfirm">Confirmer le mot de passe : </label>
                <input 
                    type="password" 
                    name="passwordConfirm" 
                    id="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)} />
            </div>

            <div className="input-avatar">
                <p>Changer votre avatar :</p>
                <div className="avatar">
                    <div className="new-avatar">
                        {
                            newAvatar ? (
                                <>
                                    <img src={URL.createObjectURL(newAvatar)} />
                                    <button onClick={() => setNewAvatar(null)} id="delete-avatar">Supprimer</button>
                                </>
                            ) : (
                                <>
                                    <label htmlFor="newAvatar">Insèrer votre nouvel avatar ici</label>
                                    <input type="file" name="newAvatar" onChange={(e) => setNewAvatar(e.target.files[0])} />
                                </>
                            )
                        }
                    </div>
                    <div className="old-avatar">
                        <img src={oldAvatar} />
                    </div>
                </div>
            </div>

            {
                error.error && (
                    <div className="error">
                        <p>{error.message}</p>
                    </div>
                )
            }

            <input onClick={handleSubmit} type="submit" value="Appliquer les changements" />

        </div>
    )
}