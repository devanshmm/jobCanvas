import axios from "axios";
import type React from "react";
import { useState, type ChangeEvent } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
 

const Signin: React.FC = ()=>{
    const[formData, setFormData] = useState({
        email: '',
        password :''
    })
    const navigate = useNavigate()
    const[error, setError]= useState('')
const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setFormData({...formData,[e.target.name]: e.target.value})
}
 const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    try {
        const response =  await axios.post('http://localhost:3000/api/signin', formData)
        console.log(response)
        const token = response.data.token   
        localStorage.setItem('token',token)
      
    } catch (err) {
        setError('signup failed try again')
    }
 }
    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-gray-900 mb-2">Welcome</h2>
            <p className="text-gray-500 text-sm">Login to your account to get started</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
            
              
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>
              
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <a href="/home" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
    
}
export default Signin;