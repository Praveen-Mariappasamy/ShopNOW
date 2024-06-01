import React, { useState } from 'react'
import './CSS/LoginSignup.css'
const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:"",
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const login = async () => {
    let resData;
    await fetch('https://shop-now-api-five.vercel.app/login',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>resData=data)

    if(resData.success){
      localStorage.setItem('auth-token',resData.token);
      window.location.replace("/");
    }
    else{
      alert(resData.errors);
    }
  }

  const signup = async () => {
    let resData;
    await fetch('https://shop-now-api-five.vercel.app/signup',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>resData=data)

    if(resData.success){
      localStorage.setItem('auth-token',resData.token);
      window.location.replace("/");
    }
    else{
      alert(resData.errors);
    }
  }


  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input value={formData.username} onChange={changeHandler} name="username" type="text" placeholder="Your Name" />:<></>}
          <input value={formData.email} onChange={changeHandler} name="email" type="email" placeholder="Your email" />
          <input value={formData.password} onChange={changeHandler} name="password" type="password" placeholder="Password" />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login</span></p>:<p className="loginsignup-login">Create an account <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
