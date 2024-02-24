import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import { singleTag } from '../../actions/tag';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';

const Tag = ({ tag, blogs, query }) => {
   const head = () => (
      <Head>
         <title>
            {tag.name} | {APP_NAME}
         </title>
         <meta name="description" content={`Best programming tutorials on ${tag.name}`} />
         <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
         <meta property="og:title" content={`${tag.name}| ${APP_NAME}`} />
         <meta property="og:description" content={`Best programming tutorials on ${tag.name}`} />
         <meta property="og:type" content="webiste" />
         <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
         <meta property="og:site_name" content={`${APP_NAME}`} />

         <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
         <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
         <meta property="og:image:type" content="image/jpg" />
         <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
   );

   return (
      <React.Fragment>
         {head()}
         <Layout>
            <div className="flex flex-col items-center gap-4 pb-5">
               <h1 className="mb-[30px] main-head font-bold text-center">{tag.name}</h1>
                        {blogs.map((b, i) => (
                           <div>
                              <Card key={i} blog={b} />
                              <hr />
                           </div>
                        ))}
               </div>
         </Layout>
      </React.Fragment>
   );
};

Tag.getInitialProps = ({ query }) => {
   return singleTag(query.slug).then(data => {
      if (data.error) {
         console.log(data.error);
      } else {
         return { tag: data.tag, blogs: data.blogs, query };
      }
   });
};

export default Tag;