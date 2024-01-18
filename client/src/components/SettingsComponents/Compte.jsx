import React, { useState } from "react";
import "./Compte.css";
import { getUsername, getAvatar } from '../../services/AuthApi';

export default function Compte() {

    const [username, setUsername] = useState(getUsername());
    const [oldAvatar, setOldAvatar] = useState(getAvatar());
    const [newAvatar, setNewAvatar] = useState(null);

    const handleChange = (e) => {
        setNewAvatar(URL.createObjectURL(e.target.files[0]));
    }

    return(
        <div className="Compte">
            
            <div className="input">
                <label htmlFor="username">Nouveau nom d'utilisateur</label>
                <input type="text" name="username" id="username" value={username} onChange={() => setUsername()} />
            </div>

            <button>
                Changer votre mot de passe
            </button>

            <div className="input-avatar">
                <div className="new-avatar">
                    {
                        newAvatar ? (
                            <img src={newAvatar} />
                        ) : (
                            <>
                                <label htmlFor="newAvatar">Insèrer votre nouvel avatar</label>
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
    )
}