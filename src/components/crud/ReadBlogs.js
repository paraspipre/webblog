import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
import moment from 'moment/moment';

const BlogRead = () => {
   const [blogs, setBlogs] = useState([])
   const [message, setMessage] = useState('')
   const token = getCookie('token')

   useEffect(() => {
      loadBlogs()
   }, [])

   const loadBlogs = () => {
      list().then(data => {
         if (data.error) {
            console.log(data.error)
         } else {
            setBlogs(data)
         }
      })
   }

   const deleteBlog = (slug) => {
      removeBlog(slug, token).then(data => {
         if (data.error) {
            console.log(data.error)
         } else {
            setMessage(data.message)
            loadBlogs()
         }
      })
   }

   const deleteConfirm = (slug) => {
      let answer = window.confirm('Are you sure you want to delete your blog?')
      if (answer) {
         deleteBlog(slug)
      }
   }

   const showUpdateButton = (blog) => {
      if (isAuth() && isAuth().role === 0) {
         return (
            <Link legacyBehavior href={`/user/crud/${blog.slug}`}>
               <a className='ml-2 btn '>Update</a>
            </Link>
         )
      } else if (isAuth() && isAuth().role === 1) {
         return (
            <Link legacyBehavior href={`/admin/crud/${blog.slug}`}>
               <a className='ml-2 btn '>Update</a>
            </Link>
         )
      }
   }

   const showAllBlogs = () => {
      return blogs.map((blog, i) => {
         console.log(blog)
         return (
            <div key={i} className='pb-5 w-[50%]'>
               <h3>{blog.title}</h3>
               <p className='mark'>Written by  | Published on {moment(blog.updatedAt).fromNow()}</p>
               <button className='btn' onClick={() => deleteConfirm(blog.slug)}>Delete</button>
               {showUpdateButton(blog)}
            </div>
         )
      })
   }

   return (
      <div className=''>
         {message && <div className='alert alert-warning'>{message}</div>}
         <div className='flex flex-col items-center gap-4'>
            {showAllBlogs()}
         </div>
      </div>
   )
}

export default BlogRead