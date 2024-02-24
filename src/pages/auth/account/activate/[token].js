import { signup } from '@/actions/auth';
import React from 'react'

const Activate = () => {
  return (
    <div>[token]</div>
  )
}

Activate.getInitialProps = ({ query }) => {
   return signup(query.token).then(data => {
      if (data?.error) {
         console.log(data?.error);
      } else {
         return { message:"done"};
      }
   });
};

export default Activate