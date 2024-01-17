import React, { useEffect, useState, useContext } from 'react';
import Auth from '../../contexts/Auth';
import axios from 'axios';
import { getId } from '../../services/AuthApi';
import './Friends.css';
import ModalAddFriend from '../../components/FriendsComponents/ModalAddFriend';

export default function Friends(){

    const { isAuthenticated } = useContext(Auth);
    const [friends, setFriends] = useState([]);
    const [modalAddFriend, setModalAddFriend] = useState(false);

    useEffect(() => {
        
        if(!isAuthenticated) {
            window.location = "/login";
        } else {
            axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/relation/friends`, { id: getId()})
            .then((res) => {
                setFriends(res.data.friends);
                console.log(res.data.friends)
            })
        }

    }, []);
    

    return(
        <div className='friends'>

            {
                modalAddFriend && <ModalAddFriend />
            }

            <div className="header">
                <h1>Amis</h1>
                
                <button onClick={() => setModalAddFriend(true)} className="btn" id='add_friend'>
                    <ion-icon name="person-add-outline"></ion-icon>
                    <span>Ajouter un ami</span>
                </button>
            </div>

            <div className="main">
                <div className="friends-list">
                    {
                        friends.length > 0 ? (
                            friends.map((friend, index) => {
                                return (
                                    <div className="friend" key={index}>
                                        <div className="friend-info">
                                            <img src={`/asset/avatar/${friend.avatar}`} alt="friend" />
                                            <p>{friend.username}</p>
                                        </div>
                                        <div className="friend-option">
                                            <ion-icon name="chatbubble-outline"></ion-icon>
                                            <ion-icon name="person-remove-outline"></ion-icon>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="no-friend">
                                Vous n'avez pas encore d'ami
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}