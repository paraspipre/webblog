import Layout from "../../../components/Layout"
import Link from 'next/link'
import Admin from "../../../components/auth/Admin"
import Category from '../../../components/crud/Category'
import Tag from "../../../components/crud/Tag"

const CategoryTag = () => {
    return <Layout>
        <Admin>
            <div className="">
                <div className="">
                    <div className=" pt-5">
                        <h2 className="main-head">Manage Tags</h2>
                    </div>

                    <div className="flex flex-col items-center pt-5">

                        <Tag />
                    </div>
                </div>
            </div>
        </Admin>
    </Layout>
}

export default CategoryTag