import Layout from "../../components/Layout"
import Link from 'next/link'
import Admin from "../../components/auth/Admin"
import { FaComment, FaEdit, FaHashtag, FaPen, FaTrash, FaUser } from "react-icons/fa"


const AdminIndex = () => {
    return <Layout>
        <Admin>
            <div className="flex flex-col items-center">
                <h1 className="main-head mb-[40px]">Hello Admin</h1>
                <div className="grid grid-cols-3 gap-4">
                    <div className="btn">
                        <Link legacyBehavior href="/admin/crud/category">
                            <div class="flex flex-col items-center justify-center">
                                <div class="icon-set">
                                    <FaComment />
                                </div>
                                <div>
                                    Create Category
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="btn">
                        <Link legacyBehavior href="/admin/crud/tag">
                            <div class="flex flex-col items-center justify-center">
                                <div class="icon-set">
                                    <FaHashtag />
                                </div>
                                <div>
                                    Create Tag
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="btn">
                        <Link legacyBehavior href="/admin/crud/blog">
                            <div class="flex flex-col items-center justify-center">
                                <div class="icon-set">
                                    <FaPen />
                                </div>
                                <div>
                                    Create Blog
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="btn">
                        <Link legacyBehavior href="/user/crud/blogs">
                            <div class="flex flex-col items-center justify-center">
                                <div class="icon-set">
                                    <FaEdit />
                                </div>
                                <div>
                                    Update Blog
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="btn">
                        <Link legacyBehavior href="/user/crud/blogs">
                            <div class="flex flex-col items-center justify-center">
                                <div class="icon-set">
                                    <FaTrash />
                                </div>
                                <div>
                                    Delete Blog
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="btn">
                        <Link legacyBehavior href="/user/update">
                            <div class="flex flex-col items-center justify-center">
                                <div class="icon-set">
                                    <FaUser />
                                </div>
                                <div>
                                    Update profile
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Admin>
    </Layout>
}

export default AdminIndex