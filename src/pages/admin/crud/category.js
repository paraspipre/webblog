import Layout from "../../../components/Layout"
import Link from 'next/link'
import Admin from "../../../components/auth/Admin"
import Category from '../../../components/crud/Category'
import Tag from "../../../components/crud/Tag"

const CategoryCreate = () => {
   return <Layout>
      <Admin>
         <div className="w-full">
            <div className="w-full">
               <div className=" pt-5">
                  <h2 className="main-head">Manage Categories</h2>
               </div>
               <div className="flex flex-col items-center pt-5">
                  <Category />
               </div>

            </div>
         </div>
      </Admin>
   </Layout>
}

export default CategoryCreate