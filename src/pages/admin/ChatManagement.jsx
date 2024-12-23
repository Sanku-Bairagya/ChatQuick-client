import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout.jsx'
import Table from '../../components/shared/Table.jsx'
import { Avatar, Skeleton, Stack } from '@mui/material';
import { dashBoardData } from '../../constants/SampleData.js';
import { transformImage } from '../../lib/features.js';
import AvatarCard from '../../components/shared/AvatarCard.jsx';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { server } from '../../constants/config.js';


const columns = [{
  field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:200,
},
{
  field:"avatar",
  headerName:"AVATAR",
  headerClassName:"table-header",
  width:200,
  renderCell:(params) => (<AvatarCard  avatar={params.row.avatar} />),

},
{
  field:"name",
  headerName:"Name",
  headerClassName:"table-header",
  width:200,
},
{
  field:"groupchat",
  headerName:"Group",
  headerClassName:"table-header",
  width:200,
},

{
  field:"totalMembers",
  headerName:"Total Members",
  headerClassName:"table-header",
  width:120,
},
{
  field:"members",
  headerName:"Members",
  headerClassName:"table-header",
  width:400,
  renderCell:(params) => (<AvatarCard max={100} avatar={params.row.members} />),
},
{
  field:"totalMessages",
  headerName:"Total Messages",
  headerClassName:"table-header",
  width:120,
},
{
  field:"creator",
  headerName:"Created By ",
  headerClassName:"table-header",
  width:250,
  renderCell:(params) => (
    <Stack direction="row" alignItems="center" spacing={"1rem"} >
      <Avatar alt={params.row.creator.cell} src={params.row.creator.avatar} />
      <span>{params.row.creator.name}</span>
      <></>
    </Stack>
  )
},

] ;



const ChatManagement = () => {

   const [rows,setRows] = useState([]);

  const [loading,setLoading] = useState(true);
  const [chatdata, setChatdata] = useState([]);
  const {isAdmin} = useSelector((state) => state.auth)

   const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/admin/chats` ,{
        headers: {
          Authorization: "Bearer 40020321", 
        },
      }); 
     
      if (data.status === "success") {
        setChatdata(data);
        
      } else {
        throw new Error("Failed to fetch dashboard stats");
      }
    } catch (err) {
      console.log("Failed to fetch",err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUserData();
  }, [isAdmin]);
  


  useEffect(()=>{
    if(chatdata){
      setRows(chatdata?.chats?.map((i)=>({
        ...i,
        id:i._id,
        avatar:i?.avatar?.map(i=>transformImage(i,50)),
        members:i?.members?.map((i)=>transformImage(i.avatar,50)),
        creator:{
          name:i.creator.name,
          avatar:transformImage(i.creator.avatar,50)
        },
      })
      )
      );
    }
  
  },[chatdata]);



  return (

    <AdminLayout>
      {
        loading ? (<Skeleton/>):
        (<Table rows={rows} columns={columns} heading={"All chats"} />)
      }
    </AdminLayout>

    
  )
}


export default ChatManagement