import { FaEdit, FaPen, FaTrash, FaUser } from 'react-icons/fa';
import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <div className="flex flex-col items-center">
                    <h1 className="main-head mb-[40px]">User Dashboard</h1>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="btn">
                            <Link legacyBehavior href="/user/crud/blog">
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
                                        Update Profile
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default UserIndex;