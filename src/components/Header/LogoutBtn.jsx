import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const logoutHandler = () => {
    authservice.logout()
    .then(() => {
      dispatch(logout());
    })
    .then(() => {
      navigate("/login");
    })
    .catch(error => {
      console.error("Logout failed: ", error);
      // Handle error here if needed
    }); 
  };

  return (
    <button className="inline-block px-6 py-2 duration-200 flex items-center text-red-800 font-semibold hover:bg-blue-100 rounded-full" onClick={logoutHandler}> <RiLogoutCircleLine /> Logout</button>
  )
};

export default LogoutBtn;
