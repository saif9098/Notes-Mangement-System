import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/InnerPage.css";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import moment from "moment";
import SearchInput from "../components/Layout/SearchInput";
import { useSearch } from "../context/search";
import { useAuth } from "../context/auth";

const descriptionStyle = {
  WebkitLineClamp: 5,
  webkitBoxOrient: 'vertical',
  overflow: 'hidden',
  display: '-webkit-box',
};

const Dashboard = () => {
  const initialjobs = [];
  const [jobs, setJobs] = useState(initialjobs);
  const [openState, setOpenState] = useState({});
  const [speakStates, setSpeakStates] = useState({});
  const [showLessMoreIcon, setShowLessMoreIcon] = useState({});
  const [auth] = useAuth();

  const descriptionRefs = useRef({}); // To track refs for each job's description

  const deleteJob = async (id) => {
    await axios.delete(`https://i-note-backend.onrender.com/api/v1/job/delete-job/${id}`);
    getMyJobs();
  };

  const getMyJobs = async () => {
    const resp = await axios.get(`https://i-note-backend.onrender.com/api/v1/job/get-myjob/${auth.user._id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    setJobs(resp.data);
  };


  useEffect(() => {
    if (auth?.token) {
      getMyJobs(); // Only fetch jobs when token is available
    }
  }, [auth?.token]);

  const handleEdit = (job) => {
    localStorage.setItem("job", JSON.stringify(job));
  };

  useEffect(() => {
    // Check if description is overflowing for each job
    jobs.forEach((job) => {
      const el = descriptionRefs.current[job._id];
      if (el && el.scrollHeight > el.clientHeight) {
        setShowLessMoreIcon((prevState) => ({
          ...prevState,
          [job._id]: true,
        }));
      }
    });
  }, [jobs]);

  // Toggle function to handle "see more" / "see less" for individual job
  const toggleOpenState = (jobId) => {
    setOpenState((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId], // Toggle for specific jobId
    }));
  };

  const toggleSpeak = (jobId) => {
    setSpeakStates((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId], // Toggle speak state for the clicked job
    }));
  };

  const arrCnvrt2 = (str) => {
    return str.split('.').map((item) => item.trim()).filter((item) => item !== '');
  };

  return (
    <Layout>
      <div className="">
        <div className="d-flex flex-wrap justify-content-between p-2">
          <h6 className="">
            {jobs.length < 1 ? "No Notes Found" : `Found ${jobs.length}`}
          </h6>
          <SearchInput />
        </div>
        {jobs?.map((p) => (
          <div className="border rounded-2 m-1 p-2" id="box" key={p._id}>
            <div className="d-flex flex-wrap justify-content-between">
              <div className="d-flex flex-wrap gap-3">
                <div className="fs-5 text-dark fw-bold">{p.title}</div>
                <div className="fs-5 text-success">[{p.tag}]</div>
              </div>
              <div className="d-flex flex-wrap gap-3">
                <NavLink to={`/dashboard/update-notes/${p._id}`}>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                </NavLink>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteJob(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="fw-bold">
              Content:
              <ul
                className="fw-normal fs-6"
                style={openState[p._id] ? null : descriptionStyle}
                ref={(el) => (descriptionRefs.current[p._id] = el)} // Store refs by job ID
              >
                {arrCnvrt2(p.description)?.map((elem) => (
                  <li key={elem}>{elem}</li>
                ))}
              </ul>
              {showLessMoreIcon[p._id] && (
                <div>
                  {openState[p._id] ? (
                    <Link onClick={() => toggleOpenState(p._id)}>see less</Link>
                  ) : (
                    <Link onClick={() => toggleOpenState(p._id)}>see more</Link>
                  )}
                </div>
              )}

            </div>

            <div className="d-flex flex-wrap justify-content-between">
              <div>
                {speakStates[p._id] ? (
                  <i
                    className="fa-solid fa-volume-high"
                    onClick={() => {
                      toggleSpeak(p._id);
                      const value = new SpeechSynthesisUtterance(p.description);
                      window.speechSynthesis.cancel(value);
                    }}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-volume-xmark"
                    onClick={() => {
                      toggleSpeak(p._id);
                      const val = new SpeechSynthesisUtterance(p.description);
                      window.speechSynthesis.speak(val);
                    }}
                  ></i>
                )}
              </div>
              <h5>
                Written: <span className="text-primary">{moment(p.updatedAt).fromNow()}</span>
              </h5>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
