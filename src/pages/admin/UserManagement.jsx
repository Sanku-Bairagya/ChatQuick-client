import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout.jsx'
import Table from '../../components/shared/Table.jsx'
import { Avatar, Skeleton } from '@mui/material';
import { dashBoardData } from '../../constants/SampleData.js';
import { transformImage } from '../../lib/features.js';
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
  renderCell:(params) => (<Avatar alt={params.row.name} src={params.row.avatar} />),

},
{
  field:"name",
  headerName:"Name",
  headerClassName:"table-header",
  width:200,
},
{
  field:"username",
  headerName:"Username",
  headerClassName:"table-header",
  width:200,
},
{
  field:"friends",
  headerName:"Friends",
  headerClassName:"table-header",
  width:150,
},
{
  field:"groups",
  headerName:"Groups",
  headerClassName:"table-header",
  width:200,
}


] ;



const UserManagement = () => {

  const [rows,setRows] = useState([]);
  const [loading,setLoading] = useState(true);
  const [userdata, setUserdata] = useState(null);
  const {isAdmin} = useSelector((state) => state.auth)

   const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/admin/users` ,{
        headers: {
          Authorization: "Bearer 40020321", 
        },
      }); 
     
      if (data.status === "success") {
        setUserdata(data);
        
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
    if(userdata){
      setRows(
      userdata.users.map((i)=>
        ({...i,id:i._id,avatar:transformImage(i.avatar,50)}
      ))
    )  
  }
  },[userdata])



  return (

    <AdminLayout>
      {
        loading ? (<Skeleton/>) : (<Table rows={rows} columns={columns} heading={"All users"} />)
      }
    </AdminLayout>

    
  )
}

export default UserManagement
