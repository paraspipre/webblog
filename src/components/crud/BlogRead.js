import Link from 'next/link';
import { React, useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
import moment from 'moment';
import { FaEdit, FaTrash } from 'react-icons/fa';

const BlogRead = ({ username }) => {
   const [blogs, setBlogs] = useState([]);
   const [message, setMessage] = useState('');
   const token = getCookie('token');

   useEffect(() => {
      loadBlogs();
   }, []);

   const loadBlogs = () => {
      list(username).then(data => {
         if (data.error) {
            console.log(data.error);
         } else {
            setBlogs(data);
         }
      });
   };

   const deleteBlog = slug => {
      removeBlog(slug, token).then(data => {
         if (data.error) {
            console.log(data.error);
         } else {
            setMessage(data.message);
            loadBlogs();
         }
      });
   };

   const deleteConfirm = slug => {
      let answer = window.confirm('Are you sure you want to delete your blog?');
      if (answer) {
         deleteBlog(slug);
      }
   };

   const showUpdateButton = blog => {
      if (isAuth() && isAuth().role === 0) {
         return (
            <Link legacyBehavior href={`/user/crud/${blog.slug}`}>
               <a className="btn  "><FaEdit /></a>
            </Link>
         );
      } else if (isAuth() && isAuth().role === 1) {
         return (
            <Link legacyBehavior href={`/admin/crud/${blog.slug}`}>
               <a className="btn w-fit"><FaEdit /></a>

            </Link>
         );
      }
   };

   const showAllBlogs = () => {
      return blogs.map((blog, i) => {
         return (
            <div key={i} className="pb-5">
               <h3 className="text-lg mb-1 ">{blog.title}</h3>
               <p style={{ backgroundColor: "silver" }} className="w-fit px-4 rounded-[10px]">
                  Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}
               </p>
               <div className='flex gap-2'>
                  <button className="btn mt-1" onClick={() => deleteConfirm(blog.slug)}>
                     <FaTrash />
                  </button>
                  {showUpdateButton(blog)}
               </div>
            </div>
         );
      });
   };

   const mouseMoveHandler = (e) => {
      setMessage(false);
   };

   return (
      <>
         <div onMouseMove={mouseMoveHandler} className="">
            <div className="">
               {message && <div className="show-result">{message}</div>}
               {showAllBlogs()}
            </div>
         </div>
      </>
   );
};

export default BlogRead;