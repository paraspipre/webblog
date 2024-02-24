import Link from 'next/link';
import HtmlParser from "html-react-parser";
import moment from 'moment';
import { API } from '../../config';

const SmallCard = ({ blog }) => {
   return (
      <div className="card w-[300px]">
         <div className="card-header cursor-pointer">
            <Link legacyBehavior href={`/blogs/${blog.slug}`}>
               <img
                  src={`${API}/blog/photo/${blog.slug}`} alt="rover"
               />
            </Link>
         </div>
         <div className="">
            <Link legacyBehavior href={`/blogs/${blog.slug}`}>
               <span className="card-link">{blog.title}</span>
            </Link>
            <div className="card-text my-2">{HtmlParser(blog.excerpt.slice(0, 100))}</div>
         </div>
         <div className="" >
            Posted {moment(blog.updatedAt).fromNow()} by{' '}
            <Link legacyBehavior href={`/profile/${blog.postedBy.username}`}>
               <a style={{ color: '#9153F4' }}>{blog.postedBy.username}</a>
            </Link>
         </div>
      </div>
   );
};

export default SmallCard;

{/* <div className="col-md-4">
   <div className="c">
      <div className="card-header">
         <img
            src="https://images.unsplash.com/photo-1640499900704-b00dd6a1103a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFydmVsJTIwYXZlbmdlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"
            alt="rover"
         />
      </div>
      <div className="card-body">
         <span className="tag tag-teal">Christopher Nolan</span>
         <span style={{ color: "black" }} class="tag t-one">
            #science fiction
         </span>
         <Link href="/blogs">
            <h4 className="card-link mt-4">
               Why is the Tesla Cybertruck designed the way it is?
            </h4>
         </Link>

         <p>An exploration into the truck's polarising design</p>
      </div>
   </div>
</div> */}