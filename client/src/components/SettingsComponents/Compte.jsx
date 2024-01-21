import React, { useState } from "react";
import "./Compte.css";
import { getUsername, getAvatar } from '../../services/AuthApi';

export default function Compte() {

    const [username, setUsername] = useState("");
    const [oldAvatar, setOldAvatar] = useState(getAvatar());
    const [newAvatar, setNewAvatar] = useState(null);

    const handleChange = (e) => {
        setNewAvatar(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(newAvatar){
            
        }
    }

    return(
        <div className="Compte">

            <h2>Paramètre de compte</h2>
            
            <div className="input">
                <label htmlFor="username">Nouveau nom d'utilisateur : </label>
                <input type="text" name="username" id="username" value={username} placeholder={getUsername()} onChange={() => setUsername()} />
            </div>

            <button>
                Changer votre mot de passe
            </button>

            <div className="input-avatar">
                <p>Changer votre avatar :</p>
                <div className="avatar">
                    <div className="new-avatar">
                        {
                            newAvatar ? (
                                <>
                                    <img src={newAvatar} />
                                    <button onClick={() => setNewAvatar(null)} id="delete-avatar">Supprimer</button>
                                </>
                            ) : (
                                <>
                                    <label htmlFor="newAvatar">Insèrer votre nouvel avatar ici</label>
                                    <input type="file" name="newAvatar" onChange={handleChange} />
                                </>
                            )
                        }
                    </div>
                    <div className="old-avatar">
                        <img src={`/asset/avatar/${oldAvatar}`} />
                    </div>
                </div>
            </div>

            <input onClick={handleSubmit} type="submit" value="Appliquer les changements" />

        </div>
    )
}