import { signup } from '@/actions/auth';
import Router from 'next/router';
import React from 'react'

const Activate = () => {
   return (
      <div>Account is activated please login
         <button onClick={() => Router.push('/signin')} className="btn mt-4" >Sign In</button>
      </div>
   )
}

Activate.getInitialProps = ({ query }) => {
   return signup(query.token).then(data => {
      if (data?.error) {
         console.log(data?.error);
      } else {
         return { message: "done" };
      }
   });
};

export default Activate