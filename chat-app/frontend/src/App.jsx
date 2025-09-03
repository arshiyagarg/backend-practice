import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuth.store.js';
import { Loader } from 'lucide-react';
import Navbar from './components/Navbar';

const App = () => {
const {authUser , checkAuth , isCheckingAuth } = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  console.log(authUser);

  if(isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
          <Loader className='size-10 animate-spin' />
      </div>
    )
  }
  

  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

      </Routes>
      <Toaster />
    </div>
  )
}

export default App


// import React, { useEffect } from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import HomePage from "./pages/HomePage"
// import SignUpPage from "./pages/SignUpPage"
// import SettingsPage  from "./pages/SettingsPage"
// import LoginPage from "./pages/LoginPage"
// import ProfilePage from "./pages/ProfilePage"
// import { Toaster } from 'react-hot-toast'
// import { useAuthStore } from './store/useAuth.store' 
// import { Loader } from 'lucide-react'


// const App = () => {
//   const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

//   useEffect(() => {
//     checkAuth();
//   },[checkAuth])

//   if(isCheckingAuth || !authUser){
//     return (
//       <div className='flex items-center justify-center h-screen '>
//         <Loader  className='size-10 animate-spin' />
//       </div>
//     )
//   }

//   // const authUser = false;
//   return (

//     <div >
//       <Routes>
//         <Route path='/' element={authUser ? <HomePage/> : < Navigate to="/login" />}  />
//         <Route path='/signup' element={!authUser ? <SignUpPage/> : < Navigate to="/" />}  />
//         <Route path='/login' element={!authUser ? <LoginPage/> : < Navigate to="/" />}  />
//         <Route path='/settings' element={<SettingsPage />}  />
//         <Route path='/profile' element={authUser ? <ProfilePage/> : < Navigate to="/login" />}  />
//       </Routes>

//       <Toaster />
//     </div>
//   )
// }

// export default App
