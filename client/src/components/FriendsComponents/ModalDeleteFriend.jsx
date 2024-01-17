import React from 'react';
import "./ModalDeleteFriend.css";
import axios from 'axios';
import { getId } from '../../services/AuthApi';

export default function ModalDeleteFriend({ setModalDeleteFriend, setFriends, friend }) {

    const deleteFriend = () => {

        axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/relation/delete`, {
            id_user1: getId(),
            id_user2: friend.id
        })
        .then((res) => {
            if(res.data.success){
                setFriends();
                setModalDeleteFriend();
            }
        });

    }

    return (
        <div className="ModalDeleteFriend">
            <div className="bg-modal"></div>
            
            <div className="modal-content">
                <div className="modal-header">
                    <p>Suppresion d'un ami </p>
                    <ion-icon name="close-outline" onClick={() => setModalDeleteFriend()}></ion-icon>
                </div>
                <div className="modal-body">
                    
                    <p>Êtes-vous sûr de vouloir supprimer {friend.username} de vos amis ?</p>
                    <p>Vous perderez toute votre conversation.</p>

                    <div className="btn-choice">
                        <button id="yes" onClick={deleteFriend}>Oui, supprimer</button>
                        <button id="no" onClick={() => setModalDeleteFriend()}>Non, annuler</button>
                    </div>

                </div>
            </div>

        </div>
    )
}