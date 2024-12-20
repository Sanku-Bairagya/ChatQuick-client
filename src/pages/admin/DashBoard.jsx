import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout.jsx'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon,Group as GroupIcon,Message as MessageIcon,Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material'
import moment from "moment"
import { CurveButton, SearchField } from '../../components/styles/StyledComponent.jsx'
import { matBlack } from '../../constants/color.js'
import { DoughnutChart, LineChart } from '../../components/specific/Charts.jsx'
import { useFetchData } from '6pp'
import { server } from '../../constants/config.js'
import {Layout} from "../../components/layout/Loaders.jsx"
import axios from 'axios'
import { useSelector } from 'react-redux'


const DashBoard = () => {

  const {isAdmin} = useSelector((state) => state.auth)
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchDashboardStats = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/admin/stats` ,{
        headers: {
          Authorization: "Bearer 40020321", 
        },
      }); 
     
      if (data.status === "success") {
        setStats(data.stats); // Access 'stats' object
        const {stats} = data || { };
      } else {
        throw new Error("Failed to fetch dashboard stats");
      }
    } catch (err) {
      console.log("Failed to fetch",err);
      
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDashboardStats();
  }, [isAdmin]);
  
  

  const Appbar = 
  ( <Paper  
    elevation={3}
    sx={{
      padding:"2rem",margin:"2rem 0", borderRadius:"1rem"
    }}
  >
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} >
      <AdminPanelSettingsIcon sx={{fontSize:"3rem"}} />
      
      <SearchField placeholder='Search ... ' />

      <CurveButton>Search</CurveButton>
      <Box flexGrow={1} />
      <Typography
        display={{
          xs:"none",
          lg:"block",
        }}
        color={"rgba(0,0,0,0.7)"}
        textAlign={"center"}
      >
        {moment().format("dddd, D MMMM YYYY")}
      </Typography>
      <NotificationsIcon/>
    </Stack>
  </Paper>
  );

  const Widgets = <Stack
   direction={{
    xs:"column",
    sm:"row"
   }}
   spacing={"2rem"}
   justifyContent="space-between"
   alignItems="center"
   margin={"2rem 0"}
  >
     <Widget title={"Users"} value={stats?.usersCount || 0} Icon={<PersonIcon/>}  />
     <Widget title={"Chats"} value={stats?.totalChatsCount || 0} Icon={<GroupIcon />} />
     <Widget title={"Messages"} value={stats?.messagesCount || 0} Icon={< MessageIcon />}  />
  </Stack>

  
   
   

  return loading ? ( <Layout/> ) :(
    <AdminLayout>
        <Container component={"main"}  >
          {Appbar}

          <Stack
            direction={{
              xs:"column",
              lg:"row"
            }}
            
            flexWrap = {"wrap"}
            justifyContent={"center"}
            alignItems={{
              xs:"center",
              lg:"stretch",
            }}
            sx={{
              gap:"2rem"
            }}
          >
           <Paper
            elevation={3}
            sx={{
              padding:"2rem 3.5rem",
              borderRadius:"1rem",
              width:"100%",
              maxWidth:"40rem",
              
            }}
           >
            <Typography margin={"2rem 0"} variant='h4' >Last Messages</Typography>
            
            <LineChart value={stats?.messageChart || []} />
           </Paper>

           <Paper
            elevation={3}
            sx={{
              padding:"1rem",
              borderRadius:"1rem" ,
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              width:{ xs:"100%",sm:"50%" },
              position:"relative",
              width:"100%",
              maxWidth:"25rem"  ,
               
            }} 
           >
              <DoughnutChart labels={["Single Chats","Group Chats"]} 
              
              
              value={[stats?.totalChatsCount - stats?.groupsCount || 0
                ,
                stats?.groupsCount || 0]}  />
              <Stack
                position={"absolute"}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"0.5rem"}
                width={"100%"}
                height={"100%"}   
              >
                <GroupIcon/> 
                <Typography>vs</Typography>
                <PersonIcon/>
              </Stack>
           </Paper>
          </Stack>





          {Widgets}

        </Container>
    </AdminLayout>
  )
}

const Widget = ({title,value,Icon}) => <Paper
elevation={3}
  sx={{
    padding:"2rem",
    margin:"2rem 1rem",
    borderRadius:"1.5rem",
    width:"20rem",
    spacing:"1.2rem"
  }}

>

  <Stack
  alignItems={"center"}
  spacing={"1rem"}
  >
    <Typography
      sx={{
        color:"rgba(0,0,0,0.7)",
        borderRadius:"50%",
        border:`5px solid ${matBlack}`,
        width:"5rem",
        height:"5rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}
    >{value}</Typography>
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} >
      {Icon}
      <Typography>{title}</Typography>
    </Stack>
  </Stack>

</Paper>


export default DashBoard