import axios from "axios";
import GoDownBtn from "./GoDownBtn";
import "./Header.css";
import { userActions } from "../Store/Store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
axios.defaults.withCredentials = true;

const Header = () => {
  const [loading,setLoading] = useState("");
  const dispatch = useDispatch()
  const handleLogout = async ()=>{
    setLoading(true)
    try{
    const response = await axios.get("api/user/userlogout",{withCredentials:true});
    setLoading(false)
    console.log(response.data);
    dispatch(userActions.userLogout())
    
    }
    catch(err){
      setLoading(false)
      console.log(err)
      dispatch(userActions.userLogout());
    }
  }
  return (
    <header className="header">
      <h1>Please upload a file!
      </h1>
      <button className="logout-btn" onClick={handleLogout} disabled={loading}>{loading?"loading...":(<><FaSignOutAlt className="signout-logo"/></>)}</button>
      <GoDownBtn/>
    </header>
  );
};

export default Header;
