import React, { useState, useEffect } from "react";
import axios from "axios";
import { getId } from "../../services/AuthApi";
import './ModalAddFriend.css';

export default function ModalAddFriend() {

    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:5000/api/relation/users", { id: getId() })
        .then((res) => {
            setUsers(res.data.users);
        })
    }, []);

    return (
        <div className="ModalAddFriend">
            <div className="bg-modal"></div>
            
            <div className="modal-content">
                <div className="modal-header">
                    <p>Ajouter un ami</p>
                    <ion-icon name="close-outline"></ion-icon>
                </div>
                <div className="modal-body">
                    <input 
                    type="text" 
                    />

                    <div className="users">
                        {
                            users
                            .filter((user) => {
                                return user.username.toLowerCase().includes(search.toLowerCase());
                            })
                            .map((user) => {
                                return (
                                    <div className="user">
                                        <div className="user-info" key={user.id}>
                                            <img src={`/asset/avatar/${user.avatar}`} alt="user" />
                                            <p>{user.username} ({user.email})</p>
                                        </div>
                                        <button className="btn">
                                            <ion-icon name="person-add-outline"></ion-icon>
                                            <span>Ajouter</span>
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}