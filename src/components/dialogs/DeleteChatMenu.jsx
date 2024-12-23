import { Menu, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducer/misc'
import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAsyncMutation } from '../../hooks/hook'
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api'

const DeleteChatMenu = ({dispatch,deletemenuAnchor}) => {

  const {isDeleteMenu,selectDeleteChat} = useSelector((state) => state.misc)
  const navigate = useNavigate();
  const isGroup = selectDeleteChat.groupChat;
  const [deleteChat,_,deleteChatData] = useAsyncMutation(useDeleteChatMutation);
  const [leaveGrup,__,leaveGrupData] = useAsyncMutation(useLeaveGroupMutation);
  
  
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deletemenuAnchor.current = null;
  }

  const leaveGroupHandler = () => {
    closeHandler();
    leaveGrup("Leaving group ...",selectDeleteChat.chatId)
  }
  const deleteChatHandler = () => {
    closeHandler();
    deleteChat("Deleting chat ...",selectDeleteChat.chatId)
  }

  useEffect(() => {
    if(deleteChatData || leaveGrupData){
      navigate("/")
    }
  },[deleteChatData,leaveGrupData])

  return (
    <Menu 
      open={isDeleteMenu}
      onClose={closeHandler} 
      anchorEl={deletemenuAnchor.current}
      anchorOrigin={{
        vertical:"bottom",
        horizontal:"right"
      }}
      transformOrigin={{
         vertical:"center",
        horizontal:"center"
      }}
    >
        <Stack
           sx={{
            width:"10rem",
            padding:"0.5rem",
            cursor:"pointer"
           }}
           direction={"row"}
           alignItems={"center"}
           spacing={"0.5rem"}
           onClick={isGroup ? leaveGroupHandler : deleteChatHandler }
        >
            {
              isGroup ? 
              <><ExitToAppIcon/> <>Leave Group</></> 
              : 
              <><DeleteIcon/> <>Delete chat</></>
            }
        </Stack>
    </Menu>
  )
}

export default DeleteChatMenu