
import axios from "axios";
import React, { useCallback } from "react";
import { useState } from "react";

const token = localStorage.getItem('token')

const JobForm: React.FC = React.memo(()=>{
    const[form, setForm] = useState({
        jobTitle: '',
        company :'',
        jobURL: '',
        status: "",
        salary : "",
        location: "",
        description :""
    })
    const [ error, setError] = useState ('')
    
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        setForm({...form, [e.target.name]: e.target.value})
        console.log(form)
     },[])
    
     const HandleInput = useCallback(async(e: React.FormEvent) => {
        try {
         e.preventDefault();
         const JobData = await axios.post('http://localhost:3000/apiv1/jobs', form,{
             headers:{
                 Authorization: `Bearer ${token}`
             }
         });
         console.log (JobData)
        } catch (error) {
         setError('signup failed try again')
         console.log(error)
        }
     },[form])
    if (!token) {
        setError('You must be logged in');
        return;
      }
    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <form 
    onSubmit={HandleInput} 
    className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
  >
    <h2 className="text-2xl font-semibold text-gray-700 text-center">Add a Job</h2>

    <input 
      type="text" 
      name="jobTitle" 
      placeholder="Job Title" 
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <input 
      type="text" 
      name="company" 
      placeholder="Company" 
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <input 
      type="text" 
      name="jobURL" 
      placeholder="Job URL" 
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <input 
      type="text" 
      name="status" 
      placeholder="Status" 
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <input 
      type="text" 
      name="salary" 
      placeholder="Salary" 
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <input 
      type="text" 
      name="location" 
      placeholder="Location" 
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <input 
      type="text" 
      name="description" 
      placeholder="Description" 
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <button 
      type="submit" 
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
    >
      Submit
    </button>

    {error && <p className="text-red-500 text-center">{error}</p>}
  </form>
</div>

    )
})
export default JobForm;