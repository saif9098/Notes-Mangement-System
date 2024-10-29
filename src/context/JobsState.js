// import React from 'react'
// import { toast } from 'react-toastify';
// import jobContext from './JobContext';

// const JobsState = () => {
//     const initialjobs = []
//     const [jobs, setjobs] = useState(initialjobs)
//     const setAuthToken = (token) => {
//         if (token) {
//           axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         } else {
//           delete axios.defaults.headers.common['Authorization'];
//         }
//       };
  
//       // Assuming you have stored the authentication token in local storage
//       const authToken = localStorage.getItem('token');
//       // Call the setAuthToken function with the authentication token
//       setAuthToken(authToken);

//     const getmyjobs = async () => {
//         let resp = await axios.get("/api/v1/job/get-myjob");
//         // const json = await resp.json()
//         setjobs(resp)
    
//       };

//     const postjob = async (company,jobType,salary,requiredSkills,workLocation,jobDescription)=>{
//         try{
//             const {data} = await axios.post("/api/v1/job/create-job",{
//               company,
//               jobType,
//               salary,
//               requiredSkills,
//               workLocation,
//               jobDescription
//             })
//             if (data) {
//                 navigate("/dashboard");
//                 toast.success("Job Posted Successfully");
//             }
//           } catch (error) {
            
//             toast.error("Invalid Job Details Please Try Agian!");
//             console.log(error);
//           }
          
//     };
//   return (
//     <div>
//       <jobContext.Provider value={{postjob,jobs}}
//     </div>
//   )
// }

