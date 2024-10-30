import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const Upadatejob = () => {

  const [ncompany, setCompany] = useState("");
  const [njobType, setJobType] = useState("");
  const [nsalary, setSalary] = useState("");
  const {id}=useParams();
  const [ok,setOk]=useState(true);
 useEffect(() => {
  const jobdata = localStorage.getItem("job")
  if(jobdata){
  const job = JSON.parse(jobdata)
  const {title,description,tag,_id}=job;
  if(_id!=id){
      setOk(false)
  }
  setCompany(title);
  setJobType(tag);
  setSalary(description);
  }

 }, [id])
  const navigate = useNavigate();


    const handleSubmit =async (e) => {
      e.preventDefault();
      try{
      const {data} = await axios.patch(`https://i-note-backend.onrender.com/api/v1/job/update-job/${id}`,{
        ncompany,
        njobType,
        nsalary,
       
      })
      if (data) {
          navigate("/dashboard");
          localStorage.removeItem("job")
          toast.success("Job Updated Successfully");
      }
    } catch (error) {
      
      toast.error("Invalid Job Details Please Try Agian!");
      console.log(error);
    }
    };
  
    return (
      <Layout>
      <div className='form-container'>
      {ok?
         
      <form onSubmit={handleSubmit}>
      <h4 className="title">NOTES INPUT FORM</h4>
      <div className="mb-3">
      <input
        type="text"
        value={ncompany}
        onChange={(e) => setCompany(e.target.value)}
        className="form-control"
       minLength={3}
        placeholder="Enter Note Title i.e. Optics"
        required
      />
    </div>
      <div className="mb-3">
      <input
        type="text"
        value={njobType}
        onChange={(e) => setJobType(e.target.value)}
        className="form-control"
       minLength={2}
        placeholder="Enter Tag Mark i.e. Physics"
        required
      />
    </div>
      
        <div className="mb-3" id='descMice'>
        <textarea
        type="text"
        value={nsalary}
        onChange={(e) => setSalary(e.target.value)}
        className="form-control"
       minLength={10}
       rows={8}
        placeholder="Write Your Notes"
        required
      />
</div>
<button disabled={ncompany.length < 3 || nsalary.length < 10} type="submit" className="btn " >Update note</button>
      </form>
   :
   <div className="d-flex justify-content-center align-items-center" style={{height:"90vh"}}>
    <h1 className="">Sorry! Note Id doesn't match</h1>
    <button className="btn btn-outline-primary btn-sm" onClick={()=>navigate("/dashboard")}>Go Back</button>
    </div>}
   </div>
    </Layout>
  )
}

export default Upadatejob
