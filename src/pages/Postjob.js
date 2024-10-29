import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "../styles/AuthStyle.css";
import { useAuth } from '../context/auth';

const Postjob = () => {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [description, setDesc] = useState('')
  const [isListening, setIsListening] = useState(false);
  const [auth]=useAuth();
  const navigate = useNavigate();

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return null
  }
  const micOn = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })
    setIsListening(true);
  }
  const micOff = () => {
    SpeechRecognition.stopListening()
    setIsListening(false);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://i-note-backend.onrender.com/api/v1/job/create-job", {
        id:auth.user._id,
        title,
        description,
        tag
      },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`, // Attach token to the request
        }
      })
      if (data) {
        navigate("/dashboard");
        toast.success("Notes created Successfully");
      } else {
        navigate("/dashboard");
        toast.error("Notes not created")
      }
    } catch (error) {

      toast.error("Invalid Details Please Try Agian!");
      console.log(error);
    }
  };

  return (
    <Layout>
        <div className='form-container'>
         
        <form onSubmit={handleSubmit}>
        <h4 className="title">NOTES INPUT FORM</h4>
        <div className="mb-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
         minLength={3}
          placeholder="Enter Note Title i.e. Optics"
          required
        />
      </div>
        <div className="mb-3">
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="form-control"
         minLength={2}
          placeholder="Enter Tag Mark i.e. Physics"
          required
        />
      </div>
        
          <div className="mb-3" id='descMice'>
          <textarea
          type="text"
          value={description||transcript}
          onChange={(e) => setDesc(e.target.value)}
          className="form-control"
         minLength={10}
         rows={8}
          placeholder="Write Your Notes"
          required
        />
            <div id='mice'> {isListening ? <i class="fa-solid fa-microphone " onClick={micOff}></i> : <i class="fa-solid fa-microphone-slash" onClick={micOn}></i>}
            </div>
          </div>
          <button disabled={title.length < 3 || description.length < 8} type="submit" className="btn " >Add note</button>
        </form>
      </div>
    </Layout>
  )
}

export default Postjob
