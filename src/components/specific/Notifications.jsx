import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'

import { SampleNotification } from "../../constants/SampleData.js"
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api.js'
import { userErrors } from '../../hooks/hook.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNotification } from '../../redux/reducer/misc.js'
import toast from 'react-hot-toast'

const Notifications = () => {

  const {isNotification} = useSelector(state => state.misc);

  const dispatch = useDispatch();

  const {isLoading,data,error,isError} = useGetNotificationsQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation()

  const friedRequestHandler  = async ({_id,accept}) => {
    dispatch(setIsNotification(false))
    try {
      const res = await acceptRequest({requestId:_id,accept});
      console.log(res.data);
      

      if(res.data?.success){
        console.log("Use socket here");
        toast.success(res.data.message)
        
      }else{
        toast.error(res.data?.error || "Something went wrong in socket")
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error);
      
    }
  }

  userErrors([{error,isError}]);

  const closeHandler = () => dispatch(setIsNotification(false))
  


  return (
    <Dialog open={isNotification} onClose={closeHandler} >
      <Stack p={{xs:"1rem" , sm:"2rem"}} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {
          isLoading?
           (<Skeleton/>) 
           :
           (
            <>
            {
              data?.allRequests.length > 0 ? 
              (
                data?.allRequests.map(({sender,_id}) => (<NoificationItem 
                  sender={sender} 
                  _id={_id}
                  handler={friedRequestHandler}
                  key={_id}              
                />) )
              ):
              (
                <Typography textAlign={"center"}>
                  0 Notification
                </Typography>
              )
            }
            </>
           )
        }
      </Stack>
    </Dialog>
  )
}

const NoificationItem = memo(({sender,_id,handler}) => {

  const {avatar, name} = sender;


  return (
    <ListItem>
        <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={"1rem"}
            width={"100%"}
        
        >
            <Avatar src={avatar} />
            <Typography
                variant='body1'
                sx={{
                    flexGrow:1,
                    display:"-webkit-box",
                    WebkitLineClamp:1,
                    WebkitBoxOrient:"vertical",
                    overflow:"hidden",
                    textOverflow:"ellipsis",
                    width:"100%",
                }}
            >
                {`${name}`}
            </Typography>
          <Stack direction={{
            xs:"column",
            sm:"row"
          }} >
            <Button onClick={() => handler({_id,accept:true})} >Accept</Button>
            <Button color="error" onClick={() => handler({_id,accept:false})} >Reject</Button>
          </Stack>
        </Stack>
    </ListItem>
  )
})

export default Notifications