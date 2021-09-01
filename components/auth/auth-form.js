import { useState,useRef } from 'react';
import classes from './auth-form.module.css';
import {signIn} from "next-auth/client"
import router, {useRouter} from "next/router"
async function createUser(email,password){
  const router=useRouter()
const res=await fetch("/api/auth/signup",{
  method:"POST",
  body:JSON.stringify({email,password}),
  headers:{
    "Content-Type":"application/json"
  }
})
const data=await res.json()
if(!res.ok){
  throw new Error(data.message || "Something went wrong")
}
return data
}
function AuthForm() {
  const emailRef=useRef()
  const passwordRef=useRef()
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    
  }
  async function submitHandler(e){
   e.preventDefault()
   if(isLogin){
   const res=await signIn('credentials',{redirect:false,email:emailRef.current.value,password:passwordRef.current.value})
 if(!res.error){
   router.replace("/profile")
 } 
  }else{
    try{ 
   const data=await createUser(emailRef.current.value,passwordRef.current.value)
   console.log(data) 
  }catch(e){
    console.log("fgerge")
     console.error(e)
   }
  
  }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
