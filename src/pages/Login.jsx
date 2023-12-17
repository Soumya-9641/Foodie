import React ,{useState} from 'react'
import {  useNavigate} from 'react-router-dom'
import { useAuth } from '../context/authContext'
//import { background } from '../assets';
import "./login.css"
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // other registration fields
  });
  
  const handleSubmit=async (e)=>{
          e.preventDefault();
          //const user = {email,password}
       await login(formData);
         navigate("/")
  }
  return (
    <>
      <div className='App'>

      
      <form type="POST" className="form" >
        <div className="input-container">
          <label className="label">Email: </label>
          <input
            type="text"
            name="email"
            className="input"
            placeholder="Email.."
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="input-container">
          <label className="label">Password: </label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <a href="/" className="link forgotten-password">
            Forgot password?
          </a>
        </div>
        <button onClick={handleSubmit} type="submit" id="login-btn">
          Login
        </button>
      </form>
      <div className='mt-10'>
        <h6 className='font font-poppins text-gray-300'>Dont have an account?<a href="/signup"><span className='text-pink-300 cursor-pointer'>Sign Up</span></a> </h6>
      </div>
      </div>
    </>
  )
}

export default Login