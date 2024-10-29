import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputFrom from "../components/shared/InputFrom";
import Layout from '../components/Layout/Layout'
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";

const UpdateProfile = () => {

  const [nName, setName] = useState("");
  const [nLastName, setLastName] = useState("");
  const [nEmail, setEmail] = useState("");
  const [nPassword, setPassword] = useState("");
const [auth,setAuth]=useAuth();
const navigate =useNavigate();
useEffect(() => {
  setName(auth?.user.name)
  setLastName(auth?.user.lastName)
  setEmail(auth?.user.email)
}, [])
 
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const { data } = await axios.put("https://i-note-backend.onrender.com/api/v1/user/update-user", {
        nName,
        nLastName,
        nEmail,
        nPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`, // Attach token to the request
        }
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <div>
    <Layout >
    <div className="form-container">
    <form className="" onSubmit={handleSubmit}>
    <h4 className="title">PROFILE UPDATION FORM</h4>
    <div className="mb-3">
      <input
        type="text"
        value={nName}
        onChange={(e) => setName(e.target.value)}
        className="form-control exampleInputEmail1"
        placeholder="Enter Your Name"
        required
        autoFocus
      />
    </div>
    <div className="mb-3">
      <input
        type="text"
        value={nLastName}
        onChange={(e) => setLastName(e.target.value)}
        className="form-control exampleInputEmail1"
        
        placeholder="Enter Your Surname"
        required
        autoFocus
      />
    </div>
    <div className="mb-3">
      <input
        type="email"
        value={nEmail}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control exampleInputEmail1"
        placeholder="Enter Your Email "
        required
      />
    </div>
    <div className="mb-3">
      <input
        type="password"
        value={nPassword}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"
        id="exampleInputPassword1"
        placeholder="Enter Your Password"
        required
      />
    </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </div>
    </form>
  </div>
  </Layout>
    </div>
  )
}

export default UpdateProfile
