import React, { useEffect, useState } from "react";
import axios from "axios";
import { getId } from "../services/AuthApi";

export default function AddUser(){

    const [addUser, setAddUser] = useState("");
    const [users, setUsers] = useState([]);

    const handleChange = (event) => {
        setAddUser(event.target.value);
    }

    const handleClick = (id) => {
        axios.post("http://localhost:5000/api/adduser/add", { id_user1: getId(), id_user2: id})
        .then((res) => {
            if(res.data.success){
                window.location = "/dashboard";
            }
        })
    }

    useEffect(() => {
        axios.post("http://localhost:5000/api/adduser", { id_user: getId()})
        .then((res) => {
            if(res.data.success){
                setUsers(res.data.users);
            }
        })
    }, [])

    return(
        <div className="addUser">
            <div className="header">
                <h2>Ajouter un nouvel utilisateur</h2>
            </div>

            <div className="input-addUser">
                <input type="text" name="addUser" id="addUser" value={addUser} onChange={handleChange} placeholder="Rechercher un utilisateur" />
            </div>
            
            <div className="resultat">
                {users
                .filter((user) => user.email.includes(addUser))
                .slice(0, 20)
                .map((user) => (
                    <div className="user" key={user.id}>
                        <p>{user.email}</p>
                        <button onClick={() => handleClick(user.id)}>
                            <ion-icon name="person-add-outline"></ion-icon>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}