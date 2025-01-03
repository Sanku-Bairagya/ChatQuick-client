import React, { memo } from 'react'
import {Link} from "../styles/StyledComponent.jsx"
import { Box, Stack, Typography } from '@mui/material'
import {motion} from "framer-motion"
import AvatarCard from "../shared/AvatarCard.jsx"

const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handledeleteChat,
}) => {

    
    

  return <Link sx={{
    padding:"0",
    display: "block"
  }} to={`/chat/${_id}`} onContextMenu={(e)=>handledeleteChat(e,_id,groupChat)} >
    <motion.div 
    initial={{opacity:0,y:"-100%"}}
    whileInView={{opacity:1,y:0}}
    transition={{delay:index*0.2}}
    style={{
        display:"flex",
        gap:"1rem",
        alignItems:"ceneter",
        padding:"1rem",
        backgroundColor:sameSender ? "black" : "unset",
        color:sameSender? "white" : "unset",
        width: "100%", 
        boxSizing: "border-box", 
        position:"relative",
    }}
    >

        <AvatarCard avatar={avatar} />


        <Stack>
            <Typography>{name}</Typography>
            {
                newMessageAlert && (
                    <Typography>{newMessageAlert.count} new messages</Typography>
                )
            }
        </Stack>
        {
            isOnline && <Box
            sx={{
                width:"10px",
                height:"10px",
                borderRadius:"50%",
                backgroundColor:"green",
                position:"absolute",
                top:"50%",
                right:"1rem",
                transform:"translateY(-50%)",
            }}
            />
        }
    </motion.div>
  </Link>
}

export default memo(ChatItem);