import Layout from "../../../components/Layout"
import Link from 'next/link'
import Admin from "../../../components/auth/Admin"
import BlogCreate from "../../../components/crud/BlogCreate"
import ReadBlogs from "../../../components/crud/ReadBlogs"

const Blog = () => {
   return <Layout>
      <Admin>
         <div className="">
            <div className="">
               <div className=" pt-5 pb-5">
                  <h2 className="main-head">Manage Blogs</h2>
               </div>
               <div className="flex gap-4">
                  <ReadBlogs />
               </div>
            </div>
         </div>
      </Admin>
   </Layout>
}

export default Blog