import React, { useState, useEffect } from "react";
import axios from "axios";
import { getId } from "../../services/AuthApi";
import './ModalAddFriend.css';

export default function ModalAddFriend({ setModalAddFriend, setFriends, socket }) {

    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    const addFriend = (id) => {
        axios.post(`http:///${process.env.REACT_APP_SERVER_URL}/api/relation/add`, { 
            id_user_ask: getId(),
            id_user_answer: id,
         })
        .then((res) => {
            let user = users.find((user) => user.id === id);
            user.status = 0;
            setFriends(user);
            setUsers(users.filter((user) => user.id !== id));
            socket.emit("addFriend", { id_user_ask: getId(), id_user_answer: id });
        })
    }

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
                    <ion-icon name="close-outline" onClick={() => setModalAddFriend(false)}></ion-icon>
                </div>
                <div className="modal-body">

                    <div className="input-group">
                        <ion-icon name="search-outline"></ion-icon>
                        <input 
                        type="text" 
                        placeholder="Rechercher un utilisateur"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        />
                    </div>

                    <div className="users">
                        {
                            users
                            .filter((user) => {
                                return user.username.toLowerCase().includes(search.toLowerCase());
                            })
                            .map((user) => {
                                return (
                                    <div className="user" key={user.id}>
                                        <div className="user-info" key={user.id}>
                                            <img src={`/asset/avatar/${user.avatar}`} alt="user" />
                                            <p>{user.username} ({user.email})</p>
                                        </div>
                                        <button className="btn" onClick={() => addFriend(user.id)}>
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