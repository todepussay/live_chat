import React from "react";
import { getId } from "../../services/AuthApi";
import "./Conversation.css";
import { getAvatar } from "../../services/AuthApi";

export default function Conversation({ data, setOngletActif, setCurrentConversation, currentConversation }) {

    const createDate = (d) => {
        const now = new Date();
        const date = new Date(d);
        
        if(now.getDay() === date.getDay() && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
            return `${date.getHours()}:${date.getMinutes()}`;
        }

        if(now.getDay() === date.getDay + 1 && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
            return `Hier`;
        }

        return `${date.getDate()}/${date.getMonth() < 10 ? "0" : ""}${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    const clickConversation = () => {
        setOngletActif("conversation");
        setCurrentConversation(data);
    }

    return(
        <div className={`conversation ${currentConversation?.conversation_id === data.conversation_id ? "active" : ""}`} onClick={clickConversation}>
            <div className="avatar">
                <img src={`/asset/avatar/${data.avatar}`} alt="" />
            </div>
            <div className="content-info">
                <div className="info">
                    <p className="name">{data.other_user_name}</p>
                    <p className="date">{createDate(data.last_update)}</p>
                </div>
                <div className="message-box">
                    <p>
                        {data.send_message_user === getId() ? "Vous: " : ""}
                        {data.last_message_content ? data.last_message_content : `Vous avez ajouté ${data.other_user_name}`}
                    </p>
                    <p className="notif"></p>
                </div>
            </div>
        </div>
    )
}