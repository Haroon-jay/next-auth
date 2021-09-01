import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useSession,getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
function UserProfile() {
  // Redirect away if NOT auth
    const [isLoading,setIsLoading]=useState(true)
    const [loadedSession,setSession]=useState()
   const [session,loading]=useSession()
const changePasswordHandler=async (data)=>{
const res=await fetch("/api/user/change-password",{
  method:"PATCH",
  body:JSON.stringify(data),
  headers:{
    'Content-Type':'application/json'
  }
})
const data=await res.json()
}
   useEffect(()=>{
     getSession().then(sess=>{
      
       if(!sess){
         window.location.href="/login"
       }
       else{
        setIsLoading(false)
       }
     })
   },[])
   if(isLoading){
     return <p>Loading...</p>
   }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
