import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import {Loader} from "lucide-react";

const App = () => {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();


  useEffect(()=>{
      checkAuth()
  },[checkAuth])


  console.log({authUser});

  if(isCheckingAuth&&!authUser)
  {
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-20 animate-spin" ></Loader>
      </div>
    )
  }


  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={authUser?  <HomePage />:<Navigate to={"/login"}/>}></Route>
        <Route path="/signup" element={!authUser? <SignUpPage />:<Navigate to={"/"}/>}></Route>
        <Route path="/login" element={!authUser? <LoginPage />:<Navigate to={"/"}/>}></Route>
        <Route path="/settings" element={<SettingPage />}></Route>
        <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to={"/login"}/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
