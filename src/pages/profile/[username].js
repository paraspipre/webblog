import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/user';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';
import ContactForm from '../../components/form/ContactForm';

const UserProfile = ({ user, blogs, query }) => {
   const head = () => (
      <Head>
         <title>
            {user.username} | {APP_NAME}
         </title>
         <meta name="description" content={`Blogs by ${user.username}`} />
         <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
         <meta property="og:title" content={`${user.username}| ${APP_NAME}`} />
         <meta property="og:description" content={`Blogs by ${user.username}`} />
         <meta property="og:type" content="webiste" />
         <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
         <meta property="og:site_name" content={`${APP_NAME}`} />

         <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
         <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
         <meta property="og:image:type" content="image/jpg" />
         <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
   );

   const showUserBlogs = () => {
      return blogs.map((blog, i) => {
         return (
            <Link key={i} legacyBehavior href={`/blogs/${blog.slug}`}>
               <a className="text-[#1b0044] text-[20px]">{blog.title}</a>
            </Link>
         );
      });
   };

   return (
      <React.Fragment>
         {head()}
         <Layout>
            <div className='p-[10px] md:p-[40px]'>
               <div className="card flex gap-4 items-center">
                  <div className="w-[100px] h-[100px]">
                     <img
                        src={`${API}/user/photo/${user.username}`}
                        className="w-full h-full cover rounded-full"
                        alt="user profile"
                     />
                  </div>
                  <div className="flex flex-col items-start border-x-[1px] px-4">
                     <h5 className="font-bold text-[24px] text-[#1b0044]">{user.name.toUpperCase()}</h5>
                     <p className=" text-[#1b0044]">
                        Joined {moment(user.updatedAt).fromNow()}
                     </p>
                  </div>
                  <h6 className="text-[#1b0044]"> {user.about}</h6>
               </div>

               <div className="pb-5 flex flex-col md:flex-row gap-6">
                  <div className="card  md:w-[50%]">
                     <div className="p-[20px]">
                        <h5 style={{
                           borderRadius: "5px",
                           boxShadow: "0 0 8px rgba(255,255,255,0.5)",
                        }} className="text-[24px] font-semibold p-4 text-[#1b0044]">
                           Recent blogs by {user.name}
                        </h5>

                        <div className='flex flex-col gap-3 mt-5 ml-5'>
                           {showUserBlogs()}

                        </div>
                     </div>
                  </div>

                  <div className=" md:w-[50%]">
                     <ContactForm authorEmail={user.email} />
                  </div>
               </div>
            </div>
         </Layout>
      </React.Fragment>
   );
};

UserProfile.getInitialProps = ({ query }) => {
   // console.log(query);
   return userPublicProfile(query.username).then(data => {
      if (data.error) {
         console.log(data.error);
      } else {
         // console.log(data);
         return { user: data.user, blogs: data.blogs, query };
      }
   });
};

export default UserProfile;