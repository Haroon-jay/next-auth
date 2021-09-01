import classes from './profile-form.module.css';
import { useRef } from 'react';
function ProfileForm(props) {
  const oldRef=useRef()
  const newRef=useRef()
  const onSubmit=(e)=>{
    e.preventDefault()
    const newPassword=newRef.current.value
    const oldPassword=oldRef.current.value
   props.onChangePassword({oldPassword,newPassword})
  }
  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={oldRef} type='password' id='new-password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input ref={newRef} type='password' id='old-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
