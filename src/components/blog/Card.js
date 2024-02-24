import renderHTML from 'react-render-html'
import moment from 'moment'
import Link from 'next/link'
import { API } from '../../config'


const Card = ({ blog }) => {

   const showBlogCategories = blog => {
      return blog.categories.map((c, i) => (
         <Link legacyBehavior key={i} href={`/categories/${c.slug}`} >
            <a className='tag cat-all ms-1 mt-3'>{c.name}</a>
         </Link>
      ))
   }
   const showBlogTags = blog => {
      return blog.tags.map((t, i) => (
         <Link legacyBehavior key={i} href={`/tags/${t.slug}`} >
            <a className='tag tag-all ms-1 mt-3'>{t.name}</a>
         </Link>
      ))
   }
   return (
      <div class="blog-container ">
         <img className='w-full h-full cover' src={`${API}/blog/photo/${blog.slug}`} alt='g' />
         <div className='overlay'>
            <div class="self-start">
               Written by <Link legacyBehavior href={`/profile/${blog.postedBy.username}`} ><a className="user-info" >{blog.postedBy.name}</a></Link>
            </div>

            <Link legacyBehavior href={`/blogs/${blog.slug}`} >
               <div class="blog-body">
                  <div class="blog-title">
                     <Link legacyBehavior href={`/blogs/${blog.slug}`}>
                        <a>
                           <h3 className=" pb-3 font-bold card-head">
                              {blog.title}
                           </h3>
                        </a>
                     </Link>
                  </div>
                  <div class="blog-summary">
                     <p style={{ wordWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: blog.excerpt }}></p>
                  </div>
                  <div class="flex flex-wrap mt-3 gap-2">
                     {showBlogCategories(blog)}
                     {showBlogTags(blog)}
                  </div>
               </div>
            </Link>

            <div class="self-end">
               <ul>
                  <li class="published-date">Published {moment(blog.createdAt).fromNow()}</li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default Card