import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getId, getUsername } from "../services/AuthApi";

export default function Message({ socket, data }) {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const messagesContainerRef = useRef(null);

    const sendMessage = () => {
        if(message.length > 0){
            axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/messages/send`, {
                id_conversation: data.conversation_id,
                id_user: getId(),
                message: message
            })
            .then((res) => {
                if(res.data.success) {
                    setMessages([...messages, res.data.message]);
                    setMessage("");
                    scrollBottom();
                    socket.emit("message", {
                        message: res.data.message,
                        id_receiver: data.other_user_id
                    });
                }
            })
        }
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        if(e.key === "Enter") {
            sendMessage();
        }
    }

    const scrollBottom = () => {
        setTimeout(() => {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }, 0);
    }
    
    useEffect(() => {
        axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/messages`, { id_conversation: data.conversation_id})
        .then((res) => {
            if(res.data.success) {
                setMessages(res.data.messages);
                scrollBottom();
            } else {
                setMessages([]);
            }
        })
    
        socket.on("message", (newMessage) => {
            console.log("newMessage : ", newMessage)
        });
    }, [data]);

    return (
        <div className="conversation-content">
            <div className="user-info">
                <p className="username">{data.other_user_name}</p>
            </div>

            <div className="messages" ref={messagesContainerRef}>
                {messages.length === 0 ? (
                    <p>Vous n'avez pas de message</p>
                ) : (
                    (() => {
                        let lastDate = new Date(0);
                        return messages.map((message, index) => {
                            let messageDate = new Date(message.send_time);
                            return (
                                <React.Fragment key={message.id}>
                                    {(
                                        messageDate.getDate() !== lastDate.getDate() ||
                                        messageDate.getMonth() !== lastDate.getMonth() ||
                                        messageDate.getFullYear() !== lastDate.getFullYear()
                                    ) && (
                                        <div className="separateur">
                                            <span>
                                                {
                                                    (messageDate.getDate() === new Date().getDate() && 
                                                    messageDate.getMonth() === new Date().getMonth() && 
                                                    messageDate.getFullYear() === new Date().getFullYear()) ? (
                                                        "Aujourd'hui"
                                                    ) : (messageDate.getDate() + 1 === new Date().getDate() && 
                                                    messageDate.getMonth() === new Date().getMonth() && 
                                                    messageDate.getFullYear() === new Date().getFullYear()) ? (
                                                        "Hier"
                                                    ) : (
                                                        `${messageDate.getDate()}/${messageDate.getMonth() + 1}/${messageDate.getFullYear()}`
                                                    )
                                                }
                                                </span>
                                            <hr />
                                        </div>
                                    )}
                                    {(lastDate = messageDate) && (
                                        <div className={`message ${getId() === message.id_user ? "me" : "other"}`}>
                                            <p>{message.content}</p>
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        });
                    })()
                )}
            </div>

            <div className="send_message">
                <div className="input-send">
                    <input 
                    type="text" 
                    placeholder={`Envoyer un message à ${data.other_user_name}`} 
                    value={message}
                    onChange={handleChange}
                    onKeyUp={handleSubmit}
                    />
                </div>
                <ion-icon name="send-outline" onClick={sendMessage}></ion-icon>
            </div>
        </div>
    )
}