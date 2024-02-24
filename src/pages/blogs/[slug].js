import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
// import renderHTML from 'react-render-html';
import HtmlParser from "html-react-parser";
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard';
import DisqusThread from '../../components/DisqusThread';

const SingleBlog = ({ blog, query }) => {
   const [related, setRelated] = useState([]);

   const loadRelated = () => {
      listRelated({ blog }).then(data => {
         if (data?.error) {
            console.log(data?.error);
         } else {
            setRelated(data);
         }
      });
   };

   useEffect(() => {
      loadRelated();
   }, []);

   const head = () => (
      <Head>
         <title>
            {blog?.title} | {APP_NAME}
         </title>
         <meta name="description" content={blog?.mdesc} />
         <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
         <meta property="og:title" content={`${blog?.title}| ${APP_NAME}`} />
         <meta property="og:description" content={blog?.mdesc} />
         <meta property="og:type" content="webiste" />
         <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
         <meta property="og:site_name" content={`${APP_NAME}`} />

         <meta property="og:image" content={`${API}/blog/photo/${blog?.slug}`} />
         <meta property="og:image:secure_url" ccontent={`${API}/blog/photo/${blog?.slug}`} />
         <meta property="og:image:type" content="image/jpg" />
         <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
   );

   const showBlogCategories = blog =>
      blog?.categories.map((c, i) => (
         <Link legacyBehavior key={i} href={`/categories/${c.slug}`}>
            <a className="tag cat-all t-one mt-2 me-1">{c.name}</a>
         </Link>
      ));

   const showBlogTags = blog =>
      blog?.tags.map((t, i) => (
         <Link legacyBehavior key={i} href={`/tags/${t.slug}`}>
            <a className="tag tag-all mt-2 me-1">{t.name}</a>
         </Link>
      ));

   const showRelatedBlog = () => {
      return related?.map((blog, i) => (
         <SmallCard key={i} blog={blog} />
      ));
   };

   const showComments = () => {
      return (
         <div>
            <DisqusThread id={blog?.id} title={blog?.title} path={`/blog/${blog?.slug}`} />
         </div>
      );
   };

   return (
      <React.Fragment>
         {head()}
         <Layout>
            <main>
               <article>
                  <div className="">
                     <section>
                        <div className="">
                           <img
                              src={`${API}/blog/photo/${blog?.slug}`}
                              alt={blog?.title}
                              className="featured-image"
                           />
                        </div>
                     </section>

                     <section>
                        <div className="">
                           <h1 className=" font-bold text-[48px] main-head text-wrap" style={{ fontSize: "48px", marginTop: 15 }}>{blog?.title}</h1>
                           <p style={{ backgroundColor: "#D6C5F0", borderRadius: "5px" }} className="lead mt-3 py-1 px-[20px]">
                              Written by{' '}
                              <Link legacyBehavior href={`/profile/${blog?.postedBy.username}`}>
                                 <a style={{ color: "#9153F4" }}>{blog?.postedBy.username}</a>
                              </Link>{' '}
                              | Published {moment(blog?.updatedAt).fromNow()}
                           </p>

                           <div className="flex flex-wrap m-4">
                              {showBlogCategories(blog)}
                           </div>
                           <div className="mb-[40px] flex flex-wrap mx-4">
                              {showBlogTags(blog)}
                           </div>
                        </div>
                     </section>
                  </div>

                  <div className="px-[20px]">
                     <div style={{ wordWrap: "break-word", color: 'white' }} className="">{HtmlParser(blog?.body)}</div>

                  </div>

                  <div className="">
                     <h4 className="text-center pt-5 pb-5 h2 main-head">Related blogs</h4>
                     <div className="flex gap-3 flex-wrap px-[20px]">{showRelatedBlog()}</div>
                  </div>

                  <div className="p-[20px] mt-[100px] text-white">{showComments()}</div>
               </article>
            </main>
         </Layout>
      </React.Fragment>
   );
};

SingleBlog.getInitialProps = ({ query }) => {
   return singleBlog(query.slug).then(data => {
      if (data?.error) {
         console.log(data?.error);
      } else {
         // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
         return { blog: data, query };
      }
   });
};

export default SingleBlog;