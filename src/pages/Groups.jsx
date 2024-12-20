import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import {KeyboardBackspace as KeyboardBackspaceIcon,Menu as MenuIcon} from "@mui/icons-material"
import {useNavigate,useSearchParams } from 'react-router-dom'
import { Link } from '../components/styles/StyledComponent.jsx'
import AvatarCard from '../components/shared/AvatarCard.jsx'
import {Stack} from "@mui/material"

import {Edit as EditIcon,Done as DoneIcon,Delete as DeleteIcon , Add as AddIcon} from "@mui/icons-material"
import UserItem from '../components/shared/UserItem.jsx'
import { bgGradient } from '../constants/color.js'
import {  useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api.js'
import { useAsyncMutation, userErrors } from '../hooks/hook.jsx'
import { Layout } from '../components/layout/Loaders.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../redux/reducer/misc.js'

const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog.jsx"))
const AddmemberDialog = lazy(() => import("../components/dialogs/AddmemberDialog.jsx"))



const Groups = () => {
  
  const dispatch = useDispatch();
  const {isAddMember} = useSelector((state) => state.misc)
  const chatId = useSearchParams()[0].get("group");



  const groupDetails = useChatDetailsQuery({ chatId, populate:true },{skip: !chatId})
  const [updateGroup,isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation)
  console.log(groupDetails.data);
  
  const [removeMember,isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation)
  
  const [deleteGroup,isLoadingDeleteMember] = useAsyncMutation(useDeleteChatMutation)

  const navigate = useNavigate();
  const myGroups = useMyGroupsQuery("");
  const [isMobilemMenuOpen,setIsMobileMenuOpen] = useState(false)
  const[isEditd,setIsEdit] = useState(false);
  
  const [groupsName,setGroupsName] = useState("");
  const [groupnameUpdatedValue,setGroupnameUpdatedValue] = useState("");
  const [confirmDeleteDialog,setCOnfirmDeleteDialog] = useState(false);
  const [members,setMembers] = useState([]);


  const errors = [
  {
    isError:myGroups.isError,
    error:myGroups.error
  },
  {
    isError:groupDetails.isError,
    error:groupDetails.error
  }
]
  userErrors(errors)

  useEffect(() => {
    if(groupDetails.data) {
      setGroupsName(groupDetails.data.chat.name);
      setGroupnameUpdatedValue(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members)
    }

    return () => {
      setGroupsName("");
      setGroupnameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    }

  },[groupDetails.data])

  
  const navigateback = () => {
    navigate("/");
  }

  // function to reverse the props
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  }

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupnameHandler = () => {
    setIsEdit(false);
    updateGroup("Updating group name ...",{
      chatId,
      name:groupnameUpdatedValue
    })
  }

  const onenAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
    console.log(("Member is added"));
    
  }

  const openconfirmDeleteHandler = () => {
    setCOnfirmDeleteDialog(true);
    console.log("Member deleted");
  }

  const closeConfirmDeteHandler = () => {
    setCOnfirmDeleteDialog(false);
  }


  const deleteHandler = () => {
    deleteGroup("Deleting group ...",chatId);
    closeConfirmDeteHandler();
    navigate("/groups")
  }

  const removeMemberHandler = (userId) => {
    removeMember("Removing member ... ",{chatId,userId})
  }
  



  useEffect(()=>{
    if(chatId){

      setGroupsName(`Group name ${chatId}`);
      setGroupnameUpdatedValue(`Group name ${chatId}`);
    }

    return () => {
      setGroupsName("");
      setGroupnameUpdatedValue("");
    }

  },[chatId])


  const IconBtns = <>

  <Box
   sx={{
    xs:"block",
    sm:"none",
    position:"fixed",
    right:"1rem",
    top:"1rem"
  }}

  >
 <Tooltip title="menu">
    <IconButton onClick={handleMobile} >
     <MenuIcon />
    </IconButton>
 </Tooltip>
  
  </Box>




    <Tooltip title="back" >
      <IconButton
       sx={{
        position:"absolute",
        top:"2rem",
        left:"2rem",
        bgcolor:"#1c1c1c",
        color:"white",
        "&:hover":{
          bgcolor:"black"
        }
      
      }}
      onClick={navigateback}
      >
        <KeyboardBackspaceIcon/>
      </IconButton>
         
    </Tooltip>
  </>

   const groupName = (<Stack 
   direction={"row"} 
   alignItems={"center"} 
   justifyContent={"center"}
   spacing={"1rem"}
   padding={"3rem"}
   
  >
      
      {
        isEditd ? (
          <>
            <TextField value={groupnameUpdatedValue}
              onChange={(e) => setGroupnameUpdatedValue(e.target.value)}
            />
            <IconButton onClick={updateGroupnameHandler} disabled={isLoadingGroupName} >
              <DoneIcon/>
            </IconButton>
          
          </>
        ):
        (
          <>
            <Typography variant='h4'>{groupsName}</Typography>
            <IconButton 
              onClick={() => setIsEdit(true)} 
              disabled={isLoadingGroupName}
            ><EditIcon/>
            </IconButton>
          </>
        )
      }

   </Stack>

   );


   const buttonGroup = <Stack
    direction={{
      sm:"row",
      xs:"column-reverse"
    }}
    spacing={"1rem"}
    p={{
      xs:"0",
      sm:"1rem",  
      md:"1rem 4rem"
    }}
   
   >
      <Button size='large' color='error' variant='outlined' startIcon={<DeleteIcon/>} 
      onClick={openconfirmDeleteHandler}
      >Delete Group</Button>
      <Button size='large'variant='contained' startIcon={<AddIcon/>} 
       onClick={onenAddMemberHandler}
      >Add member</Button>
   </Stack>



  return myGroups.isLoading ? <Layout/> :(
    <Grid container height={"100vh"} >
      <Grid
        item
        sx={{
          display:{
            xs:"none",
            sm:"block",
          },
          backgroundImage:bgGradient
        }}
        sm={4}
        
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatID={chatId}  />
      </Grid>

      <Grid item xs={12} sm={8} sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        position:"relative",
        padding:"1rem 3rem"
      }} 
      
      >
       { IconBtns }
       {
          groupsName &&  <>
          {groupName}
          <Typography
            margin={"2rem"}
            alignSelf={"flex-start"}
            variant='body1'
          >
            members
          </Typography>
          <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm:"1rem",
                xs:"0",
                md:"1rem 4rem"
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              
              { isLoadingRemoveMember ? (<CircularProgress/>)
              :
                (groupDetails?.data?.chat?.members?.map((i) => (
                  <UserItem user={i} key={i._id} isAdded styling={{
                    boxShadow:"0 0  0.5rem rgba(0,0,0,0.2)",
                    padding:"1rem 2rem",
                    borderRadius:"1rem",
                  }} 
                  handler={removeMemberHandler}
                  />
                ))
              )
              }
          </Stack>
          {
            buttonGroup
          }
          


          </>
       }
       
      </Grid>
      {
        isAddMember && 
        <Suspense fallback={<Backdrop open/>}>
            <AddmemberDialog chatId={chatId} />
        </Suspense>
      }

      {
        confirmDeleteDialog && <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog 
            open={confirmDeleteDialog} 
            handleclose={closeConfirmDeteHandler} 
            deleteHandler={deleteHandler} 
          />
        </Suspense> 


      }

      <Drawer sx={{
        display:{
          xs:"blocdk",
          sm:"none"
        },
       
      }} 
      open={isMobilemMenuOpen} 
      onClose={handleMobileClose} 
      >
        <GroupsList width={"50vw"} myGroups={myGroups?.data?.groups} chatID={chatId}  />
      </Drawer>

    </Grid>
  )
};

const GroupsList = ({w="100%",myGroups=[],chatID}) => (
  <Stack width={w} 
  sx={{
    backgroundImage:bgGradient,
    height:"100vh",
    overflow:"auto"
  }} >
    {
      myGroups.length > 0 ? (
        myGroups.map((group) => <GroupListItem group={group} chatID={chatID} key={group._id} />)
      ):(
        <Typography textAlign={"center"} padding="1rem" >
            No Groups
        </Typography>
      )

    }
  </Stack>
)
 
const GroupListItem = memo(({group,chatId}) => {
  const {name,avatar,_id} = group;

  return (
    <Link 
    to={`?group=${_id}`} 
    onClick={(e) => {
      if(chatId === _id) e.preventDefault();
    }}
    >
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} >
      <AvatarCard avatar={avatar} />
      <Typography>{name}</Typography>
    </Stack>
    </Link>
  )


});


export default Groups