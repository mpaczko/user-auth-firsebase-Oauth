import React,{useState,useEffect} from 'react';
import "../styles/Sidebar.css";
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from "../firebase";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ForumIcon from '@material-ui/icons/Forum';
import PeopleIcon from '@material-ui/icons/People';
import { useNavigate } from 'react-router-dom';
import { Avatar,IconButton} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutInitiate } from '../redux/actions';

const Users = ({children}) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('users').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        })

        return () => {
            unsubscribe();
        }

    }, []);


    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
  
    const handleAuth = () => {
      if(currentUser){
        dispatch(logoutInitiate());
      }
    }


  return (
      <>
                Welcome {currentUser?.displayName}
                <button onClick={handleAuth}>Logout</button>
                <div className="app__body">
                    <div className='sidebar'>
                        <div className="sidebar__header">
                            <Avatar src={'lp'} alt={`${true} photo`}/>
                            <div className="sidebar__headerRight">
                                <IconButton onClick={()=>navigate('/')}>
                                    <PeopleIcon/>
                                </IconButton>
                                <IconButton onClick={()=>navigate('/rooms')}>
                                    <ForumIcon/>
                                </IconButton>
                                <IconButton>
                                    <MoreVertIcon/>
                                </IconButton>
                            </div>
                        </div>
                        <div className="sidebar__search">
                            <div className="sidebar__searchContainer">
                                <SearchOutlined/>
                                <input placeholder='Search user' type="text"/>
                            </div>
                        </div>
                        <div className="sidebar__chats">
                            {users.map(user => (
                                <SidebarChat 
                                    collection={'users'}
                                    key={user.id}
                                    id={user.id}
                                    photoUrl={user.data?.photoUrl}
                                    name={user.data.name}
                                />
                            ))}
                        </div>
                    </div>
                    {children}
                </div>
      </>
  )
}

export default Users
