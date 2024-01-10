import React, { useContext } from "react";
import Auth from "../../contexts/Auth";
import { getId, getUsername } from "../../services/AuthApi";
import axios from "axios";
import Conversation from "../../components/Conversation";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import AddUser from "../../components/AddUser";
import Message from "../../components/Message";
const io = require("socket.io-client");

const socket = io("http://localhost:5000", {
    id_user: getId()
});

const DashboardContextProvider = () => {
    const { isAuthenticated } = useContext(Auth);

    class Dashboard extends React.Component {

        constructor(props){
            super(props);
            this.state = {
                search: "",
                conversations: [],
                ongletActif: "home",
                currentConversation: {}
            }
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange = (e) => {
            this.setState({search: e.target.value});
        }

        componentDidMount(){
            if(!isAuthenticated) {
                window.location = "/login";
            }

            if(this.state.conversations.length === 0) {
                axios.post("http://localhost:5000/api/conversations", { id_user: getId()})
                .then((res) => {
                    if(res.data.success) {
                        this.setState({conversations: res.data.conversations});
                    }
                })
            }

            socket.emit("connected", { id_user: getId() });
        }

        componentWillUnmount(){
            socket.emit("disconnected", { id_user: getId() });
        }

        render(){
            return (
                <div className="dashboard">
                    <div className="sidebar">
                        <div className="header">
                            <h1>Chats</h1>
                            <ion-icon 
                            onClick={() => {
                                this.setState({ongletActif: "addUser"});
                                this.setState({currentConversation: {}});
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
                            value={this.search} 
                            onChange={this.handleChange} />
                        </div>

                        <hr />

                        <div className="conversations">
                            {
                                this.state.conversations.length === 0 ? (<p>Vous n'avez aucune conversation pour le moment</p>) : (
                                    this.state.conversations
                                    .filter(conversation => conversation.other_user_name.toLowerCase().includes(this.state.search.toLowerCase()))
                                    .map((conversation) => 
                                    <Conversation 
                                    key={conversation.conversation_id} 
                                    data={conversation}
                                    setOngletActif={() =>
                                        this.setState({ ongletActif: "conversation" })
                                    }
                                    setCurrentConversation={(conversation) => 
                                        this.setState({ currentConversation: conversation })
                                    }
                                    currentConversation={this.state.currentConversation}
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
                            this.state.ongletActif === "home" ? (
                                <div className="home">
                                    <p>Choisissez une conversation pour commencer à chatter</p>
                                </div>
                            ) : this.state.ongletActif === "conversation" ? (
                                <Message 
                                data={this.state.currentConversation}
                                socket={socket}
                                />
                            ) : (
                                <AddUser />
                            )
                        }

                    </div>
                </div>
            );
        }
    }

    return <Dashboard />;
}

export default DashboardContextProvider;