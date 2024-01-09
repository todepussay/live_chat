import React, { useEffect, useContext, useState } from "react";
import Auth from "../../contexts/Auth";
import { getId, getUsername } from "../../services/AuthApi";
import axios from "axios";
import Conversation from "../../components/Conversation";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import AddUser from "../../components/AddUser";
import Message from "../../components/Message";

export default function Dashboard() {
    const { isAuthenticated } = useContext(Auth);
    const [search, setSearch] = useState("");
    const [conversations, setConversations] = useState([]);
    const [ongletActif, setOngletActif] = useState("home");
    const [currentConversation, setCurrentConversation] = useState({});

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        if(!isAuthenticated) {
            window.location = "/login";
        }

        if(conversations.length === 0) {
            axios.post("http://localhost:5000/api/conversations", { id_user: getId()})
            .then((res) => {
                if(res.data.success) {
                    setConversations(res.data.conversations);
                }
            })
        }

    }, [isAuthenticated]);

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="header">
                    <h1>Chats</h1>
                    <ion-icon 
                    onClick={() => {
                        setOngletActif("addUser");
                        setCurrentConversation({});
                    }}
                    name="add-circle-outline"></ion-icon>
                </div>

                <div className="search-box">
                    <ion-icon name="search-outline"></ion-icon>
                    <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    placeholder="Rechercher"
                    value={search} 
                    onChange={handleChange} />
                </div>

                <hr />

                <div className="conversations">
                    {
                        conversations.length === 0 ? (<p>Vous n'avez aucune conversation pour le moment</p>) : (
                            conversations
                            .filter(conversation => conversation.other_user_name.toLowerCase().includes(search.toLowerCase()))
                            .map((conversation) => 
                            <Conversation 
                            key={conversation.conversation_id} 
                            data={conversation}
                            setOngletActif={setOngletActif}
                            setCurrentConversation={setCurrentConversation}
                            currentConversation={currentConversation}
                            ></Conversation>)
                        )
                    }
                </div>

                <div className="settings">
                    <span id="username">Bonjour {getUsername()}</span>
                    <Link to="/logout">Se deconnecter</Link>
                </div>
                
            </div>
            <div className="main">

                {
                    ongletActif === "home" ? (
                        <div className="home">
                            <p>Choisissez une conversation pour commencer à chatter</p>
                        </div>
                    ) : ongletActif === "conversation" ? (
                        <Message data={currentConversation}></Message>
                    ) : (
                        <AddUser />
                    )
                }

            </div>
        </div>
    )
}