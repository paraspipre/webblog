import Link from 'next/link'
// import renderHTML from 'react-render-html'
import { useState, useEffect, useRef } from 'react'
import { listSearch } from '../../actions/blog'
import { FaSearch } from 'react-icons/fa'

// let menuRef = useRef();

// useEffect(() => {
   
      // let handler = (e) => {
      //    if (!document?.getElementById("search").contains(e.target)) {
      //       setOpen(false);
            // console.log(menuRef.current);
      //    }
      // };
   
      // document?.addEventListener("mousedown", handler);

//    return () => {
      // document?.removeEventListener("mousedown", handler);
//    }

// });

const Search = () => {
   const [values, setValues] = useState({
      search: undefined,
      results: [],
      searched: false,
      message: ''
   })
   const { search, results, searched, message } = values

   const searchSubmit = e => {
      e.preventDefault()
      listSearch({ search }).then(data => {
         setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` })
      })
   }

   const handleChange = e => {
      setValues({ ...values, search: e.target.value, searched: false, results: [] })
   }

   const searchBlogs = (results = []) => {
      return (
         <div className='jumbotron'>
            {message && <p className='pt-4 text-[#1b0044] sub-head'>{message}</p>}
            {results.map((blog, i) => {
               return (
                  <div key={i}>
                     <Link legacyBehavior href={`/blogs/${blog.slug}`}>
                        <a style={{ textDecoration: "none" }} className='text-white leading-8 text-xl mt-3' >{blog.title}</a>
                     </Link>
                  </div>
               )
            })}
         </div>
      )
   }

   const searchForm = () => {
      return (
         <form onSubmit={searchSubmit}>
            <div className='search-box'>
               <button className='btn-search' type='submit'><FaSearch /></button>
               <input type="search" className='input-search' placeholder='Search blogs' onChange={handleChange} />
            </div>
         </form>
      )
   }

   return (
      <div className=''>
         <div className='pt-3 pb-5'>{searchForm()}</div>
         {searched && <div id='search' className='card' style={{ marginTop: '15px', marginBottom: '20px', position: 'absolute', zIndex: '100', left: "100px" }} >{searchBlogs(results)}</div>}
      </div>
   )
}

export default Search