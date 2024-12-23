import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation } from "../../hooks/hook.jsx";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api.js';
import { setIsSearch } from "../../redux/reducer/misc.js";
import UserItem from '../shared/UserItem.jsx';


const Search = () => {
  const {isSearch} = useSelector(state => state.misc)
  const [searchUser] = useLazySearchUserQuery()
  const [sendFriendRequest,isLoadingSendFrinedRequest] = useAsyncMutation(useSendFriendRequestMutation)
  const search = useInputValidation("");
  const dispatch = useDispatch();
  const [users,setUsers] = useState([]);

  

  const addFriendHandler = async(id) => {
    console.log(id);
    await sendFriendRequest("Sending friend request ... ",{userId:id})
    
  }

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(()=>{
    
    // debouncing in search query
    const timeOut = setTimeout(()=>{
       searchUser(search.value)
        .then(({data})=>setUsers(data.users))
        .catch((e) => console.log(e))
    },700);

    return () => {
      clearTimeout(timeOut)
    }
    
  },[search.value])

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"} >
        <DialogTitle textAlign={"center"} >Find People</DialogTitle>
        <TextField 
          label="" 
          value={search.value} 
          onChange={search.changeHandler} 
          variant="outlined"
          size='small'
          InputProps={{
            startAdornment:(
              <InputAdornment position='start' >
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      <List>
          {
            users.map((i) => (
              <UserItem 
                user={i} 
                key={i._id} 
                handler={addFriendHandler} 
                handlerIsLoading={isLoadingSendFrinedRequest}
              />
            ))
          }
      </List>


      </Stack>
    </Dialog>
  )
}

export default Search