import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutLined from '@material-ui/icons/SearchOutlined';
import SidebarChats from './SidebarChats';
import './Sidebar.css';
import db from './Firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => 
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return () => {
            unsubscribe();
        }

    }, []);

    return(
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} /> 
                <div className="sidebar_headerright">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="search_container">
                    <SearchOutLined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChats addNewChat/>
                {rooms.map(room => (
                    <SidebarChats key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>

        </div>
    );
}

export default Sidebar