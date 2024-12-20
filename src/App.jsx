import React,{lazy, Suspense, useEffect} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute.jsx';
import { Layout } from './components/layout/Loaders.jsx';
import axios from "axios"
import { server } from "./constants/config";
import { userExists, userNotExists } from "./redux/reducer/auth.js";
import {useDispatch,useSelector} from "react-redux"
import {Toaster} from "react-hot-toast"
import { SocketProvider } from './socket.jsx';
const Home = lazy(()=> import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Groups = lazy(()=> import("./pages/Groups.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"))
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"))
const DashBoard = lazy(()=>import("./pages/admin/DashBoard.jsx"))
const UserManagement = lazy(() => import("./pages/admin/UserManagement.jsx"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement.jsx"));


const App = () => {

  const {user,loader} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({data}) => dispatch(userExists(data.user)))
      .catch((err)=>dispatch(userNotExists()));
  },[])

  return loader ? (<Layout/>) : 
  (
  <BrowserRouter>
    <Suspense fallback={<Layout/>}>
      <Routes>

        <Route element={<SocketProvider><ProtectRoute user={user}/></SocketProvider> } >
          <Route path='/' element={<Home/>}/>
          <Route path='/groups' element={<Groups/>}/>      
          <Route path='/chat/:chatId' element={<Chat/>} />
        </Route>

        <Route path='/login' element={<ProtectRoute user={!user} redirect='/' >
            <Login/>
        </ProtectRoute>} />

        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/admin/dashboard" element={<DashBoard/>} />
        <Route path="/admin/users" element={<UserManagement/>} />
        <Route path="/admin/chats" element={<ChatManagement/>} />


        <Route path='*' element={<NotFound/>} />

      </Routes>
    </Suspense>
    <Toaster position='top-center'/>
  </BrowserRouter>
  )
}

export default App