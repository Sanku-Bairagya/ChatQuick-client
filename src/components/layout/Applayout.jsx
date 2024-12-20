import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header.jsx'
import Title from '../shared/Title.jsx'
import {Drawer, Grid, Skeleton} from "@mui/material"
import ChatList from "../specific/ChatList.jsx"
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../specific/Profile.jsx'
import { useMyChatsQuery } from '../../redux/api/api.js'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDeleteMenu, setIsMobileMenu, setSelectDeleteChat } from '../../redux/reducer/misc.js'
import { userErrors, useSocketEvents } from '../../hooks/hook.jsx'
import { getSocket } from '../../socket.jsx'
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/events.js'
import { incrementNotification, setNewMessageAlert } from '../../redux/reducer/chat.js'
import { getOrSaveFromStroge } from '../../lib/features.js'
import DeleteChatMenu from '../dialogs/DeleteChatMenu.jsx'



const Applayout = () => (WrappedComponent) => {
  return (props) => {

    const params = useParams();
    const chatID = params.chatId;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deleteMenuAnchor = useRef(null);
  
    const socket = getSocket();

    const {isMobileMenu} = useSelector((state) => state.misc);
    const {user} = useSelector((state) => state.auth)
    const {newMessagesAlert} = useSelector((state) => state.chat);
    const [onlineUsers,setOnlineUsers] = useState([]);

    
    const {isLoading,data,isError,error,refetch} = useMyChatsQuery("");
    
    userErrors([{isError,error}])

    useEffect(() => {
      getOrSaveFromStroge({key:NEW_MESSAGE_ALERT,value: newMessagesAlert})
    },[newMessagesAlert])


    
    const handledeleteChat = (e,chatId,groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectDeleteChat({chatId,groupChat}))
      deleteMenuAnchor.current = e.currentTarget;
    }

    const handleMobileClose = () => dispatch(setIsMobileMenu(false))
    
    const newmessagesAlertListner = useCallback((data) => {
      if(data.chatId === chatID) return ;
      dispatch(setNewMessageAlert(data))

    },[chatID])

    const newRequestListner  = useCallback(() => {
      dispatch(incrementNotification());
    },[dispatch])

    const refetchListner  = useCallback(() => {
      refetch();
      navigate("/")
    },[refetch,navigate])

    const onlineUsersListner  = useCallback((data) => {
      setOnlineUsers(data)
      
    },[])


    const eventHandlers = {
      [NEW_MESSAGE_ALERT]:newmessagesAlertListner,
      [NEW_REQUEST] : newRequestListner,
      [REFETCH_CHATS] : refetchListner,
      [ONLINE_USERS]:onlineUsersListner
    }
    useSocketEvents(socket,eventHandlers)

    return (
        <>
          <Title />
            <Header/>
    
             <DeleteChatMenu 
             dispatch={dispatch} 
             deletemenuAnchor={deleteMenuAnchor}  
             />

             {
              isLoading ? <Skeleton/> :(
                <Drawer open={isMobileMenu} onClose={handleMobileClose}>
                  <ChatList 
                    w="70vw"
                    chats={data?.chats} 
                    chatId={chatID} 
                    handledeleteChat={handledeleteChat}
                    newMessagesAlert={newMessagesAlert}
                    onlineUsers={onlineUsers}
                  />
                </Drawer>
              )
             }
             <Grid container height={"calc(100vh - 4rem)"} >
                <Grid 
                 item 
                 sm={4} 
                 md={3} 
                 sx={{
                  display:{xs:"none",sm:"block"}
                 }}
                 height={"100%"}  
                >
                  {
                    isLoading?(<Skeleton />) :
                    (
                    <ChatList 
                    chats={data?.chats} 
                    chatId={chatID} 
                    handledeleteChat={handledeleteChat}
                    newMessagesAlert={newMessagesAlert}
                    onlineUsers={onlineUsers}
                    />
                    )
                  }
                </Grid>

                <Grid item xs={12} sm={8} md={5} lg={6}  height={"100%"}  >
                  <WrappedComponent {...props} chatId ={chatID} user={user}  />
                </Grid>

                <Grid 
                 item 
                 md={4} 
                 lg={3} 
                 height={"100%"}
                 sx={{
                  display:{xs:"none",md:"block"},
                  padding:"2rem",
                  bgcolor:"rgb(0,0,0,0.85)"
                 }}
                 
                >
                  <Profile user={user} />
                </Grid>
             </Grid>
     
        </>
    )
  }
}

export default Applayout