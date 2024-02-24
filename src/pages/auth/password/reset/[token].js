import { resetPassword, signup } from '@/actions/auth';
import Router from 'next/router';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Reset = ({ token }) => {
   const [password, setPass] = useState("")
   const [showPass, setShowPass] = useState(false)
   const [done,setDone] = useState(false)
   
   const resetpass = ()=>{
      try {

         const response = resetPassword({ newPassword: password, resetPasswordLink: token })
         if (response) {
            console.log("reset done")
            setDone(true)
         }

         
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div>Change password
         <div className="form-group relative">
            <label className="lead sub-head">Password</label>
            <input
               value={password}
               onChange={(e)=>setPass(e.target.value)}
               type={showPass ? "password" : "text"}
               className="form-control"
               placeholder="Enter password"
            />
            <div onClick={() => setShowPass(!showPass)} className="text-[#1b0044] text-[24px] absolute top-9 right-2 cursor-pointer"  >{showPass ? <FaEyeSlash /> : <FaEye />}</div>

         </div>
         <button onClick={resetpass} className="btn mt-4" >Reset</button>
         {done && <button onClick={() => Router.push('/signin')} className="btn mt-4" >Sign In</button>}
      </div>
   )
}

Reset.getInitialProps = ({ query }) => { 
   return {token :query.token}
}

export default Reset