import React from 'react'
import { Stack, Typography } from '@mui/material'
import ChatItem from '../shared/ChatItem.jsx'

const ChatList = (
  {
    w="100%",
    chats=[],
    chatId,
    onlineUsers=[],
    newMessagesAlert=[
      {
        chatId: "675146d3ba5d7aa659787ff5",
        count: 0,
      },
   ],
   handledeleteChat,

  }) => {
    
return (
  
  <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}
   
  >
      <Typography
        variant="h6"
        sx={{ padding: "1rem", backgroundColor: "#f5f5f5", textAlign: "center" }}
      >
        Friends
      </Typography>

      {
          chats?.map((data,index)=>{
            
            const {avatar,_id,name,groupchat,members} = data;
            // console.log("chat List",data);
            
            
            const newMessageAlert = newMessagesAlert.find(
              ({chatId}) => chatId === _id
            )
          
            const isOnline = members?.some((member) => onlineUsers.includes(member));

              return <ChatItem 
              index={index}
                newMessageAlert={newMessageAlert} 
                isOnline={isOnline}
                avatar={avatar}
                name={name}
                _id={_id}
                key={_id}
                groupChat={groupchat}
                sameSender = {chatId === _id}
                handledeleteChat={handledeleteChat}
              />
          })
      }
  </Stack>
)
}

export default ChatList