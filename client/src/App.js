import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/home/Home";
import Navbars from "./components/Navbars.jsx";
import { LoginScreen } from "./components/auth/LoginScreen";
import { RegisterScreen } from "./components/auth/RegisterScreen";
import { AcountInfoScreen } from "./components/account/AcountInfoScreen";
import Deposite from "./components/deposite/Deposite";
import Withdraw from "./components/withdraw/Withdraw";
import ProfileUpdate from "./components/update/ProfileUpdate";
import ChanagePassword from "./components/changepassword/ChanagePassword";
import AdminLogin from "./components/admin/AdminLogin";
import Admin from "./components/admin/Admin";
import AdminRegister from "./components/admin/AdminRegister";

function App() {
  const [logIn, setLogIn] = useState(false);
 // const reloadpage=window.location.reload();
  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      setLogIn(true);
    }
  }, []);
  return (
    <div>
      {logIn ? <Navbars /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<LoginScreen />} />
        <Route path="/user/register" element={<RegisterScreen />} />
        <Route path="/user/account" element={<AcountInfoScreen />} />
        <Route path="/user/deposite" element={<Deposite />} />
        <Route path="/user/withdraw" element={<Withdraw />} />
        <Route path="/user/profileupdate" element={<ProfileUpdate />} />
        <Route path="/user/changepassword" element={<ChanagePassword />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/users" element={<Admin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
      </Routes>
    </div>
  );
}

export default App;
