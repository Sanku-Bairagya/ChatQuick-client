import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { grayColor, matBlack } from '../../constants/color';
import {Menu as MenuIcon,Close as CloseIcon, ExitToApp as ExitToAppIcon} from "@mui/icons-material"
import { useLocation,Link as LinkComponent, Navigate } from 'react-router-dom';
import {Dashboard as DashboardIcon,
    ManageAccounts as ManageAccountsIcon,
    Groups as GroupsIcon,
    Message as MessageIcon
} from "@mui/icons-material"
import { useDispatch, useSelector } from 'react-redux';
import {adminLogout} from "../../redux/thunks/admin"

const Link = styled(LinkComponent)`
    text-decoration:none;
    border-radius:2rem;
    padding:1rem 2rem;
    color:black;
    &:hover {
        color:rgba(0,0,0,0.54);
    }
`;

export const adminTabs = [{
    name:"Dashboard",
    path:"/admin/dashboard",
    icon:<DashboardIcon/>
},
{
    name:"User",
    path:"/admin/users",
    icon:<ManageAccountsIcon/>
},
{
    name:"chats",
    path:"/admin/chats",
    icon:<GroupsIcon/>
},

];

const Sidebar = ({w="100%"}) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const logOutHndler = () => {
        dispatch(adminLogout())
        console.log("done");
        
    }


    return <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"} >
        <Typography variant='h5' textTransform={"uppercase"} >ChatQuick</Typography>
        <Stack spacing={"1rem"} >
       {
        adminTabs.map((tab)=>(
            <Link key={tab.path} to={tab.path} 
            sx={
                location.pathname === tab.path && {
                    bgcolor:matBlack,
                    color:"white",
                    ":hover":{color:"white"}
                }
            }
            
            >
                <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} >
                    {tab.icon}
                    <Typography  >{tab.name}</Typography>
                </Stack>
            </Link>
        ))
       }
       <Link 
           onClick={logOutHndler}
            
        >
                <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} >
                    <ExitToAppIcon/>
                    <Typography  >Log out</Typography>
                </Stack>
            </Link>
        </Stack>
    </Stack>
};


const AdminLayout = ({ children }) => {

 const {isAdmin} = useSelector((state) => state.auth)
 const [isMobile,setIsMobile] = useState(false);
 const handleMobile = () => {
    setIsMobile(!isMobile);
 }

 if(!isAdmin) return <Navigate to="/admin" />


 const handleClose = () => setIsMobile(false);

  return (
    <Grid container minHeight={"100vh"} >
        <Box
         sx={{
            display:{xs:"block",md:"none"},
            position:"fixed",
            right:"1rem",
            top:"1rem"
         }}
        >
         <IconButton onClick={handleMobile} >
            {
                isMobile ? <CloseIcon/> : <MenuIcon/>
            }
         </IconButton>
         
        </Box>

        <Grid
         item
         md={4}
         lg={3}
         sx={{display:{xs:"none",md:"block"}}}
        >
          <Sidebar/>
        </Grid>
        <Grid
         item
         xs={12}
         md={8}
         lg={9}
         sx={{bgcolor:grayColor}}
        >
          {children}
        </Grid>

        <Drawer open={isMobile} onClose={handleClose}  >
            <Sidebar w="50vw"  />
        </Drawer>

    </Grid>
  )
}

export default AdminLayout