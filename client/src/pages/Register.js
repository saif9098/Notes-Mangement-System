import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputFrom from "../components/shared/InputFrom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import {setUser} from "../redux/features/auth/authSlice"
import '../styles/AuthStyle.css'
const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //redux state
  const { loading } = useSelector((state) => state.alerts);

  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastName || !email || !password) {
        return toast.error("Please Provide All Fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post("https://i-note-backend.onrender.com/api/v1/auth/register", {
        name,
        lastName,
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        toast.success("Register Successfully");
        dispatch(setUser({data}))
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container" >
          <form  onSubmit={handleSubmit}>

          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
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
              value={lastName}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

              <p>
                Already Register <Link to="/login">Login</Link>{" "}
              </p>
              <button type="submit" className="btn">
                Register
              </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
