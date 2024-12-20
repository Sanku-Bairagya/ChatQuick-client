import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import UserItem from "../shared/UserItem.jsx"
import {useAsyncMutation, userErrors} from "../../hooks/hook.jsx"
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api.js'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducer/misc.js'
const AddmemberDialog = ({chatId}) => {
  
    const dispatch = useDispatch()
 
    const [selectedMembers,setSelectedMembers] = useState([]);
    const {isLoading,data,isError,error} = useAvailableFriendsQuery(chatId)
    
    const {isAddMember} = useSelector((state) => state.misc)
    const selectMemberHandler = (id) =>{
        setSelectedMembers((prev) => prev.includes(id)? 
        prev.filter((currentElem) => currentElem !== id ) 
        : [...prev,id])
      }
    
    const [addMembers,isLoadingAddMembers] = useAsyncMutation(
        useAddGroupMembersMutation
    )

    userErrors([{isError,error}]);

    const addMemberSubmitHandler = () => {
        addMembers("Adding members...",{members:selectedMembers,chatId})
        closeHandler();
    }

    const closeHandler = () => {
        dispatch(setIsAddMember(false))
    }

    userErrors([{isError,error}]);

    console.log((data));
    

    return (
    <Dialog open={isAddMember} onClose={closeHandler} >
        <Stack p={"2rem"} width={"20rem"} spacing={"2rem"} >
            <DialogTitle textAlign={"center"} >Add Members </DialogTitle>
            <Stack pacing={"2rem"} >
                { isLoading ? 
                (<Skeleton/>)
                :
                 data?.friends?.length >0 ?  
                  (
                    data?.friends?.map((i)=>(
                        <UserItem 
                        key={i._id} 
                        user={i} 
                        handler={selectMemberHandler} 
                        isAdded={selectedMembers.includes(i._id)}
                        />
                    ))
                 ):
                    (<Typography textAlign={"center"} >No Friends</Typography>)
                }
            </Stack>
            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >

                <Button 
                color='error'
                onClick={closeHandler}
                >
                    Cancel
                </Button>
                <Button 
                variant='contained' 
                disabled={isLoadingAddMembers}
                onClick={addMemberSubmitHandler}
                
                
                >Submit CHnages</Button>
            </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddmemberDialog
