import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore.js';
import { Loader } from 'lucide-react';
import Navbar from './components/Navbar';
import AllPosts from './pages/AllPosts';
import PostPage from './pages/PostPage';

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
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <AllPosts /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/post/:postId" element={authUser ? <PostPage /> : <Navigate to="/signup" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;