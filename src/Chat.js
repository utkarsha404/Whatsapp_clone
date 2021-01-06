import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert } from '@material-ui/icons';
import SearchOutLined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from './Firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat() {

    const [input, setInput] = useState ("");
    const [seed, setSeed] = useState ("");
    const { roomId } = useParams();
    const [ roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ));
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));

    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>> ", input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    };

    return (
        <div className="Chat">
            <div className="Chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />
                <div className="Chat_headerinfo">
                    <h3>{roomName}</h3>
                    <p>
                        Last seen{''}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="Chat_headerright">
                    <IconButton>
                        <SearchOutLined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="Chat_body">
                {messages.map(message => (
                    <p className={`Chat_message ${message.name === user.displayName && 'Chat_receiver'}`}>
                        <span className="Chat_name"> {message.name} </span>
                            {message.message}
                        <span className="Chat_timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p> 
                ))}
                
            </div>
            <div className="Chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
