import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import './SidebarChats.css';
import db from './Firebase';
import { Link } from 'react-router-dom';

function SidebarChats({ id, name, addNewChat }) {

    const [seed, setSeed] = useState ('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));

    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat room");

        if (roomName) {
            //do some clever database stuff...
            db.collection('rooms').add({
                name: roomName,
            });
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="SidebarChats">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="SidebarChats_info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        
    ) : (
       <div onClick={createChat} className="SidebarChats">
           <h2>Add New Chat</h2>
       </div> 
    );
}

export default SidebarChats
