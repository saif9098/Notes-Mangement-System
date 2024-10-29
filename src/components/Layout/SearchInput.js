import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { useAuth } from "../../context/auth";
const SearchInput = () => {
  const [values, setValues] = useSearch({
    keyword: "",
    results: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth]=useAuth();
  // redux state
  const { loading } = useSelector((state) => state.alerts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.get(
        `https://i-note-backend.onrender.com/api/v1/job/search/${values.keyword}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        dispatch(hideLoading());
        setValues({ ...values, results: data });
        navigate(`/dashboard/search/${values.keyword}`)
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div className="">
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-sm"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-sm btn-outline-success ms-2" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;