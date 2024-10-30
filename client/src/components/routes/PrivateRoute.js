import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth]= useAuth();
  const navigate =useNavigate()
 
        useEffect(() => {
    const authCheck = async () => {
      console.log(auth)
      const { data } = await axios.get(
        "https://i-note-backend.onrender.com/api/v1/user/getUser"
      );
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return( ok ? children:
    <>
    <div className="d-flex justify-content-center align-items-center" style={{height:"90vh"}}>
    <h1 className="">Sorry! Please Login!</h1>
    <button className="btn btn-outline-primary btn-sm" onClick={()=>navigate("/login")}>Go to Login Page</button>
    </div>
    </>
  );;
  }

export default PrivateRoute;
