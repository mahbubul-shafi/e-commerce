import { useState } from 'react'
import './CSS/Loginsignup.css'
const LoginSignup = () => {
  const [state, setState] = useState("Sign up")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: ""
  })
  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const login = async ()=>{
    let responseData;
    await fetch("http://localhost:4000/login",{
      method: 'POST',
      headers:{
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=> responseData = data);

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/')
    }else{
      alert(responseData.errors);
    }
  }
  const signup = async ()=>{
    let responseData;
    await fetch("http://localhost:4000/signup",{
      method: 'POST',
      headers:{
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=> responseData = data);

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/')
    }else{
      alert(responseData.errors);
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {(state === 'Sign up')?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Your name"/>:<></>}
          <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder="Email" />
          <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder="Password"/>
        </div>
        <button onClick={()=>{state === 'Login'?login():signup()}}>Continue</button>
        {(state === "Login")?<p className="loginsignup-login">Create an account?<span onClick={()=>{setState("Sign up")}}>Click Here</span></p>:
        <p className="loginsignup-login">Already have an account?<span onClick={()=>{setState("Login")}}>Login Here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By continuing, I agree to terms of use & privacy policies.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
