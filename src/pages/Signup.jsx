//import { set } from 'mongoose'
import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'
import "./login.css"
const Signup = () => {
  const navigate = useNavigate()
   const [username, setName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [cpassword, setCpassword] = useState("")
   
  const handleChange =(e)=>{
   if(e.target.name==="name"){
      setName(e.target.value)
      console.log(e.target.value)
   }
   if(e.target.name==="email"){
    setEmail(e.target.value)
    console.log(e.target.value)
  }
  if(e.target.name==="password"){
    setPassword(e.target.value)
    console.log(e.target.value)
  }
  if(e.target.name==="cpassword"){
    setCpassword(e.target.value)
    console.log(e.target.value)
  }
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(password!==cpassword){
      window.alert("Invalid registration")
      console.log("Invalid registration")
    }
    const user = {username,email,password};
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/user/register`,{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },

      body:JSON.stringify(user)
    });
    const data = await res.json()
    console.log(data)
    if(data.status === 422 || !data){
          window.alert("Invalid registration")
          console.log("Invalid registration")
    }else{
      window.alert(" registration successful")
          console.log("Invalid successful")
          setName('')
          setEmail('')
          setPassword('')
          setCpassword('')
        navigate("/login")
    }
 }
  return (
    <>
      <div className='App'>

      
<form className="form">
  <div className="input-container">
    <label className="label">Username: </label>
    <input
      type="text"
      name="name"
      className="input"
      placeholder="Username"
      value={username}
      onChange={handleChange}
    />
  </div>
  <div className="input-container">
    <label className="label">Email: </label>
    <input
      type="text"
      name="email"
      className="input"
      placeholder="email"
      value={email}
      onChange={handleChange}
    />
  </div>

  <div className="input-container">
    <label className="label">Password: </label>
    <input
      type="password"
      name="password"
      className="input"
      placeholder="password"
      value={password}
      onChange={handleChange}
    />
  </div>
  <div className="input-container">
    <label className="label">Confirm Password: </label>
    <input
      type="password"
      name="cpassword"
      className="input"
      placeholder="Password"
      value={cpassword}
      onChange={handleChange}
    />
    <a href="/" className="link forgotten-password">
      Forgot password?
    </a>
  </div>
  <button onClick={handleSubmit} type="submit" id="login-btn">
    Signup
  </button>
</form>
<div className='mt-10'>
  <h6 className='font font-poppins text-gray-300'>Already have an account?<a href="/login"><span className='text-pink-300 cursor-pointer'>Log In</span></a> </h6>
</div>
</div>
    </>
  )
}

export default Signup