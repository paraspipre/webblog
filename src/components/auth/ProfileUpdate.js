import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { API } from '../../config';
import { RotatingLines } from "react-loader-spinner"
import { FaPlus } from 'react-icons/fa';

const ProfileUpdate = () => {
   const [values, setValues] = useState({
      username: '',
      name: '',
      email: '',
      about: '',
      password: '',
      error: false,
      success: false,
      loading: false,
      photo: '',
      userData: ''
   });

   const token = getCookie('token');
   const { username, name, email, about, password, error, success, loading, photo, userData } = values;

   const init = () => {
      getProfile(token).then(data => {
         if (data?.error) {
            setValues({ ...values, error: data.error });
         } else {
            setValues({
               ...values,
               username: data.username,
               name: data.name,
               email: data.email,
               about: data.about
            });
         }
      });
   };

   useEffect(() => {
      init();
   }, []);

   const handleChange = name => e => {
      // console.log(e.target.value);
      const value = name === 'photo' ? e.target.files[0] : e.target.value;
      let userFormData = new FormData();
      userFormData.set(name, value);
      setValues({ ...values, [name]: value, userData: userFormData, error: false, success: false });
   };

   const handleSubmit = e => {
      e.preventDefault();
      setValues({ ...values, loading: true });
      update(token, userData).then(data => {
         if (data.error) {
            setValues({ ...values, error: data.error, success: false, loading: false });
         } else {
            updateUser(data, () => {
               setValues({
                  ...values,
                  username: data.username,
                  name: data.name,
                  email: data.email,
                  about: data.about,
                  password: '',
                  success: true,
                  loading: false
               });
            });
         }
      });
   };

   const profileUpdateForm = () => (
      <form onSubmit={handleSubmit}>
         <div className="form-group">
            <h5 className="sub-head" >profile picture</h5>
            <label className="btn  w-fit mt-2">
               <FaPlus />
               <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
            </label>
         </div>
         <div className="form-group">
            <label className="sub-head">Username</label>
            <input onChange={handleChange('username')} type="text" value={username} className="form-control" />
         </div>
         <div className="form-group">
            <label className="sub-head">Name</label>
            <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
         </div>
         <div className="form-group">
            <label className="sub-head">Email</label>
            <input onChange={handleChange('email')} type="text" value={email} className="form-control" />
         </div>
         <div className="form-group">
            <label className="sub-head">About</label>
            <textarea onChange={handleChange('about')} type="text" value={about} className="form-control" />
         </div>
         <div className="form-group">
            <label className="sub-head">Password</label>
            <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
         </div>
         <button type="submit" className="mt-3 btn self-start">
            Submit
         </button>
      </form>
   );

   const showError = () => (
      <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
         {error}
      </div>
   );

   const showSuccess = () => (
      <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
         Profile updated
      </div>
   );

   const showLoading = () => (
      <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
         <RotatingLines width="100" strokeColor="silver" strokeWidth="2" />
      </div>
   );

   return (
      <React.Fragment>
         <div className="flex flex-col w-full items-center pt-[100px]">
            {showSuccess()}
            {showError()}
            {showLoading()}
            <div className="flex flex-col w-full lg:w-[60%] md:flex-row gap-4">
               <div className="w-[200px] h-[200px] rounded-[12px]">
                  <img
                     src={`${API}/user/photo/${username}`}
                     className="img w-full h-full rounded-[12px] mb-3"
                     alt="user profile"
                  />
               </div>
               <div className="flex flex-col items-center w-full md:w-[400px]  mb-5">
                  {profileUpdateForm()}
               </div>
            </div>
         </div>
      </React.Fragment>
   );
};

export default ProfileUpdate;