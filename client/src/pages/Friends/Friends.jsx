import React, { useEffect, useState, useContext } from 'react';
import Auth from '../../contexts/Auth';
import axios from 'axios';
import { getId } from '../../services/AuthApi';
import './Friends.css';
import ModalAddFriend from '../../components/FriendsComponents/ModalAddFriend';
import ModalDeleteFriend from '../../components/FriendsComponents/ModalDeleteFriend';

export default function Friends({ socket }){

    const { isAuthenticated } = useContext(Auth);
    const [friends, setFriends] = useState([]);
    const [modalAddFriend, setModalAddFriend] = useState(false);
    const [modalDeleteFriend, setModalDeleteFriend] = useState({display: false, friend: {}});
    const [filter, setFilter] = useState("friends");

    const acceptFriend = (id) => {
        axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/relation/accept`, {
            id_user_ask: id,
            id_user_answer: getId()
         }).then((res) => {
            setFriends(friends.map((friend) => {
                if(friend.id === id) {
                    friend.status = 1;
                }
                return friend;
            }));

            socket.emit("acceptFriend", { id_user_ask: id, id_user_answer: getId() });
         })
    }

    const denyFriend = (id) => {
        axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/relation/deny`, {
            id_user_ask: id,
            id_user_answer: getId()
         }).then((res) => {
            setFriends(friends.filter((friend) => friend.id !== id));
         })

         socket.emit("denyFriend", { id_user_ask: id, id_user_answer: getId() });
    }

    useEffect(() => {
        if(!isAuthenticated) {
            window.location = "/login";
        } else {
            axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/relation/friends/ask`, { id: getId()})
            .then((res) => {
                setFriends(res.data.friends);
                console.log(res.data.friends)
            })
        }

        socket.on("addFriend", (newFriend) => {
            axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/relation/friends/ask`, { id: getId()})
            .then((res) => {
                setFriends(res.data.friends);
                console.log(res.data.friends)
            })
        });

        socket.on("acceptFriend", (newFriend) => {
            axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/relation/friends/ask`, { id: getId()})
            .then((res) => {
                setFriends(res.data.friends);
                console.log(res.data.friends)
            })
        });

        socket.on("denyFriend", (newFriend) => {
            axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/relation/friends/ask`, { id: getId()})
            .then((res) => {
                setFriends(res.data.friends);
                console.log(res.data.friends)
            })
        });

        return () => {
            socket.off("acceptFriend");
            socket.off("denyFriend");
            socket.off("addFriend");
        }

    }, [isAuthenticated, socket]);
    

    return(
        <div className='friends'>

            {
                modalAddFriend && 
                <ModalAddFriend 
                    setModalAddFriend={(val) => setModalAddFriend(val)}
                    setFriends={(val) => setFriends([...friends, val])}
                    socket={socket}
                 />
            }

            {
                modalDeleteFriend.display && 
                <ModalDeleteFriend 
                    setModalDeleteFriend={() => setModalDeleteFriend({display: false, friend: {}})}
                    setFriends={() => setFriends(friends.filter((friend) => friend.id !== modalDeleteFriend.friend.id))}
                    friend={modalDeleteFriend.friend}
                 />
            }

            <div className="header">
                <h1>Amis</h1>
                
                <button onClick={() => setModalAddFriend(true)} className="btn" id='add_friend'>
                    <ion-icon name="person-add-outline"></ion-icon>
                    <span>Ajouter un ami</span>
                </button>
            </div>

            <div className="main">

                <div className="filter">
                    <div className={`btn ${filter === "friends" ? "selected" : ""}`} onClick={() => setFilter('friends')}>
                        <span>Vos amis</span>
                    </div>
                    <div className={`btn ${filter === "ask" ? "selected" : ""}`} onClick={() => setFilter('ask')}>
                        <span>Vos demandes d'ami</span>
                    </div>
                </div>

                <div className="friends-list">
                    {
                        friends.length > 0 ? (
                            friends
                            .filter((friend) => friend.status === (filter === "friends" ? 1 : 0))
                            .map((friend, index) => {
                                return (
                                    <div className="friend" key={index}>
                                        <div className="friend-info">
                                            <img src={friend.avatar} alt="friend" />
                                            <p>{friend.username}</p>
                                        </div>
                                        <div className="friend-option">
                                            {
                                                friend.status === 1 ? (
                                                    <>
                                                        <ion-icon name="chatbubble-outline"></ion-icon>
                                                        <ion-icon onClick={() => setModalDeleteFriend({display: true, friend: friend})} name="person-remove-outline"></ion-icon>
                                                    </>
                                                ) : (
                                                    friend.emit === getId() ? (
                                                        <>
                                                            <span>En attente</span>
                                                            <ion-icon onClick={() => setModalDeleteFriend({display: true, friend: friend})} className="danger-icon" name="person-remove-outline"></ion-icon>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ion-icon onClick={() => acceptFriend(friend.id)} className="success-icon" name="person-add-outline"></ion-icon>
                                                            <ion-icon onClick={() => denyFriend(friend.id)} className="danger-icon" name="person-remove-outline"></ion-icon>
                                                        </>
                                                    )
                                                )
                                            }
                                            
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