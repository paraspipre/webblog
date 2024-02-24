import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import Card from '../../components/blog/Card';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import Search from '../../components/blog/Search';

const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {
	const head = () => (
		<Head>
			<title>Programming blogs | {APP_NAME}</title>
			<meta
				name="description"
				content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
			/>
			<link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
			<meta property="og:title" content={`Latest web developoment tutorials | ${APP_NAME}`} />
			<meta
				property="og:description"
				content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
			/>
			<meta property="og:type" content="webiste" />
			<meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
			<meta property="og:site_name" content={`${APP_NAME}`} />

			<meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
			<meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
			<meta property="og:image:type" content="image/jpg" />
			{/* <meta property="fb:app_id" content={`${FB_APP_ID}`} /> */}
		</Head>
	);

	const [limit, setLimit] = useState(blogsLimit);
	const [skip, setSkip] = useState(0);
	const [size, setSize] = useState(totalBlogs);
	const [loadedBlogs, setLoadedBlogs] = useState([]);

	const loadMore = () => {
		let toSkip = skip + limit;
		listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setLoadedBlogs([...loadedBlogs, ...data.blogs]);
				setSize(data.size);
				setSkip(toSkip);
			}
		});
	};

	const loadMoreButton = () => {
		return (
			size > 0 &&
			size >= limit && (
				<i onClick={loadMore} className="fa fa-arrow-down load-more"></i>
			)
		);
	};

	const showAllBlogs = () => {
		return blogs.map((blog, i) => {
			// ()
			return (
				<div className=' flex flex-col items-center mt-8 gap-5' key={i}>
					<Card blog={blog} />
				</div>
			);
		});
	};

	const showAllCategories = () => {
		return categories.map((c, i) => (
			<Link legacyBehavior href={`/categories/${c.slug}`} key={i}>
				<a className="tag cat-all ms-1 mt-3">{c.name}</a>
			</Link>
		));
	};

	const showAllTags = () => {
		return tags.map((t, i) => (
			<Link legacyBehavior href={`/tags/${t.slug}`} key={i}>
				<a className="tag cat-all ms-1 mt-3">{t.name}</a>
			</Link>
		));
	};

	const showLoadedBlogs = () => {
		return loadedBlogs.map((blog, i) => (
			<div className=' flex flex-col items-center mt-8 gap-5' key={i}>
				<Card blog={blog} />
			</div>
		));
	};

	return (
		<>
			{head()}
			<Layout>
				<main className=''>
					<div className="flex justify-center mt-5">
						<header>
							<div className="">
								<h1 className="mb-5 main-head font-bold text-center">
									All blogs are together at one place
								</h1>
							</div>
							<div className="">
								<div className="text-center flex flex-wrap">
									{showAllCategories()}
								</div>
								<div className="mt-2 text-center flex flex-wrap">
									{showAllTags()}
								</div>
							</div>
						</header>
					</div>
					{showAllBlogs()}
					{showLoadedBlogs()}
					<div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
				</main>
			</Layout>
		</>
	);
};

Blogs.getInitialProps = () => {
	let skip = 0;
	let limit = 2;
	return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
		if (data?.error) {
			console.log(data?.error);
		} else {
			return {
				blogs: data.blogs,
				categories: data.categories,
				tags: data.tags,
				totalBlogs: data.size,
				blogsLimit: limit,
				blogSkip: skip
			};
		}
	});
};

export default withRouter(Blogs);