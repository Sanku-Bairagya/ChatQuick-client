import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import Applayout from '../components/layout/Applayout.jsx'
import { IconButton, Skeleton, Stack } from '@mui/material';
import {AttachFile as AttachFileIcon, Send as SendIcon} from "@mui/icons-material"
import { grayColor, orange } from '../constants/color.js';
import { InputBox } from '../components/styles/StyledComponent.jsx';
import FileMenu from '../components/dialogs/FileMenu.jsx';
import MessageComponents from '../components/shared/MessageComponents.jsx';
import { getSocket } from '../socket.jsx';
import {ALERT, CHAT_EXITED, CHAT_JOINED, NEW_MESSAGE, START_TYPING, STOP_TYPING} from "../constants/events.js"
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api.js';
import { userErrors, useSocketEvents } from '../hooks/hook.jsx';
import {useInfiniteScrollTop} from "6pp"
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducer/misc.js';
import { removeNewMessagesAlert } from '../redux/reducer/chat.js';
import { TypingLoader } from '../components/layout/Loaders.jsx';
import { Navigate, useNavigate } from 'react-router-dom';


const Chat = ({chatId,user}) => {

  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const socket = getSocket();
  const [IamTyping,setIamTyping] = useState(false);
  const [userTyping,setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const bottomRef = useRef(null);
  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);
  const [page,setPage] = useState(1);
  const navigate = useNavigate();
  const [fileMenuAnchor,setFileMenuAnchor]  = useState(null);
  
  const chatDetails =useChatDetailsQuery({chatId,skip: !chatId})

  const oldMessagesChunks = useGetMessagesQuery({chatId,page:page})
  
  const members = chatDetails?.data?.chat?.members;

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  }

  const errors = [
    {isError:chatDetails.isError,error:chatDetails.error},
    {isError:oldMessagesChunks.isError,error:oldMessagesChunks.error}
  ];

  //console.log("OldmessagesChunk",oldMessagesChunks.data);
  
  
  const submitHandler = (e) =>{
    e.preventDefault();
    if(!message.trim()) return;
    
    //emitting message to the server
    socket.emit(NEW_MESSAGE,{chatId,members,message});
    setMessage("");
  }

  useEffect(() => {
    socket.emit(CHAT_JOINED,{userId:user._id,members})
    dispatch(removeNewMessagesAlert(chatId))
    

    return () => {
      setMessages([]),
      setMessage(""),
      setOldMessages([]),
      setPage(1);
      socket.emit(CHAT_EXITED,{userId:user._id,members})
    }
  },[chatId])

  useEffect(() => {
    if(chatDetails.isError) return navigate("/")
  },[chatDetails.isError])

  useEffect(() => {
    if (bottomRef.current) 
      bottomRef.current.scrollIntoView({behavior:"smooth"});
  },[messages])

  const newmessagesHandler = useCallback((data) =>{

    if(data.chatId !== chatId) return;
    setMessages(prev => [...prev,data.message])

  },[chatId])

  const startTypingListner = useCallback((data) =>{

    if(data.chatId !== chatId) return;
    setUserTyping(true);
  },[chatId])
  const stopTypingListner = useCallback((data) =>{

    if(data.chatId !== chatId) return;    
    setUserTyping(false);

  },[chatId])

  const alertListner = useCallback(({data}) => {

    if(data.chatId !== chatId) return ;

    const messageForAlert = {
      content:data.message,
      sender:{
          _id:user._id,
          name:user.name
      },
      chat:chatId,
      createdAt:new Date().toISOString()
    }; 

    setMessages((prev) => [...prev,messageForAlert])
  },[chatId])
  
  const eventHandlers = {
    [ALERT] : alertListner,
    [NEW_MESSAGE]:newmessagesHandler,
    [START_TYPING]:startTypingListner,
    [STOP_TYPING]:stopTypingListner
  }
  useSocketEvents(socket,eventHandlers)
  userErrors(errors);

  const { data:oldMessages, setData:setOldMessages}  = 
  useInfiniteScrollTop(
    containerRef,
    oldMessagesChunks.data?.totalPages,
    page,
    setPage,
    oldMessagesChunks.data?.messages
  )


  const allMessages = [...oldMessages,...messages]

  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if(!IamTyping){
      socket.emit(START_TYPING,{members,chatId});
      setIamTyping(true);
    }

    if(typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING,{members,chatId});
      setIamTyping(false);
    },[1000])
    
  }


  return chatDetails.isLoading?<Skeleton/> : (
    <Fragment>
      <Stack
       ref={containerRef}
       boxSizing={"border-box"}
       padding={"1rem"}
       spacing={"1rem"}
       bgcolor={grayColor}
       height={"90%"}
       sx={{
        overflowX:"hidden",
        overflowY:"auto"
       }}
      >
       
       {
        allMessages.map((i) => (
          <MessageComponents key={i._id} message={i} user={user} />
        ))
       }

        {userTyping && <TypingLoader />}


        <div ref={bottomRef} />
      </Stack>

       <form
        style={{
          height:"10%",
          
        }}
        onSubmit={submitHandler}
       >
        <Stack 
          direction={"row"} 
          height={"100%"} 
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position:"absolute",
              left:"1.5rem",
              rotate:"30deg"
            }}
            onClick={handleFileOpen}
            
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder='Type a message ... ' value={message} onChange={messageOnChange} />

          <IconButton
            type='submit'
            sx={{
              bgcolor:orange,
              rotate:"-30deg",
              color:"white",
              marginLeft:"1rem",
              padding: "0.5rem",
              "&:hover":{
                bgcolor:"error.dark"
              }
            }}
          
          >
            <SendIcon/>
          </IconButton>

        </Stack>
       </form>
      <FileMenu  anchorE1={fileMenuAnchor} chatId={chatId} />

    </Fragment >
  )
}

export default Applayout()(Chat);