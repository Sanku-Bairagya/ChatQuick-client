
import { useInputValidation } from "6pp"
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SampleUsers } from "../../constants/SampleData"
import { useDispatch, useSelector } from 'react-redux';
import UserItem from "../shared/UserItem.jsx"
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api.js";
import { setIsNewGroup } from "../../redux/reducer/misc.js";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook.jsx";
const NewGroup = () => {

  const groupName = useInputValidation("")
  const {isNewGroup} = useSelector((state) => state.misc)
  const dispatch = useDispatch();
  const {isError,isLoading,error,data} = useAvailableFriendsQuery();
  const [NewGroup,isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)
  const [members,setMembers]  = useState(SampleUsers);
  const [selectedMembers,setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error
    }
  ]  

  const selectMemberHandler = (id) =>{
    setSelectedMembers((prev) => prev.includes(id)? 
    prev.filter((currentElem) => currentElem !== id ) 
    : [...prev,id])
  }
  

  const submitHandler = () => {
    if(!groupName.value) return toast.error("Group name is required");

    if(selectedMembers.length < 2) return toast.error("Minimum 2 members is required")
    console.log(groupName.value,selectedMembers);
    NewGroup(`Creating ${groupName.value}`,{name:groupName.value , members:selectedMembers})
    closeHandler()
    
  }

  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  }
 

  return (
    <Dialog open={isNewGroup} onClose={closeHandler} >
      <Stack p={{xs:"1rem" , sm:"2rem"}} width={"25rem"} spacing={"2rem"} >
        <DialogTitle textAlign={"center"} variant='h4' >New Group</DialogTitle>
        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />
        <Typography variant='body1'>Members</Typography>
        <Stack >
        {
          isLoading ? (<Skeleton/>) :
          (data?.friends?.map((i) => (
              <UserItem 
                user={i} 
                key={i._id} 
                handler={selectMemberHandler} 
                isAdded={selectedMembers.includes(i._id
                )}
              />
            )))
          
        }
        </Stack>
        <Stack direction={"row"} justifyContent="space-evenly" >
          <Button variant='outlined' color='error' size='large' onClick={closeHandler} >Cancel</Button>
          <Button variant='contained' size='large' onClick={submitHandler} disabled={isLoadingNewGroup} >Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup